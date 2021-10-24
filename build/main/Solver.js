"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solver = void 0;
const fem_1 = require("./fem");
class Solver {
    constructor() {
        this.loadCases = new Array();
        this.codeNumberGenerated = false;
        this.nodeCodeNumbers = new Map();
        this.domain = new fem_1.Domain(this);
        this.loadCases.push(new fem_1.LoadCase("DefaultLC", this.domain));
    }
    getNodeLocationArray(num, dofs) {
        var ans = [];
        for (let i of dofs) {
            ans = ans.concat(this.nodeCodeNumbers.get(num)[i]);
        }
        return ans;
    }
    getNodeDofIDs(num) {
        let ans = [];
        for (let d in this.nodeCodeNumbers.get(num)) {
            ans.push(parseInt(d));
        }
        return ans;
    }
    generateCodeNumbers() {
        var nodalDofs = new Map();
        for (let [key, node] of this.domain.nodes) {
            this.nodeCodeNumbers.set(key, {});
            nodalDofs.set(key, new Set());
        }
        for (let [ie, elem] of this.domain.elements) {
            for (let en of elem.nodes) {
                var dofs = elem.getNodeDofs(en);
                for (let d of dofs) {
                    if (nodalDofs.has(en)) {
                        nodalDofs.get(en).add(d);
                    }
                    else {
                        console.log(en, en in nodalDofs, nodalDofs.get(en));
                        throw new RangeError("Node label " + en + " does not exists");
                    }
                }
            }
        }
        this.neq = 0;
        this.pneq = 0;
        for (let [num, node] of this.domain.nodes) {
            for (let d of nodalDofs.get(num)) {
                if (node.bcs.has(d)) {
                    this.pneq++;
                }
                else {
                    this.neq++;
                }
            }
        }
        var eq = 0;
        var peq = this.neq;
        for (let [num, node] of this.domain.nodes) {
            for (let d of nodalDofs.get(num)) {
                if (node.bcs.has(d)) {
                    this.nodeCodeNumbers.get(num)[d] = peq++;
                }
                else {
                    this.nodeCodeNumbers.get(num)[d] = eq++;
                }
            }
        }
        this.codeNumberGenerated = true;
    }
    assembleVecLC(f, fe, loc, lc) {
        for (let i = 0; i < loc.length; i++) {
            f.set([loc[i], lc], f.get([loc[i], lc]) + fe[i]);
        }
    }
    assembleVec(f, fe, loc) {
        for (let i = 0; i < loc.length; i++) {
            f.set([loc[i]], f.get([loc[i]]) + fe[i]);
        }
    }
}
exports.Solver = Solver;
//# sourceMappingURL=Solver.js.map