import { Domain } from "./Domain";
import { LabelType } from ".";

/**
 * Abstract class representing all loads
 */
export class Load {
  target: string; // component number the target is applied
  domain: Domain;
  /**
   * Returns load vector for clamped beam
   * @param elem element number
   */
  constructor(target: LabelType, domain: Domain) {
    this.target = target.toString();
    this.domain = domain;
  }

  /**
   * Evaluates the contribution to the load vector
   */
  getLoadVector(): number[] {
    return [];
  }
  /**
   * Returns load code numbers
   */
  getLocationArray(): number[] {
    return [];
  }
}
