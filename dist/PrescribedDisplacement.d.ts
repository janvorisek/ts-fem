import { Domain } from "./Domain";
import { EnumDictionary, DofID, LabelType } from ".";
/** Class representing prescribed displacement TBD */
export declare class PrescribedDisplacement {
    target: string;
    prescribedValues: EnumDictionary<DofID, number>;
    domain: Domain;
    /**
     * Constructor
     */
    constructor(target: LabelType, domain: Domain, values: EnumDictionary<DofID, number>);
    getNodePrescribedDisplacementVector(): number[];
    getLocationArray(): any[];
}
