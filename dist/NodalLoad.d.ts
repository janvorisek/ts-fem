import { Domain } from "./Domain";
import { Load } from "./Load";
import { EnumDictionary, DofID, LabelType } from ".";
/**
 * Implementation of concentrated nodal load
 */
export declare class NodalLoad extends Load {
    values: EnumDictionary<DofID, number>;
    constructor(node: LabelType, domain: Domain, values?: EnumDictionary<DofID, number>);
    change(node: number, values: EnumDictionary<DofID, number>): void;
    getLoadVector(): number[];
    getLocationArray(): number[];
}
