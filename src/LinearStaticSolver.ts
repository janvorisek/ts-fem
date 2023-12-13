import { create, all, MathArray } from "mathjs";

const config = {};
const math = create(all, config);

import { Solver } from "./fem";
/**
 * Class representing linear elastic solver.
 */
export class LinearStaticSolver extends Solver {
  assemble() {
    this.k = math.zeros(this.neq + this.pneq, this.neq + this.pneq);

    // assemble stifness matrix
    for (let [num, el] of this.domain.elements) {
      let estiff = el.computeStiffness();
      let loc = el.getLocationArray() as [];
      let ndofs = math.size(loc)[0];
      //console.log("assembling element ", num);
      //console.log("loc[",math.size(loc)[0],"]:", loc );
      //console.log("Element ", num, "loc:", loc, "k:", estiff);

      if (true) {
        for (let r = 0; r < ndofs; r++) {
          let rc = loc[r];
          for (let c = 0; c < ndofs; c++) {
            let cc = loc[c];
            this.k.set([rc, cc], this.k.get([rc, cc]) + estiff.get([r, c]));
          }
        }
      } else {
        //console.log("El: ", num, "loc:", loc, "ke:", el.computeStiffness());
        let acc = math.add(
          math.subset(this.k, math.index(loc, loc)),
          el.computeStiffness()
        );
        //console.log("add:", acc);
        //console.log("indx:", math.index(loc,loc));

        math.subset(this.k, math.index(loc, loc), acc);
      }
    }
    //console.log("k=", this.k);

    this.f = math.zeros(this.neq + this.pneq, this.loadCases.length);
    for (let i = 0; i < this.loadCases.length; i++) {
      this.loadCases[i].r = math.zeros(this.neq + this.pneq);
      let lc = this.loadCases[i];
      for (let load of lc.nodalLoadList) {
        // assemble load
        //math.subset(this.f, math.index(load.getLocationArray()), load.getLoadVector());
        this.assembleVecLC(
          this.f,
          load.getLoadVector(),
          load.getLocationArray(),
          i
        );
        //console.log("nodal load:", load.getLoadVector(), "codes:", load.getLocationArray(), "result:", this.f);
      }

      for (let load of lc.elementLoadList) {
        // assemble load
        //math.subset(this.f, math.index(load.getLocationArray()), load.getLoadVector());
        //console.log("element load:", load.getLoadVector(), "codes:", load.getLocationArray());
        this.assembleVecLC(
          this.f,
          load.getLoadVector(),
          load.getLocationArray(),
          i
        );
      }

      // assemble prescribed displacement vector
      for (let dbc of lc.prescribedBC) {
        this.assembleVec(
          lc.r,
          dbc.getNodePrescribedDisplacementVector(),
          dbc.getLocationArray()
        );
      }
    }
  }

  solve() {
    const startime = new Date();
    if (!this.codeNumberGenerated) {
      this.generateCodeNumbers();
    }

    this.assemble();
    if (this.neq > 0) {
      let unknowns = math.range(0, this.neq);
      let prescribed = math.range(this.neq, this.neq + this.pneq);
      // solve linear system
      //console.log("unknowns=", unknowns);
      //console.log("kuu=", math.subset(this.k, math.index(unknowns, unknowns)));
      //console.log("fu=", math.subset(this.f, math.index(unknowns, math.range(0, this.loadCases.length))));

      for (let lc = 0; lc < this.loadCases.length; lc++) {
        this.loadCases[lc].solved = false;
        let rp = math.subset(this.loadCases[lc].r, math.index(prescribed));
        let fp = math.multiply(
          math.subset(this.k, math.index(unknowns, prescribed)),
          rp
        ) as math.Matrix;
        //console.log('fp', fp);
        //console.log('fsubset', math.squeeze(math.subset(this.f, math.index(unknowns, [lc]))));
        let b = math.subtract(
          math.squeeze(math.subset(this.f, math.index(unknowns, [lc]))),
          fp
        ) as math.Matrix;
        let ru = math.squeeze(
          math.lusolve(math.subset(this.k, math.index(unknowns, unknowns)), b)
        );

        //this.loadCases[lc].r = math.zeros(this.neq+this.pneq);
        this.loadCases[lc].r = math.subset(
          this.loadCases[lc].r,
          math.index(math.range(0, this.neq)),
          ru
        );

        // evaluate reactions
        this.loadCases[lc].R = math
          .multiply(math.subset(this.k, math.index(prescribed, unknowns)), ru)
          .toArray();
        // add contributions from elements
        this.loadCases[lc].R = math.subtract(
          this.loadCases[lc].R,
          math.squeeze(math.subset(this.f, math.index(prescribed, [lc])))
        ) as math.Matrix;
        //console.log("lc:", lc, " r:", this.loadCases[lc].r, " R:", this.loadCases[lc].R);
        this.loadCases[lc].solved = true;
      }
    }
    const endtime = new Date();
    let timediff = (endtime.getTime() - startime.getTime()) / 1000;
    console.log("Solution took ", Math.round(timediff * 100) / 100, " [sec]");
  }
}
