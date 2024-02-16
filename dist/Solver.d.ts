import * as math from "mathjs";
import { DofID, Domain, LabelType, LoadCase } from ".";
/**
 * Class representing linear elastic solver.
 */
export declare abstract class Solver {
    domain: Domain;
    neq: number;
    pneq: number;
    k: math.Matrix;
    m: math.Matrix;
    f: math.MathCollection | number[] | number[][];
    loadCases: LoadCase[];
    codeNumberGenerated: boolean;
    constructor();
    nodeCodeNumbers: Map<LabelType, {
        [code: number]: number;
    }>;
    getNodeLocationArray(num: LabelType, dofs: Array<DofID>): any[];
    getNodeDofIDs(num: LabelType): number[];
    generateCodeNumbers(): void;
    assembleVecLC(f: math.Matrix, fe: number[], loc: number[], lc: number): void;
    assembleVec(f: math.Matrix, fe: number[], loc: number[]): void;
}
