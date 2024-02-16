import * as math from "mathjs";
import { Domain } from "./Domain";
import { DofID, LabelType } from ".";
import { LoadCase } from "./LoadCase";

/**
 * "A class representing a FE node
 * bcs and pDspl: x,y,z for displacement, X,Y,Z for rotations
 */
export class Node {
  label: string; // Node number
  domain: Domain; // domain reference
  coords: Array<number>; // ([float,float,float])* coordinates [m]
  //bcs: Set<DofID>; // for each DOF (identified by string id) the bc is applied
  //Note: prescribed values to be specified via boundaryCondition class
  bcs: Set<DofID>;
  //Node local coordinate system. In this c.s. boundary conditions are applied and results obtained
  /**
   * Triplet defining the local coordinate system in node.
   * Value at position (i,j) represents angle between e'(i) and e(j),
   * where e' is base vector of local coordinate system and e is
   * base vector of global c.s.
   */
  lcs: number[][];
  /**
   * Node constructor
   * @param label number
   * @param coords coordinates
   * @param bcs boundary conditions {code:string]:boolean}
   */
  constructor(label: LabelType, domain: Domain, coords: number[] = [0, 0, 0], bcs: Array<DofID> = []) {
    this.label = label.toString();
    this.domain = domain;
    this.coords = coords;
    this.bcs = new Set<DofID>(bcs);
    this.lcs = undefined; // means local cs is the same as global cs
  }
  /**
   * Change properties
   * @param label new label
   * @param coords new coordinates
   * @param bcs new dictionary with applied boundary conditions
   */
  change(label: LabelType, coords: number[], bcs: Array<DofID> = []) {
    if (label != undefined) this.label = label.toString();
    if (coords != undefined) this.coords = coords;
    if (bcs != undefined) this.bcs = new Set<DofID>(bcs);
  }

  change2(params: {
    label?: LabelType;
    coords?: number[];
    bcs?: Array<DofID>;
    lcs?: { locx: number[]; locy: number[] };
  }) {
    if (params.label != undefined) {
      this.label = params.label.toString();
    }
    if (params.coords != undefined) {
      this.coords = params.coords;
    }
    if (params.bcs != undefined) {
      this.bcs = new Set<DofID>(params.bcs);
    }
    if (params.lcs != undefined) {
      this.updateLcs(params.lcs);
    }
  }

  getLocationArray(dofs: Array<DofID>) {
    return this.domain.solver.getNodeLocationArray(this.label, dofs);
  }

  getUnknowns(lc: LoadCase, dofs: Array<DofID>) {
    const cn = this.getLocationArray(dofs);
    return math.subset(lc.r, math.index(cn));
  }

  getEigenValueUnknowns(lc: LoadCase, dofs: Array<DofID>, ev: number) {
    const cn = this.getLocationArray(dofs);

    return math.subset(lc.eigenVectors[ev], math.index(cn));
  }

  /**
   * Returns receiver transformation matrix (from nodal to global c.s., ie. rg=t*r_n)
   * @param dofs dofs mask to consider
   */
  getTransformationMtrx(dofs: Array<DofID>) {
    const size = dofs.length;
    if (this.lcs == undefined) {
      return math.identity(size);
    } else {
      const ans = math.zeros([size, size]);

      for (let i = 0; i < size; i++) {
        const id = dofs[i];
        // test for vector quantities
        switch (id) {
        case DofID.Dx:
        case DofID.Dy:
        case DofID.Dz:
          for (let j = 0; j < size; j++) {
            const id2 = dofs[j];
            if (id2 == DofID.Dx || id2 == DofID.Dy || id2 == DofID.Dz) {
              ans[i][j] = this.lcs[id2][id];
            }
          }
          break;

        case DofID.Rx:
        case DofID.Ry:
        case DofID.Rz:
          for (let j = 0; j < size; j++) {
            const id2 = dofs[j];
            if (id2 == DofID.Rx || id2 == DofID.Ry || id2 == DofID.Rz) {
              ans[i][j] = this.lcs[id2 - DofID.Rx][id - DofID.Rx];
            }
          }
          break;
        default:
          throw new TypeError("Unknown DofID: " + id);
        } // end switch
      } // end loop over dofs
      return math.matrix(ans);
    }
  }
  /**
   * Updates the reciver lcs triplet according to given lcs orientation
   * @param lcs
   */
  updateLcs(lcs?: { locx: number[]; locy: number[] }) {
    if (lcs == undefined) {
      this.lcs = undefined; // reset to default
    } else {
      this.lcs = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      const e1norm = math.norm(lcs.locx) as number;
      const e2norm = math.norm(lcs.locy) as number;
      for (let j = 0; j < 3; j++) {
        // normalize e1' e2'
        this.lcs[0][j] = lcs.locx[j] / e1norm;
        this.lcs[1][j] = lcs.locy[j] / e2norm;
      }

      // vector e3' computed from vector product of e1', e2'
      this.lcs[2][0] = this.lcs[0][1] * this.lcs[1][2] - this.lcs[0][2] * this.lcs[1][1];
      this.lcs[2][1] = this.lcs[0][2] * this.lcs[1][0] - this.lcs[0][0] * this.lcs[1][2];
      this.lcs[2][2] = this.lcs[0][0] * this.lcs[1][1] - this.lcs[0][1] * this.lcs[1][0];
    }
  }
  /**
   * Returns true if receiver has local c.s.
   */
  hasLcs() {
    return this.lcs != undefined;
  }

  getReactions(lc: LoadCase, inGlobalCS: boolean = false) {
    if (inGlobalCS && this.hasLcs()) {
      const sdofs = this.domain.solver.getNodeDofIDs(this.label); // all dofs
      const cn = this.getLocationArray(sdofs); // code numbers of all DOFs
      const R: number[] = [];
      for (let i = 0; i < sdofs.length; i++) {
        if (this.bcs.has(sdofs[i])) {
          R.push(<number>(<any>math.subset(lc.R, math.index([cn[i] - this.domain.solver.neq])))); // math.js type maze
        } else {
          R.push(0.0);
        }
      }
      const t = this.getTransformationMtrx(sdofs);
      return {
        dofs: sdofs,
        values: (<math.Matrix>math.multiply(t, R)).toArray(),
      };
    } else {
      // results in nodal c.s.
      if (this.bcs.size > 0) {
        const sdofs = Array.from(this.bcs); // supported dofs only
        const cn = this.getLocationArray(sdofs); // code numbers of supported DOFs
        const ccn = math.subtract(cn, this.domain.solver.neq);
        const R = math.subset(lc.R, math.index(ccn));
        if (math.typeOf(R) === "number") {
          return { dofs: sdofs, values: [R] };
        } else {
          return { dofs: sdofs, values: R };
        }
      } else {
        return { dofs: [], values: [] };
      }
    }
  }
}
