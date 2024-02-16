import * as math from "mathjs";
import { DofID, Domain, LabelType, LoadCase } from ".";

/**
 * Class representing linear elastic solver.
 */
export abstract class Solver {
  domain: Domain;
  neq: number; // number of unknowns
  pneq: number; // number of prescribed unknowns
  k: math.Matrix;
  m: math.Matrix;
  f: math.MathCollection | number[] | number[][];
  loadCases = new Array<LoadCase>();
  codeNumberGenerated: boolean = false;

  constructor() {
    this.domain = new Domain(this);
    this.loadCases.push(new LoadCase("DefaultLC", this.domain));
  }
  // code numbers assigned to supported as well as free DOFs
  nodeCodeNumbers = new Map<LabelType, { [code: number]: number }>();

  getNodeLocationArray(num: LabelType, dofs: Array<DofID>) {
    let ans = [];
    //console.log("Node:", num, "Locatioan Array dofs:", dofs);
    for (const i of dofs) {
      //console.log(num, i, this.nodeCodeNumbers.get(num)[i]);
      ans = ans.concat(this.nodeCodeNumbers.get(num)[i]);
    }
    return ans;
  }
  getNodeDofIDs(num: LabelType): number[] {
    const ans: number[] = [];
    for (const d in this.nodeCodeNumbers.get(num)) {
      ans.push(parseInt(d));
    }
    return ans;
  }

  generateCodeNumbers() {
    const nodalDofs = new Map<LabelType, Set<DofID>>();
    for (const [key, node] of this.domain.nodes) {
      this.nodeCodeNumbers.set(key, {});
      nodalDofs.set(key, new Set<DofID>());
    }
    // compile list of DOFs needed in nodes from element requirements
    for (const [ie, elem] of this.domain.elements) {
      for (const en of elem.nodes) {
        const dofs = elem.getNodeDofs(en);
        for (const d of dofs) {
          if (nodalDofs.has(en)) {
            nodalDofs.get(en).add(d);
          } else {
            console.log(en, en in nodalDofs, nodalDofs.get(en));
            throw new RangeError("Node label " + en + " does not exists");
          }
        }
      }
    }
    //console.log(nodalDofs);
    // compute number of unknown and prescribed DOFs
    this.neq = 0;
    this.pneq = 0;
    for (const [num, node] of this.domain.nodes) {
      for (const d of nodalDofs.get(num)) {
        if (node.bcs.has(d)) {
          this.pneq++;
        } else {
          this.neq++;
        }
      }
    }

    // assign equation (code) numbers to dofs
    let eq: number = 0;
    let peq: number = this.neq;
    for (const [num, node] of this.domain.nodes) {
      for (const d of nodalDofs.get(num)) {
        if (node.bcs.has(d)) {
          this.nodeCodeNumbers.get(num)[d] = peq++;
        } else {
          this.nodeCodeNumbers.get(num)[d] = eq++;
        }
      }
    }
    //console.log("Number of equations: ",this.neq, ", number of prescribved: ", this.pneq);
    //console.log(this.nodeCodeNumbers);
    this.codeNumberGenerated = true;
  }

  assembleVecLC(f: math.Matrix, fe: number[], loc: number[], lc: number) {
    for (let i = 0; i < loc.length; i++) {
      f.set([loc[i], lc], f.get([loc[i], lc]) + fe[i]);
    }
  }
  assembleVec(f: math.Matrix, fe: number[], loc: number[]) {
    for (let i = 0; i < loc.length; i++) {
      f.set([loc[i]], f.get([loc[i]]) + fe[i]);
    }
  }
}
