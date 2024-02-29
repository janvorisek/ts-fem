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
export declare class Domain {
    solver: Solver;
    nodes: Map<string, Node>;
    elements: Map<string, Element>;
    materials: Map<string, Material>;
    crossSections: Map<string, CrossSection>;
    /**
     * Constructor
     */
    constructor(solver: Solver);
    getNode(id: LabelType): Node;
    getElement(id: LabelType): Element;
    getMaterial(id: LabelType): Material;
    getCS(id: LabelType): CrossSection;
    createNode(label: LabelType, coords?: number[], bcs?: Array<DofID>): Node;
    createBeam2D(label: LabelType, nodes: Array<LabelType>, mat: LabelType, cs: LabelType, hinges?: [boolean, boolean]): Beam2D;
    createMaterial(label: LabelType, params?: MaterialParameters): Material;
    createCrossSection(label: LabelType, params?: CrossSectionParameters): CrossSection;
}
