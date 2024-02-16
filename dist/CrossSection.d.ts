import { LabelType } from ".";
export interface CrossSectionParameters {
    a?: number;
    iy?: number;
    iz?: number;
    dyz?: number;
    h?: number;
    k?: number;
    j?: number;
}
interface CrossSectionChangeParameters extends CrossSectionParameters {
    label?: LabelType;
}
/** A class representing beam cross section
 */
export declare class CrossSection {
    label: string;
    a: number;
    iy: number;
    iz: number;
    dyz: number;
    h: number;
    k: number;
    j: number;
    /**
     * Constructor
     * @param label string label of receiver
     * @param a cross section area of receiver [m2]. > 0.0
     * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
     * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
     * @param dyz product moment of area with respect to yz axes [m4]
     * @param h height of receiver [m]
     * @param k Timoshenko's shear coefficient [-]
     * @param j torsional stiffness moment [m4]
     */
    constructor(label: LabelType, params?: CrossSectionParameters);
    /**
     * Change receiver properties
     * @param a cross section area of receiver [m2]. > 0.0
     * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
     * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
     * @param dyz product moment of area with respect to yz axes [m4]
     * @param h height of receiver [m]
     * @param k Timoshenko's shear coefficient [-]
     * @param j torsional stiffness moment [m4]
     */
    change(params: CrossSectionChangeParameters): void;
}
export {};
