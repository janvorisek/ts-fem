import * as math from "mathjs";
import { Domain } from "./Domain";
import { DofID, LabelType } from ".";
import { LoadCase } from "./LoadCase";
/**
 * "A class representing a FE node
 * bcs and pDspl: x,y,z for displacement, X,Y,Z for rotations
 */
export declare class Node {
    label: string;
    domain: Domain;
    coords: Array<number>;
    bcs: Set<DofID>;
    /**
     * Triplet defining the local coordinate system in node.
     * Value at position (i,j) represents angle between e'(i) and e(j),
     * where e' is base vector of local coordinate system and e is
     * base vector of global c.s.
     */
    lcs: number[][];
    /**
     * Node constructor
     * @param label number
     * @param coords coordinates
     * @param bcs boundary conditions {code:string]:boolean}
     */
    constructor(label: LabelType, domain: Domain, coords?: number[], bcs?: Array<DofID>);
    /**
     * Change properties
     * @param label new label
     * @param coords new coordinates
     * @param bcs new dictionary with applied boundary conditions
     */
    change(label: LabelType, coords: number[], bcs?: Array<DofID>): void;
    change2(params: {
        label?: LabelType;
        coords?: number[];
        bcs?: Array<DofID>;
        lcs?: {
            locx: number[];
            locy: number[];
        };
    }): void;
    getLocationArray(dofs: Array<DofID>): any[];
    getUnknowns(lc: LoadCase, dofs: Array<DofID>): math.Matrix;
    getEigenValueUnknowns(lc: LoadCase, dofs: Array<DofID>, ev: number): math.Matrix;
    /**
     * Returns receiver transformation matrix (from nodal to global c.s., ie. rg=t*r_n)
     * @param dofs dofs mask to consider
     */
    getTransformationMtrx(dofs: Array<DofID>): number | math.MathCollection;
    /**
     * Updates the reciver lcs triplet according to given lcs orientation
     * @param lcs
     */
    updateLcs(lcs?: {
        locx: number[];
        locy: number[];
    }): void;
    /**
     * Returns true if receiver has local c.s.
     */
    hasLcs(): boolean;
    getReactions(lc: LoadCase, inGlobalCS?: boolean): {
        dofs: number[];
        values: math.MathArray;
    } | {
        dofs: DofID[];
        values: math.Matrix[];
    } | {
        dofs: DofID[];
        values: math.Matrix;
    };
}
