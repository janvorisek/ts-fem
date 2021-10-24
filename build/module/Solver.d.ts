import { DofID, Domain, LoadCase } from "./fem";
export declare abstract class Solver {
    domain: Domain;
    neq: number;
    pneq: number;
    k: any;
    m: any;
    f: math.Matrix | number[] | number[][];
    loadCases: LoadCase[];
    codeNumberGenerated: boolean;
    constructor();
    nodeCodeNumbers: Map<number, {
        [code: number]: number;
    }>;
    getNodeLocationArray(num: number, dofs: Array<DofID>): any[];
    getNodeDofIDs(num: number): number[];
    generateCodeNumbers(): void;
    assembleVecLC(f: any, fe: number[], loc: number[], lc: number): void;
    assembleVec(f: any, fe: number[], loc: number[]): void;
}
