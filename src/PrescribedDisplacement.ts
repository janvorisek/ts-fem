import { Domain } from "./Domain";
import { EnumDictionary, DofID, LabelType } from "./fem";

/** Class representing prescribed displacement TBD */
export class PrescribedDisplacement {
  target: string; // node (umber) subjected to Prescribed Displacement
  prescribedValues: EnumDictionary<DofID, number>; // prescribed values of individual DOFs
  domain: Domain;

  /**
   * Constructor
   */
  constructor(target: LabelType, domain: Domain, values: EnumDictionary<DofID, number>) {
    this.target = target.toString();
    this.prescribedValues = values;
    this.domain = domain;
  }
  getNodePrescribedDisplacementVector() {
    const answer = new Array<number>();
    // get node DOFs
    const dofs = this.domain.solver.getNodeDofIDs(this.target);
    // generate prescribed displacement vector
    for (const dof of dofs) {
      if (dof in this.prescribedValues) {
        answer.push(this.prescribedValues[dof]);
      } else {
        answer.push(0.0);
      }
    }
    return answer;
  }
  getLocationArray() {
    return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
  }
}
