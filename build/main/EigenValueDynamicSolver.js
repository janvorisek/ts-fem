"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EigenValueDynamicSolver = void 0;
const mathjs_1 = require("mathjs");
const config = {};
const math = mathjs_1.create(mathjs_1.all, config);
const fem_1 = require("./fem");
class EigenValueDynamicSolver extends fem_1.Solver {
    constructor() {
        super();
        this.n = 10;
    }
    assemble() {
        this.k = math.zeros(this.neq + this.pneq, this.neq + this.pneq);
        this.m = math.zeros(this.neq + this.pneq, this.neq + this.pneq);
        this.loadCases[0].r = math.zeros(this.neq + this.pneq);
        this.loadCases[0].eigenVectors = [];
        this.loadCases[0].eigenNumbers = [];
        for (let [num, el] of this.domain.elements) {
            let estiff = el.computeStiffness();
            let emass = el.computeMassMatrix();
            let loc = el.getLocationArray();
            let ndofs = math.size(loc)[0];
            for (let r = 0; r < ndofs; r++) {
                let rc = loc[r];
                for (let c = 0; c < ndofs; c++) {
                    let cc = loc[c];
                    this.k.set([rc, cc], this.k.get([rc, cc]) + estiff.get([r, c]));
                    this.m.set([rc, cc], this.m.get([rc, cc]) + emass.get([r, c]));
                }
            }
        }
    }
    solve() {
        const startime = new Date();
        if (!this.codeNumberGenerated) {
            this.generateCodeNumbers();
        }
        let unknowns = math.range(0, this.neq);
        this.assemble();
        const kk = math.subset((this.k), math.index(unknowns, unknowns));
        const mm = math.subset((this.m), math.index(unknowns, unknowns));
        const endtime1 = new Date();
        const mkinv = math.multiply(math.inv(kk), mm);
        let timediff2 = (endtime1.getTime() - startime.getTime()) / 1000;
        console.log("Matrix inverse took ", Math.round(timediff2 * 100) / 100, " [sec]");
        const evs = [];
        for (let i = 0; i < Math.min(this.n, this.neq); i++) {
            let tol = 1e-4;
            let rho = 0;
            let newrho = 999;
            let x = math.ones(this.neq);
            while (Math.abs(newrho - rho) / newrho > tol) {
                rho = newrho;
                const newx = math.squeeze(math.multiply(mkinv, x));
                const divisor = math.multiply(math.multiply(math.transpose(newx), mm), newx);
                newrho = math.multiply(math.multiply(math.transpose(newx), mm), x) / divisor;
                x = math.divide(newx, Math.sqrt(divisor));
                let dx = math.zeros(this.neq);
                for (let j = 0; j < this.loadCases[0].eigenNumbers.length; j++) {
                    const c = math.multiply(math.multiply(math.transpose(evs[j]), mm), x);
                    dx = math.add(dx, math.multiply(c, evs[j]));
                }
                x = math.subtract(x, dx);
            }
            console.log(`omega=${Math.sqrt(newrho)}, f=${Math.sqrt(newrho) / (2 * Math.PI)}`);
            x = math.squeeze(x);
            evs.push(x);
            this.loadCases[0].eigenNumbers.push(Math.sqrt(newrho));
            let fullvec = math.zeros(this.neq + this.pneq);
            fullvec = math.subset(fullvec, math.index(math.range(0, this.neq)), x);
            this.loadCases[0].eigenVectors.push(fullvec);
        }
        const endtime = new Date();
        let timediff = (endtime.getTime() - startime.getTime()) / 1000;
        console.log("Solution took ", Math.round(timediff * 100) / 100, " [sec]");
    }
}
exports.EigenValueDynamicSolver = EigenValueDynamicSolver;
//# sourceMappingURL=EigenValueDynamicSolver.js.map