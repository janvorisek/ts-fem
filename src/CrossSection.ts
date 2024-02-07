import { LabelType } from "./fem";

// TODO: All parameters are optional now
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

// TODO: no defaults specified, is that correct?
const CrossSectionParametersDefaults = {};

/** A class representing beam cross section
 */
export class CrossSection {
  label: string; // label of receiver
  a: number; // cross section area of receiver [m2]. > 0.0
  iy: number; // area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
  iz: number; // area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
  dyz: number; // product moment of area with respect to yz axes [m4]
  h: number; // height of receiver [m]
  k: number; // Timoshenko's shear coefficient [-]
  j: number; // torsional stiffness moment [m4]

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
  constructor(label: LabelType, params: CrossSectionParameters = {}) {
    // Compulsory parameters
    this.label = label.toString();

    // Optional parameters
    params = { ...CrossSectionParametersDefaults, ...params };
    this.a = params.a;
    this.iy = params.iy;
    this.iz = params.iz;
    this.dyz = params.dyz;
    this.h = params.h;
    this.k = params.k;
    this.j = params.j;
  }

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
  change(params: CrossSectionChangeParameters) {
    if (params.a != undefined) this.a = params.a;
    if (params.iy != undefined) this.iy = params.iy;
    if (params.iz != undefined) this.iz = params.iz;
    if (params.dyz != undefined) this.dyz = params.dyz;
    if (params.h != undefined) this.h = params.h;
    if (params.k != undefined) this.k = params.k;
    if (params.j != undefined) this.j = params.j;
  }
}
