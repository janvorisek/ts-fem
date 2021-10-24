import { Solver } from "./fem";
export declare class EigenValueDynamicSolver extends Solver {
    n: number;
    constructor();
    assemble(): void;
    solve(): void;
}
