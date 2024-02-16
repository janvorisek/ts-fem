import { Domain } from "./Domain";
import { Load } from "./Load";
import { EnumDictionary, DofID } from ".";

/**
 * Implementation of concentrated nodal load
 */
export class NodalLoad extends Load {
  values: EnumDictionary<DofID, number>;

  constructor(node: number, domain: Domain, values: EnumDictionary<DofID, number> = {}) {
    super(node, domain);
    this.values = values;
  }
  change(node: number, values: EnumDictionary<DofID, number>) {
    this.target = node.toString();
    this.values = values;
  }
  getLoadVector(): number[] {
    const dofs = this.domain.solver.getNodeDofIDs(this.target);
    const ans = Array<number>();
    for (const idof of dofs) {
      if (idof in this.values) {
        ans.push(this.values[idof]);
      } else {
        ans.push(0.0);
      }
    }
    return ans;
  }
  getLocationArray(): number[] {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
