"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearStaticSolver = void 0;
const mathjs_1 = require("mathjs");
const config = {};
const math = mathjs_1.create(mathjs_1.all, config);
const fem_1 = require("./fem");
class LinearStaticSolver extends fem_1.Solver {
    assemble() {
        this.k = math.zeros(this.neq + this.pneq, this.neq + this.pneq);
        for (let [num, el] of this.domain.elements) {
            let estiff = el.computeStiffness();
            let loc = el.getLocationArray();
            let ndofs = math.size(loc)[0];
            if (true) {
                for (let r = 0; r < ndofs; r++) {
                    let rc = loc[r];
                    for (let c = 0; c < ndofs; c++) {
                        let cc = loc[c];
                        this.k.set([rc, cc], this.k.get([rc, cc]) + estiff.get([r, c]));
                    }
                }
            }
            else {
                let acc = math.add(math.subset(this.k, math.index(loc, loc)), el.computeStiffness());
                math.subset(this.k, math.index(loc, loc), acc);
            }
        }
        this.f = math.zeros(this.neq + this.pneq, this.loadCases.length);
        for (let i = 0; i < this.loadCases.length; i++) {
            this.loadCases[i].r = math.zeros(this.neq + this.pneq);
            let lc = this.loadCases[i];
            for (let load of lc.nodalLoadList) {
                this.assembleVecLC(this.f, load.getLoadVector(), load.getLocationArray(), i);
            }
            for (let load of lc.elementLoadList) {
                this.assembleVecLC(this.f, load.getLoadVector(), load.getLocationArray(), i);
            }
            for (let dbc of lc.prescribedBC) {
                this.assembleVec(lc.r, dbc.getNodePrescribedDisplacementVector(), dbc.getLocationArray());
            }
        }
    }
    solve() {
        const startime = new Date();
        if (!this.codeNumberGenerated) {
            this.generateCodeNumbers();
        }
        this.assemble();
        if (this.neq > 0) {
            let unknowns = math.range(0, this.neq);
            let prescribed = math.range(this.neq, this.neq + this.pneq);
            for (let lc = 0; lc < this.loadCases.length; lc++) {
                this.loadCases[lc].solved = false;
                let rp = math.subset(this.loadCases[lc].r, math.index(prescribed));
                let fp = math.multiply(math.subset(this.k, math.index(unknowns, prescribed)), rp);
                let b = math.subtract(math.squeeze(math.subset(this.f, math.index(unknowns, [lc]))), fp);
                let ru = math.squeeze(math.lusolve(math.subset(this.k, math.index(unknowns, unknowns)), b));
                this.loadCases[lc].r = math.subset(this.loadCases[lc].r, math.index(math.range(0, this.neq)), ru);
                this.loadCases[lc].R = math.multiply(math.subset(this.k, math.index(prescribed, unknowns)), ru).toArray();
                this.loadCases[lc].R = math.subtract(this.loadCases[lc].R, math.squeeze(math.subset(this.f, math.index(prescribed, [lc]))));
                this.loadCases[lc].solved = true;
            }
        }
        const endtime = new Date();
        let timediff = (endtime.getTime() - startime.getTime()) / 1000;
        console.log("Solution took ", Math.round(timediff * 100) / 100, " [sec]");
    }
}
exports.LinearStaticSolver = LinearStaticSolver;
//# sourceMappingURL=LinearStaticSolver.js.map