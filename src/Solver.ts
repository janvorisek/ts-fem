import { DofID, Domain, LoadCase } from "./fem";

/**
 * Class representing linear elastic solver.
 */
export abstract class Solver {
  domain: Domain;
  neq: number; // number of unknowns
  pneq: number; // number of prescribed unknowns
  k: any;
  m: any;
  f: math.MathCollection | number[] | number[][];
  loadCases = new Array<LoadCase>();
  codeNumberGenerated: boolean = false;

  constructor() {
    this.domain = new Domain(this);
    this.loadCases.push(new LoadCase("DefaultLC", this.domain));
  }
  // code numbers assigned to supported as well as free DOFs
  nodeCodeNumbers = new Map<number, { [code: number]: number }>();

  getNodeLocationArray(num: number, dofs: Array<DofID>) {
    var ans = [];
    //console.log("Node:", num, "Locatioan Array dofs:", dofs);
    for (let i of dofs) {
      //console.log(num, i, this.nodeCodeNumbers.get(num)[i]);
      ans = ans.concat(this.nodeCodeNumbers.get(num)[i]);
    }
    return ans;
  }
  getNodeDofIDs(num: number): number[] {
    let ans: number[] = [];
    for (let d in this.nodeCodeNumbers.get(num)) {
      ans.push(parseInt(d));
    }
    return ans;
  }

  generateCodeNumbers() {
    var nodalDofs = new Map<number, Set<DofID>>();
    for (let [key, node] of this.domain.nodes) {
      this.nodeCodeNumbers.set(key, {});
      nodalDofs.set(key, new Set<DofID>());
    }
    // compile list of DOFs needed in nodes from element requirements
    for (let [ie, elem] of this.domain.elements) {
      for (let en of elem.nodes) {
        var dofs = elem.getNodeDofs(en);
        for (let d of dofs) {
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
    for (let [num, node] of this.domain.nodes) {
      for (let d of nodalDofs.get(num)) {
        if (node.bcs.has(d)) {
          this.pneq++;
        } else {
          this.neq++;
        }
      }
    }

    // assign equation (code) numbers to dofs
    var eq: number = 0;
    var peq: number = this.neq;
    for (let [num, node] of this.domain.nodes) {
      for (let d of nodalDofs.get(num)) {
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

  assembleVecLC(f: any, fe: number[], loc: number[], lc: number) {
    for (let i = 0; i < loc.length; i++) {
      f.set([loc[i], lc], f.get([loc[i], lc]) + fe[i]);
    }
  }
  assembleVec(f: any, fe: number[], loc: number[]) {
    for (let i = 0; i < loc.length; i++) {
      f.set([loc[i]], f.get([loc[i]]) + fe[i]);
    }
  }
}
