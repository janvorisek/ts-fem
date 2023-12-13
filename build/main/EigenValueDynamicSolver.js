"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EigenValueDynamicSolver = void 0;
const mathjs_1 = require("mathjs");
const config = {};
const math = (0, mathjs_1.create)(mathjs_1.all, config);
const luqr = require("luqr");
const fem_1 = require("./fem");
class EigenValueDynamicSolver extends fem_1.Solver {
    constructor() {
        super();
        this.n = 10;
        this.tol = 1e-12;
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
        this.loadCases[0].solved = false;
        const startime = new Date();
        if (!this.codeNumberGenerated) {
            this.generateCodeNumbers();
        }
        let unknowns = math.range(0, this.neq);
        this.assemble();
        const kk = math.subset(this.k, math.index(unknowns, unknowns));
        const mm = math.subset(this.m, math.index(unknowns, unknowns));
        const kinv = math.inv(kk);
        const mkinv = math.multiply(kinv, mm);
        const endtime1 = new Date();
        let timediff2 = (endtime1.getTime() - startime.getTime()) / 1000;
        console.log("Matrix inverse took ", Math.round(timediff2 * 100) / 100, " [sec]");
        const evs = [];
        const neigstofind = Math.min(Math.min(this.n * 2, this.n + 8), this.neq);
        for (let i = 0; i < neigstofind; i++) {
            const startime2 = new Date();
            let nits = 0;
            let rho = 0;
            let newrho = 1e32;
            let x = math.ones(this.neq);
            if (i > 0) {
                const max = evs[i - 1]._data.reduce((a, b, i) => (Math.abs(a[0]) < Math.abs(b) ? [b, i] : a), [Number.MIN_VALUE, -1]);
                x.set([max[1]], 0.0);
            }
            x = math.divide(x, Math.sqrt(math.multiply(math.multiply(math.transpose(x), mm), x)));
            let dx = math.zeros(this.neq);
            for (let j = 0; j < evs.length; j++) {
                const c = math.multiply(math.multiply(math.transpose(evs[j]), mm), x);
                dx = math.add(dx, math.multiply(c, evs[j]));
            }
            x = math.subtract(x, dx);
            while ((Math.abs(newrho - rho) / newrho > this.tol && nits < 100) ||
                nits < 3) {
                rho = newrho;
                const newx = math.squeeze(math.multiply(mkinv, x));
                const divisor = math.dot(newx, math.multiply(mm, newx));
                newrho = math.dot(newx, math.multiply(mm, x)) / divisor;
                x = math.divide(newx, Math.sqrt(divisor));
                let dx = math.zeros(this.neq);
                for (let j = 0; j < evs.length; j++) {
                    const c = math.dot(evs[j], math.multiply(mm, x));
                    dx = math.add(dx, math.multiply(c, evs[j]));
                }
                x = math.subtract(x, dx);
                nits++;
            }
            x = math.squeeze(x);
            evs.push(x);
            this.loadCases[0].eigenNumbers.push(newrho);
            let fullvec = math.zeros(this.neq + this.pneq);
            fullvec = math.subset(fullvec, math.index(math.range(0, this.neq)), x);
            this.loadCases[0].eigenVectors.push(fullvec);
            const endtime3 = new Date();
            let timediff3 = (endtime3.getTime() - startime2.getTime()) / 1000;
            console.log("Mode " + (i + 1) + " took ", Math.round(timediff3 * 100) / 100, " [sec]");
        }
        const indices = Array.from(this.loadCases[0].eigenNumbers.keys());
        indices.sort((a, b) => this.loadCases[0].eigenNumbers[a] - this.loadCases[0].eigenNumbers[b]);
        (this.loadCases[0].eigenNumbers = indices.map((i) => this.loadCases[0].eigenNumbers[i])),
            (this.loadCases[0].eigenVectors = indices.map((i) => this.loadCases[0].eigenVectors[i]));
        for (let i of this.loadCases[0].eigenNumbers) {
            console.log(`omega2=${i}, f=${Math.sqrt(i) / (2 * Math.PI)}`);
        }
        const nwantedeigs = Math.min(this.n, this.neq);
        const maxOmega = this.loadCases[0].eigenNumbers[nwantedeigs - 1];
        const ldl = luqr.luqr.decomposeLDL(math.subtract(kk, math.multiply(maxOmega, mm)).toArray());
        if (ldl) {
            var nneg = ldl.d.filter(function (e) {
                return e < 1e-6;
            }).length;
            const missing = nneg - nwantedeigs + 1;
            console.log("Sturm control sequence: " +
                nneg +
                ", found " +
                nwantedeigs +
                " (" +
                neigstofind +
                "), missing " +
                missing);
        }
        const endtime = new Date();
        let timediff = (endtime.getTime() - startime.getTime()) / 1000;
        console.log("Solution took ", Math.round(timediff * 100) / 100, " [sec]");
        this.loadCases[0].solved = true;
        if (!ldl)
            return this.n;
        return nneg;
    }
}
exports.EigenValueDynamicSolver = EigenValueDynamicSolver;
//# sourceMappingURL=EigenValueDynamicSolver.js.map