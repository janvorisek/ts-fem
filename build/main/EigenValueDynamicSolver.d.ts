import { Solver } from "./fem";
export declare class EigenValueDynamicSolver extends Solver {
    n: number;
    tol: number;
    constructor();
    assemble(): void;
    solve(): any;
}
