import { Solver } from "./fem";
export declare class EigenValueDynamicSolver extends Solver {
    constructor();
    assemble(): void;
    solve(): void;
}
