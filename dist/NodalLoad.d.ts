import { Domain } from "./Domain";
import { Load } from "./Load";
import { EnumDictionary, DofID } from ".";
/**
 * Implementation of concentrated nodal load
 */
export declare class NodalLoad extends Load {
    values: EnumDictionary<DofID, number>;
    constructor(node: number, domain: Domain, values?: EnumDictionary<DofID, number>);
    change(node: number, values: EnumDictionary<DofID, number>): void;
    getLoadVector(): number[];
    getLocationArray(): number[];
}
