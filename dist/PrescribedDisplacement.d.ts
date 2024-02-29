import { Domain } from "./Domain";
import { EnumDictionary, DofID, LabelType } from ".";
/**
 * Represents a prescribed displacement applied to a node in a domain.
 */
export declare class PrescribedDisplacement {
    target: string;
    prescribedValues: EnumDictionary<DofID, number>;
    domain: Domain;
    /**
     * Constructs a new PrescribedDisplacement object.
     * @param target - The label of the target node.
     * @param domain - The domain in which the prescribed displacement is applied.
     * @param values - The prescribed values of individual degrees of freedom (DOFs).
     */
    constructor(target: LabelType, domain: Domain, values: EnumDictionary<DofID, number>);
    /**
     * Gets the prescribed displacement vector for the target node.
     * @returns The prescribed displacement vector.
     */
    getNodePrescribedDisplacementVector(): number[];
    /**
     * Gets the location array for the target node.
     * @returns The location array.
     */
    getLocationArray(): any[];
}
