import { Beam2D } from "./Beam2D";
import { CrossSection, CrossSectionParameters } from "./CrossSection";
import { Material, MaterialParameters } from "./Material";
import { Solver } from "./Solver";
import { DofID, LabelType } from ".";
import { Element } from "./Element";
import { Node } from "./Node";
/**
 * Class representing the problem domain.
 */
export declare class Domain {
    solver: Solver;
    nodes: Map<string, Node>;
    elements: Map<string, Element>;
    materials: Map<string, Material>;
    crossSections: Map<string, CrossSection>;
    /**
     * Constructor.
     * @param solver The solver instance.
     */
    constructor(solver: Solver);
    /**
     * Get a node by its label.
     * @param id The label of the node.
     * @returns The node with the specified label.
     * @throws RangeError if the node label does not exist.
     */
    getNode(id: LabelType): Node;
    /**
     * Get an element by its label.
     * @param id The label of the element.
     * @returns The element with the specified label.
     * @throws RangeError if the element label does not exist.
     */
    getElement(id: LabelType): Element;
    /**
     * Get a material by its label.
     * @param id The label of the material.
     * @returns The material with the specified label.
     * @throws RangeError if the material label does not exist.
     */
    getMaterial(id: LabelType): Material;
    /**
     * Get a cross section by its label.
     * @param id The label of the cross section.
     * @returns The cross section with the specified label.
     * @throws RangeError if the cross section label does not exist.
     */
    getCS(id: LabelType): CrossSection;
    /**
     * Create a new node.
     * @param label The label of the node.
     * @param coords The coordinates of the node.
     * @param bcs The boundary conditions of the node.
     * @returns The created node.
     */
    createNode(label: LabelType, coords?: number[], bcs?: Array<DofID>): Node;
    /**
     * Create a new 2D beam element.
     * @param label The label of the element.
     * @param nodes The nodes of the element.
     * @param mat The material of the element.
     * @param cs The cross section of the element.
     * @param hinges The hinge conditions of the element.
     * @returns The created beam element.
     */
    createBeam2D(label: LabelType, nodes: Array<LabelType>, mat: LabelType, cs: LabelType, hinges?: [boolean, boolean]): Beam2D;
    /**
     * Create a new material.
     * @param label The label of the material.
     * @param params The parameters of the material.
     * @returns The created material.
     */
    createMaterial(label: LabelType, params?: MaterialParameters): Material;
    /**
     * Create a new cross section.
     * @param label The label of the cross section.
     * @param params The parameters of the cross section.
     * @returns The created cross section.
     */
    createCrossSection(label: LabelType, params?: CrossSectionParameters): CrossSection;
}
