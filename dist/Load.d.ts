import { Domain } from "./Domain";
import { LabelType } from ".";
/**
 * Abstract class representing all loads
 */
export declare class Load {
    target: string;
    domain: Domain;
    /**
     * Returns load vector for clamped beam
     * @param elem element number
     */
    constructor(target: LabelType, domain: Domain);
    /**
     * Evaluates the contribution to the load vector
     */
    getLoadVector(): number[];
    /**
     * Returns load code numbers
     */
    getLocationArray(): number[];
}
