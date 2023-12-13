import { create, all, MathArray, eigs } from "mathjs";

const config = {};
const math = create(all, config);

import * as luqr from "luqr";

import { Domain, LoadCase, DofID, Solver } from "./fem";

/**
 * Class representing eigen value solver for the structural dynamic problems
 */
export class EigenValueDynamicSolver extends Solver {
  n = 10;
  tol = 1e-12;

  constructor() {
    super();
  }

  assemble() {
    this.k = math.zeros(this.neq + this.pneq, this.neq + this.pneq);
    this.m = math.zeros(this.neq + this.pneq, this.neq + this.pneq);

    this.loadCases[0].r = math.zeros(this.neq + this.pneq);
    this.loadCases[0].eigenVectors = [];
    this.loadCases[0].eigenNumbers = [];

    // assemble stifness matrix
    for (let [num, el] of this.domain.elements) {
      let estiff = el.computeStiffness();
      let emass = el.computeMassMatrix();
      let loc = el.getLocationArray() as [];
      let ndofs = math.size(loc)[0];

      for (let r = 0; r < ndofs; r++) {
        let rc = loc[r];
        for (let c = 0; c < ndofs; c++) {
          let cc = loc[c];
          this.k.set([rc, cc], this.k.get([rc, cc]) + estiff.get([r, c]));
          this.m.set([rc, cc], this.m.get([rc, cc]) + emass.get([r, c]));
        }
      }
    }
  }

  solve() {
    this.loadCases[0].solved = false;

    const startime = new Date();
    if (!this.codeNumberGenerated) {
      this.generateCodeNumbers();
    }

    let unknowns = math.range(0, this.neq);
    this.assemble();

    const kk = math.subset(
      this.k,
      math.index(unknowns, unknowns)
    ) as math.Matrix;
    const mm = math.subset(
      this.m,
      math.index(unknowns, unknowns)
    ) as math.Matrix;

    const kinv = math.inv(kk);
    const mkinv = math.multiply(kinv, mm);

    const endtime1 = new Date();
    let timediff2 = (endtime1.getTime() - startime.getTime()) / 1000;
    console.log(
      "Matrix inverse took ",
      Math.round(timediff2 * 100) / 100,
      " [sec]"
    );

    const evs = [];
    const neigstofind = Math.min(Math.min(this.n * 2, this.n + 8), this.neq);

    for (let i = 0; i < neigstofind; i++) {
      const startime2 = new Date();
      let nits = 0;
      let rho = 0;
      let newrho = 1e32;

      let x = math.ones(this.neq) as math.Matrix;

      if (i > 0) {
        const max = evs[i - 1]._data.reduce(
          (a, b, i) => (Math.abs(a[0]) < Math.abs(b) ? [b, i] : a),
          [Number.MIN_VALUE, -1]
        );

        x.set([max[1]], 0.0);
      }

      //normovani
      x = math.divide(
        x,
        Math.sqrt(
          math.multiply(
            math.multiply(math.transpose(x), mm),
            x
          ) as math.Matrix as unknown as number
        )
      ) as math.Matrix;

      // gramm schmidt
      let dx = math.zeros(this.neq) as math.Matrix;
      for (let j = 0; j < evs.length; j++) {
        const c = math.multiply(
          math.multiply(math.transpose(evs[j]), mm),
          x
        ) as unknown as number;
        dx = math.add(dx, math.multiply(c, evs[j])) as math.Matrix;
      }
      x = math.subtract(x, dx) as math.Matrix;

      /*x.set([0], 1.5772135732480559);
            x.set([1], 2.047126243079172e-8);
            x.set([2], -0.000019010897757014402);
            x.set([3], 1.5773875149616394);
            x.set([4], -3.098147895542957e-8);
            x.set([5], 1.5775614488843603);*/

      while (
        (Math.abs(newrho - rho) / newrho > this.tol && nits < 100) ||
        nits < 3
      ) {
        rho = newrho;

        const newx = math.squeeze(math.multiply(mkinv, x)) as math.Matrix;
        const divisor = math.dot(newx, math.multiply(mm, newx));
        newrho = math.dot(newx, math.multiply(mm, x) as math.Matrix) / divisor;

        // normovani
        x = math.divide(newx, Math.sqrt(divisor)) as math.Matrix;

        // gramm schmidt
        let dx = math.zeros(this.neq) as math.Matrix;
        for (let j = 0; j < evs.length; j++) {
          const c = math.dot(evs[j], math.multiply(mm, x));
          dx = math.add(dx, math.multiply(c, evs[j])) as math.Matrix;
        }

        x = math.subtract(x, dx) as math.Matrix;

        //console.log(`omega=${Math.sqrt(newrho)}, f=${Math.sqrt(newrho)/(2*Math.PI)}`)

        nits++;
        //console.log(newrho)
      }
      //onsole.log('end')
      //console.log('')
      //console.log(`omega=${Math.sqrt(newrho)}, f=${Math.sqrt(newrho)/(2*Math.PI)}`)
      //console.log(x)
      x = math.squeeze(x);
      evs.push(x);

      this.loadCases[0].eigenNumbers.push(newrho);
      let fullvec = math.zeros(this.neq + this.pneq);
      fullvec = math.subset(
        fullvec,
        math.index(math.range(0, this.neq)),
        x
      ) as math.Matrix;
      this.loadCases[0].eigenVectors.push(fullvec);

      const endtime3 = new Date();
      let timediff3 = (endtime3.getTime() - startime2.getTime()) / 1000;
      console.log(
        "Mode " + (i + 1) + " took ",
        Math.round(timediff3 * 100) / 100,
        " [sec]"
      );
    }

    /*console.log('kontrola ortogonality');
        for(let i =0; i < evs.length; i++) {
            for(let j =i+1; j < evs.length; j++) {
                const err = math.multiply(math.transpose(evs[i]), evs[j]) as unknown as number;
                console.log(`${i}-${j} err=${err}`)
            }
        }*/

    const indices = Array.from(this.loadCases[0].eigenNumbers.keys());
    indices.sort(
      (a, b) =>
        this.loadCases[0].eigenNumbers[a] - this.loadCases[0].eigenNumbers[b]
    );
    (this.loadCases[0].eigenNumbers = indices.map(
      (i) => this.loadCases[0].eigenNumbers[i]
    )),
      (this.loadCases[0].eigenVectors = indices.map(
        (i) => this.loadCases[0].eigenVectors[i]
      ));

    for (let i of this.loadCases[0].eigenNumbers) {
      console.log(`omega2=${i}, f=${Math.sqrt(i) / (2 * Math.PI)}`);
    }

    // Sturm sequence control
    const nwantedeigs = Math.min(this.n, this.neq);
    const maxOmega = this.loadCases[0].eigenNumbers[nwantedeigs - 1];
    const ldl = luqr.luqr.decomposeLDL(
      (math.subtract(kk, math.multiply(maxOmega, mm)) as math.Matrix).toArray()
    );

    // number of negative elements in d matrix implies number of eigen numbers between 0 and max eigen numbers

    if (ldl) {
      var nneg = ldl.d.filter(function (e) {
        return e < 1e-6;
      }).length;

      const missing = nneg - nwantedeigs + 1;
      //console.log(ldl.d)
      console.log(
        "Sturm control sequence: " +
          nneg +
          ", found " +
          nwantedeigs +
          " (" +
          neigstofind +
          "), missing " +
          missing
      );
    }

    const endtime = new Date();
    let timediff = (endtime.getTime() - startime.getTime()) / 1000;
    console.log("Solution took ", Math.round(timediff * 100) / 100, " [sec]");

    this.loadCases[0].solved = true;

    if (!ldl) return this.n;

    return nneg;
  }
}
