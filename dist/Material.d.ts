import { LabelType } from ".";
export interface MaterialParameters {
    e?: number;
    g?: number;
    alpha?: number;
    d?: number;
}
interface MaterialChangeParameters extends MaterialParameters {
    label?: LabelType;
}
/**
 * A class representing linear elastic material
 */
export declare class Material {
    label: string;
    e: number;
    g: number;
    alpha: number;
    d: number;
    /**
     * @param  label int label of receiver
     * @param  e Young's modulus of receiver [Pa]
     * @param g  Shear modulus of receiver [Pa]
     * @param alpha thermal dillatation coefficient [K-1]
     * @param d mass density of receiver [kg/m3]
     */
    constructor(label: LabelType, params?: MaterialParameters);
    /**
     * Change receiver properties
     * @param  e Young's modulus of receiver [Pa]
     * @param g  Shear modulus of receiver [Pa]
     * @param alpha thermal dillatation coefficient [K-1]
     * @param d mass density of receiver [kg/m3]
     */
    change(params: MaterialChangeParameters): void;
}
export {};
