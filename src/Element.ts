import * as math from "mathjs";
import { Domain } from "./Domain";
import { DofID, LabelType } from ".";

/**
 * A class representing Finite Element
 */
export abstract class Element {
  label: string; //element number
  nodes: Array<string>; // element nodes
  mat: string; // material
  cs: string; // cross section
  domain: Domain; // domain reference

  /**
   * Constructor
   * @param label new label
   * @param nodes element nodes
   * @param mat element material number
   * @param cs element cross section number
   */
  constructor(label: LabelType, domain: Domain, nodes: Array<LabelType>, mat: LabelType, cs: LabelType) {
    this.label = label.toString();
    this.nodes = nodes.map((x) => x.toString());
    this.mat = mat.toString();
    this.cs = cs.toString();
    this.domain = domain;
  }
  /**
   * Change receiver properties
   * @param label new label
   * @param nodes nodes
   * @param mat new material (number)
   * @param cs new cross section (number)
   */
  change(label: LabelType, nodes: Array<number>, mat: LabelType, cs: LabelType) {
    if (label != undefined) this.label = label.toString();
    if (nodes != undefined) this.nodes = nodes.map((x) => x.toString());
    if (mat != undefined) this.mat = mat.toString();
    if (cs != undefined) this.cs = cs.toString();
  }

  /**
   * Returns Material (object) associated to element
   */
  getMaterial() {
    return this.domain.getMaterial(this.mat);
  }
  /**
   * Returns Cross Section (object) associated to element
   */
  getCS() {
    return this.domain.getCS(this.cs);
  }
  /**
   * Returns array of DOFs for given node
   * @param node node id
   */
  getNodeDofs(node: LabelType): Array<DofID> {
    return [];
  }
  /**
   * Computes global stiffness matrix of element
   */
  computeStiffness(): any {}
  /**
   * Computes global mass matrix of element
   */
  computeMassMatrix(): any {}
  /**
   * Returns element code numbers
   */
  getLocationArray(): any {}
  /**
   * Returns object with element geometry
   */
  computeGeo(): any {}
  /**
   * Returns element transformation matrix frol global to local c.s
   */
  computeT(): math.Matrix {
    return math.matrix();
  }
}
