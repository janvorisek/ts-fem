import { LabelType } from "./fem";

export interface MaterialParameters {
  e?: number;
  g?: number;
  alpha?: number;
  d?: number;
}

interface MaterialChangeParameters extends MaterialParameters {
  label?: LabelType;
}

const MaterialParametersDefaults = { e: 1.0, g: 1.0, alpha: 1.0, d: 1.0 };

/**
 * A class representing linear elastic material
 */
export class Material {
  label: string; //  label
  e: number; // Young's modulus [Pa]
  g: number; // Shear modulus [Pa]
  alpha: number; // thermal dillatation coefficient [K-1]
  d: number; // mass density [kg/m3]

  /**
   * @param  label int label of receiver
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  constructor(label: LabelType, params: MaterialParameters = {}) {
    // Compulsory parameters
    this.label = label.toString();

    // Optional parameters
    params = { ...MaterialParametersDefaults, ...params };
    this.e = params.e;
    this.g = params.g;
    this.alpha = params.alpha;
    this.d = params.d;
  }

  /**
   * Change receiver properties
   * @param  e Young's modulus of receiver [Pa]
   * @param g  Shear modulus of receiver [Pa]
   * @param alpha thermal dillatation coefficient [K-1]
   * @param d mass density of receiver [kg/m3]
   */
  change(params: MaterialChangeParameters) {
    if (params.e !== undefined) this.e = params.e;
    if (params.g !== undefined) this.g = params.g;
    if (params.alpha !== undefined) this.alpha = params.alpha;
    if (params.d !== undefined) this.d = params.d;
  }
}
