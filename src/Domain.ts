import { Beam2D } from "./Beam2D";
import { CrossSection, CrossSectionParameters } from "./CrossSection";
import { Material, MaterialParameters } from "./Material";
import { Solver } from "./Solver";
import { DofID, LabelType } from ".";
import { Element } from "./Element";
import { Node } from "./Node";

/**
 * Class representing problem domain
 */
export class Domain {
  solver: Solver;
  nodes = new Map<string, Node>();
  elements = new Map<string, Element>();
  materials = new Map<string, Material>();
  crossSections = new Map<string, CrossSection>();

  /**
   * Constructor
   */
  constructor(solver: Solver) {
    this.solver = solver;
  }
  getNode(id: LabelType): Node {
    const _id = id.toString();
    if (this.nodes.has(_id)) {
      return this.nodes.get(_id);
    } else {
      throw new RangeError("Node label " + id + " does not exists");
    }
  }

  getElement(id: LabelType): Element {
    const _id = id.toString();
    if (this.elements.has(_id)) {
      return this.elements.get(_id);
    } else {
      throw new RangeError("Element label " + id + " does not exists");
    }
  }

  getMaterial(id: LabelType): Material {
    const _id = id.toString();
    if (this.materials.has(_id)) {
      return this.materials.get(_id);
    } else {
      throw new RangeError("Material label " + id + " does not exists");
    }
  }
  getCS(id: LabelType): CrossSection {
    const _id = id.toString();
    if (this.crossSections.has(_id)) {
      return this.crossSections.get(_id);
    } else {
      throw new RangeError("CrossSection label " + id + " does not exists");
    }
  }

  // class factory
  createNode(label: LabelType, coords: number[] = [0, 0, 0], bcs: Array<DofID> = []) {
    const ans = new Node(label, this, coords, bcs);
    this.nodes.set(label.toString(), ans);
    return ans;
  }
  createBeam2D(
    label: LabelType,
    nodes: Array<LabelType>,
    mat: LabelType,
    cs: LabelType,
    hinges: [boolean, boolean] = [false, false]
  ) {
    const ans = new Beam2D(label, this, nodes, mat, cs, hinges);

    this.elements.set(label.toString(), ans);
    return ans;
  }
  createMaterial(label: LabelType, params: MaterialParameters = {}) {
    const ans = new Material(label, params);
    this.materials.set(label.toString(), ans);
    return ans;
  }
  createCrossSection(label: LabelType, params: CrossSectionParameters = {}) {
    const ans = new CrossSection(label, params);
    this.crossSections.set(label.toString(), ans);
    return ans;
  }
}
