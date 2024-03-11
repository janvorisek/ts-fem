import { BeamElementLoad } from "./BeamElementLoad";
import { Domain } from "./Domain";
import { LabelType } from ".";
export declare class BeamTemperatureLoad extends BeamElementLoad {
    values: number[];
    constructor(elem: LabelType, domain: Domain, values: number[]);
    change(elem: LabelType, values: number[]): void;
    getLoadVectorForClampedBeam(): Array<number>;
    getLocationArray(): number[];
    getLoadVector(): number[];
    computeBeamDeflectionContrib(xl: number): {
        u: number;
        w: number;
    };
    computeBeamNContrib(x: number): number;
    computeBeamVContrib(x: number): number;
    computeBeamMContrib(x: number): number;
}
