import { Load } from "./Load";

/**
 * Abstract class for Beam elements extending the basic Load class to evaluate load contribution to
 * exact displacement and internal forces.
 */
export class BeamElementLoad extends Load {
  getLoadVectorForClampedBeam(): Array<number> {
    return [];
  }
  computeBeamDeflectionContrib(xl: number): { u: number; w: number } {
    return { u: 0, w: 0 };
  }
  computeBeamNContrib(x: number): number {
    return 0;
  }
  computeBeamVContrib(x: number): number {
    return 0;
  }
  computeBeamMContrib(x: number): number {
    return 0;
  }
}
