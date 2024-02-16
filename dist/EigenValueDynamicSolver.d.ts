import { Solver } from ".";
/**
 * Class representing eigen value solver for the structural dynamic problems
 */
export declare class EigenValueDynamicSolver extends Solver {
    n: number;
    tol: number;
    constructor();
    assemble(): void;
    solve(): any;
}
