import * as math from "mathjs";
import { Domain } from "./Domain";
import { DofID, LabelType } from ".";
/**
 * A class representing Finite Element
 */
export declare abstract class Element {
    label: string;
    nodes: Array<string>;
    mat: string;
    cs: string;
    domain: Domain;
    /**
     * Constructor
     * @param label new label
     * @param nodes element nodes
     * @param mat element material number
     * @param cs element cross section number
     */
    constructor(label: LabelType, domain: Domain, nodes: Array<LabelType>, mat: LabelType, cs: LabelType);
    /**
     * Change receiver properties
     * @param label new label
     * @param nodes nodes
     * @param mat new material (number)
     * @param cs new cross section (number)
     */
    change(label: LabelType, nodes: Array<number>, mat: LabelType, cs: LabelType): void;
    change2(params: {
        label: LabelType;
        nodes?: LabelType[];
        mat?: LabelType;
        cs?: LabelType;
    }): void;
    /**
     * Returns Material (object) associated to element
     */
    getMaterial(): import("./Material").Material;
    /**
     * Returns Cross Section (object) associated to element
     */
    getCS(): import("./CrossSection").CrossSection;
    /**
     * Returns array of DOFs for given node
     * @param node node id
     */
    getNodeDofs(node: LabelType): Array<DofID>;
    /**
     * Computes global stiffness matrix of element
     */
    computeStiffness(): any;
    /**
     * Computes global mass matrix of element
     */
    computeMassMatrix(): any;
    /**
     * Returns element code numbers
     */
    getLocationArray(): any;
    /**
     * Returns object with element geometry
     */
    computeGeo(): any;
    /**
     * Returns element transformation matrix frol global to local c.s
     */
    computeT(): math.Matrix;
}
