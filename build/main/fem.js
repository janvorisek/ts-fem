"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadCase = exports.Domain = exports.PrescribedDisplacement = exports.BeamElementUniformEdgeLoad = exports.BeamElementLoad = exports.NodalLoad = exports.Load = exports.Beam2D = exports.Element = exports.Node = exports.CrossSection = exports.Material = exports.DofID = void 0;
const mathjs_1 = require("mathjs");
const config = {};
const math = mathjs_1.create(mathjs_1.all, config);
var DofID;
(function (DofID) {
    DofID[DofID["Dx"] = 0] = "Dx";
    DofID[DofID["Dy"] = 1] = "Dy";
    DofID[DofID["Dz"] = 2] = "Dz";
    DofID[DofID["Rx"] = 3] = "Rx";
    DofID[DofID["Ry"] = 4] = "Ry";
    DofID[DofID["Rz"] = 5] = "Rz";
})(DofID = exports.DofID || (exports.DofID = {}));
;
const MaterialParametersDefaults = { e: 1.0, g: 1.0, alpha: 1.0, d: 1.0 };
class Material {
    constructor(label, params = {}) {
        this.label = label;
        params = Object.assign(Object.assign({}, MaterialParametersDefaults), params);
        this.e = params.e;
        this.g = params.g;
        this.alpha = params.alpha;
        this.d = params.d;
    }
    change(params) {
        if (params.e !== undefined)
            this.e = params.e;
        if (params.g !== undefined)
            this.g = params.g;
        if (params.alpha !== undefined)
            this.alpha = params.alpha;
        if (params.d !== undefined)
            this.d = params.d;
    }
}
exports.Material = Material;
const CrossSectionParametersDefaults = {};
class CrossSection {
    constructor(label, params = {}) {
        this.label = label;
        params = Object.assign(Object.assign({}, CrossSectionParametersDefaults), params);
        this.a = params.a;
        this.iy = params.iy;
        this.iz = params.iz;
        this.dyz = params.dyz;
        this.h = params.h;
        this.k = params.k;
        this.j = params.j;
    }
    change(params) {
        if (params.a != undefined)
            this.a = params.a;
        if (params.iy != undefined)
            this.iy = params.iy;
        if (params.iz != undefined)
            this.iz = params.iz;
        if (params.dyz != undefined)
            this.dyz = params.dyz;
        if (params.h != undefined)
            this.h = params.h;
        if (params.k != undefined)
            this.k = params.k;
        if (params.j != undefined)
            this.j = params.j;
    }
}
exports.CrossSection = CrossSection;
class Node {
    constructor(label, domain, coords = [0, 0, 0], bcs = []) {
        this.label = label;
        this.domain = domain;
        this.coords = coords;
        this.bcs = new Set(bcs);
        this.lcs = undefined;
    }
    change(label, coords, bcs = []) {
        if (label != undefined)
            this.label = label;
        if (coords != undefined)
            this.coords = coords;
        if (bcs != undefined)
            this.bcs = new Set(bcs);
    }
    change2(params) {
        if (params.label != undefined) {
            this.label = params.label;
        }
        if (params.coords != undefined) {
            this.coords = params.coords;
        }
        if (params.bcs != undefined) {
            this.bcs = new Set(params.bcs);
        }
        if (params.lcs != undefined) {
            this.updateLcs(params.lcs);
        }
    }
    getLocationArray(dofs) {
        return this.domain.solver.getNodeLocationArray(this.label, dofs);
    }
    getUnknowns(lc, dofs) {
        let cn = this.getLocationArray(dofs);
        return math.subset(lc.r, math.index(cn));
    }
    getEigenValueUnknowns(lc, dofs, ev) {
        let cn = this.getLocationArray(dofs);
        return math.subset(lc.eigenVectors[ev], math.index(cn));
    }
    getTransformationMtrx(dofs) {
        let size = dofs.length;
        if (this.lcs == undefined) {
            return math.identity(size);
        }
        else {
            let ans = math.zeros([size, size]);
            for (let i = 0; i < size; i++) {
                let id = dofs[i];
                switch (id) {
                    case DofID.Dx:
                    case DofID.Dy:
                    case DofID.Dz:
                        for (let j = 0; j < size; j++) {
                            let id2 = dofs[j];
                            if ((id2 == DofID.Dx) || (id2 == DofID.Dy) || (id2 == DofID.Dz)) {
                                ans[i][j] = this.lcs[id2][id];
                            }
                        }
                        break;
                    case DofID.Rx:
                    case DofID.Ry:
                    case DofID.Rz:
                        for (let j = 0; j < size; j++) {
                            let id2 = dofs[j];
                            if ((id2 == DofID.Rx) || (id2 == DofID.Ry) || (id2 == DofID.Rz)) {
                                ans[i][j] = this.lcs[id2 - DofID.Rx][id - DofID.Rx];
                            }
                        }
                        break;
                    default:
                        throw new TypeError("Unknown DofID: " + id);
                }
            }
            return math.matrix(ans);
        }
    }
    updateLcs(lcs) {
        if (lcs == undefined) {
            this.lcs = undefined;
        }
        else {
            this.lcs = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            let e1norm = math.norm(lcs.locx);
            let e2norm = math.norm(lcs.locy);
            for (let j = 0; j < 3; j++) {
                this.lcs[0][j] = lcs.locx[j] / e1norm;
                this.lcs[1][j] = lcs.locy[j] / e2norm;
            }
            this.lcs[2][0] = this.lcs[0][1] * this.lcs[1][2] - this.lcs[0][2] * this.lcs[1][1];
            this.lcs[2][1] = this.lcs[0][2] * this.lcs[1][0] - this.lcs[0][0] * this.lcs[1][2];
            this.lcs[2][2] = this.lcs[0][0] * this.lcs[1][1] - this.lcs[0][1] * this.lcs[1][0];
        }
    }
    hasLcs() {
        return (this.lcs != undefined);
    }
    getReactions(lc, inGlobalCS = false) {
        if (inGlobalCS && this.hasLcs()) {
            let sdofs = this.domain.solver.getNodeDofIDs(this.label);
            let cn = this.getLocationArray(sdofs);
            let R = [];
            for (let i = 0; i < sdofs.length; i++) {
                if (this.bcs.has(sdofs[i])) {
                    R.push(math.subset(lc.R, math.index([cn[i] - this.domain.solver.neq])));
                }
                else {
                    R.push(0.0);
                }
            }
            let t = this.getTransformationMtrx(sdofs);
            return { dofs: sdofs, values: math.multiply(t, R).toArray() };
        }
        else {
            if (this.bcs.size > 0) {
                let sdofs = Array.from(this.bcs);
                let cn = this.getLocationArray(sdofs);
                let ccn = math.subtract(cn, this.domain.solver.neq);
                let R = math.subset(lc.R, math.index(ccn));
                if (math.typeOf(R) === 'number') {
                    return { dofs: sdofs, values: [R] };
                }
                else {
                    return { dofs: sdofs, values: R };
                }
            }
            else {
                return { dofs: [], values: [] };
            }
        }
    }
}
exports.Node = Node;
class Element {
    constructor(label, domain, nodes, mat, cs) {
        this.label = label;
        this.nodes = nodes;
        this.mat = mat;
        this.cs = cs;
        this.domain = domain;
    }
    change(label, nodes, mat, cs) {
        if (label != undefined)
            this.label = label;
        if (nodes != undefined)
            this.nodes = nodes;
        if (mat != undefined)
            this.mat = mat;
        if (cs != undefined)
            this.cs = cs;
    }
    change2(params) {
        if (params.label != undefined) {
            this.label = params.label;
        }
        if (params.nodes != undefined) {
            this.nodes = params.nodes;
        }
        if (params.mat != undefined) {
            this.mat = params.mat;
        }
        if (params.cs != undefined) {
            this.cs = params.cs;
        }
    }
    getMaterial() {
        return this.domain.getMaterial(this.mat);
    }
    getCS() {
        return this.domain.getCS(this.cs);
    }
    getNodeDofs(node) { return []; }
    computeStiffness() { }
    computeMassMatrix() { }
    getLocationArray() { }
    computeGeo() { }
    computeT() { return math.matrix(); }
}
exports.Element = Element;
class Beam2D extends Element {
    constructor(label, domain, nodes, mat, cs, hinges = [false, false]) {
        super(label, domain, nodes, mat, cs);
        this.hinges = hinges;
    }
    change2(params) {
        if (params.label != undefined) {
            this.label = params.label;
        }
        if (params.nodes != undefined) {
            this.nodes = params.nodes;
        }
        if (params.mat != undefined) {
            this.mat = params.mat;
        }
        if (params.cs != undefined) {
            this.cs = params.cs;
        }
        if (params.hinges != undefined) {
            this.hinges = params.hinges;
        }
    }
    getNodeDofs(node) {
        return [DofID.Dx, DofID.Dz, DofID.Ry];
    }
    getLocationArray() {
        var loc = Array();
        for (let n of this.nodes) {
            loc = loc.concat(this.domain.solver.getNodeLocationArray(n, [DofID.Dx, DofID.Dz, DofID.Ry]));
        }
        return loc;
    }
    computeGeo() {
        var c1 = this.domain.getNode(this.nodes[0]).coords;
        var c2 = this.domain.getNode(this.nodes[1]).coords;
        var dx = c2[0] - c1[0];
        var dz = c2[2] - c1[2];
        var l = Math.sqrt(dx * dx + dz * dz);
        return { l: l, dx: dx, dz: dz };
    }
    hasHinges() { return this.hinges[0] || this.hinges[1]; }
    computeT() {
        var geo = this.computeGeo();
        var c = geo.dx / geo.l;
        var s = geo.dz / geo.l;
        var t = math.matrix([[c, s, 0., 0., 0., 0.],
            [-s, c, 0., 0., 0., 0.],
            [0., 0., 1., 0., 0., 0.],
            [0., 0., 0., c, s, 0.],
            [0., 0., 0., -s, c, 0.],
            [0., 0., 0., 0., 0., 1.]]);
        if (this.domain.getNode(this.nodes[0]).hasLcs() || this.domain.getNode(this.nodes[1]).hasLcs()) {
            let T_n2g = math.zeros(6);
            T_n2g = math.subset(T_n2g, math.index([0, 1, 2], [0, 1, 2]), this.domain.getNode(this.nodes[0]).getTransformationMtrx(this.getNodeDofs(this.nodes[0])));
            T_n2g = math.subset(T_n2g, math.index([3, 4, 5], [3, 4, 5]), this.domain.getNode(this.nodes[1]).getTransformationMtrx(this.getNodeDofs(this.nodes[1])));
            t = math.multiply(t, T_n2g);
        }
        return t;
    }
    computeLocalStiffnessMtrx(retCondenseSubMats = false) {
        var geo = this.computeGeo();
        var mat = this.getMaterial();
        var cs = this.getCS();
        var ea = mat.e * cs.a;
        var eiy = mat.e * cs.iy;
        var l = geo.l;
        var l2 = l * l;
        var l3 = l2 * l;
        var fi = 12. * eiy / (cs.k * mat.g * cs.a * l * l);
        var fi1 = 1. + fi;
        var answer = math.matrix([[ea / l, 0., 0., -ea / l, 0., 0.],
            [0., 12. * eiy / l3 / fi1, -6. * eiy / l2 / fi1, 0., -12. * eiy / l3 / fi1, -6. * eiy / l2 / fi1],
            [0., -6. * eiy / l2 / fi1, (4. + fi) * eiy / l / fi1, 0., 6. * eiy / l2 / fi1, (2. - fi) * eiy / l / fi1],
            [-ea / l, 0., 0., ea / l, 0., 0.],
            [0., -12. * eiy / l3 / fi1, 6. * eiy / l2 / fi1, 0., 12. * eiy / l3 / fi1, 6. * eiy / l2 / fi1],
            [0., -6. * eiy / l2 / fi1, (2. - fi) * eiy / l / fi1, 0., 6. * eiy / l2 / fi1, (4. + fi) * eiy / l / fi1]]);
        if (this.hasHinges()) {
            if (this.hinges[0] && this.hinges[1]) {
                var a = [0, 1, 3, 4];
                var b = [2, 5];
            }
            else if (this.hinges[0]) {
                var a = [0, 1, 3, 4, 5];
                var b = [2];
            }
            else if (this.hinges[1]) {
                var a = [0, 1, 2, 3, 4];
                var b = [5];
            }
            var kaa = answer.subset(math.index(a, a));
            var kab = answer.subset(math.index(a, b));
            var kbb = answer.subset(math.index(b, b));
            var k2 = math.subtract(kaa, math.multiply(math.multiply(kab, math.inv(kbb)), math.transpose(kab)));
            let answer2 = math.zeros(6, 6);
            answer2 = math.subset(answer2, math.index(a, a), k2);
            if (retCondenseSubMats) {
                return {
                    answer: answer2,
                    a: a,
                    b: b,
                    kaa: kaa,
                    kab: kab,
                    kbb: kbb
                };
            }
            else {
                return { answer: answer2 };
            }
        }
        return { answer: answer };
    }
    computeLocalInitialStressMtrx(N) {
        var geo = this.computeGeo();
        var mat = this.getMaterial();
        var cs = this.getCS();
        var l = geo.l;
        var l2 = l * l;
        var c = N / l;
        var fi = 12. * mat.e * cs.iy / (cs.k * mat.g * cs.a * l * l);
        var fi2 = fi * fi;
        var answer = math.matrix([[0., 0., 0., 0., 0., 0.],
            [0., 6. / 5. + 2 * fi + fi2, -l / 10., 0., -6. / 5 - 2 * fi - fi2, -l / 10.],
            [0., -l / 10., 2. * l2 / 15. + l2 * fi / 6. + l2 * fi2 / 12., 0., l / 10., -l2 / 30. - l2 * fi / 6. - l2 * fi2 / 12.],
            [0., 0., 0., 0., 0., 0.],
            [0., -6. / 5. - 2 * fi - fi2, l / 10., 0., 6. / 5. + 2 * fi + fi2, l / 10.],
            [0., -l / 10., -l2 / 30. - l2 * fi / 6. - l2 * fi2 / 12., 0., l / 10., 2 * l2 / 15. + l2 * fi / 6. + l2 * fi2 / 12.]]);
        math.multiply(answer, c / (1. + fi) / (1. + fi));
        var cc = Math.min(Math.abs(answer[1][1]), Math.abs(answer[2][2])) / 1000.0;
        answer[0][0] = cc;
        answer[0][3] = -cc;
        answer[3][0] = -cc;
        answer[3][3] = cc;
        if (this.hasHinges()) {
            var stiffrec = this.computeLocalStiffnessMtrx(true);
            var asize = math.size(stiffrec.a)[0];
            var t = math.zeros(6, asize);
            math.subset(t, math.index(stiffrec.a, math.range(0, asize)), math.identity(asize));
            math.subset(t, math.index(stiffrec.b, math.range(0, asize)), math.multiply(math.multiply(math.inv(stiffrec.kbb), math.transpose(stiffrec.kab)), -1.0));
            var k2 = math.multiply(math.transpose(t), math.multiply(answer, t));
            var answer2 = math.zeros(6, 6);
            math.subset(stiffrec.a, math.index(stiffrec.a, stiffrec.a), k2);
            return answer2;
        }
        return answer;
    }
    computeLocalMassMatrix(retCondenseSubMats = false) {
        var geo = this.computeGeo();
        var mat = this.getMaterial();
        var cs = this.getCS();
        var l = geo.l;
        var l2 = l * l;
        var l3 = l2 * l;
        return math.multiply(mat.d * cs.a * l / 420, math.matrix([
            [140, 0, 0, 70, 0, 0],
            [0, 156, -22 * l, 0, 54, 13 * l],
            [0, -22 * l, 4 * l * l, 0, -13 * l, -3 * l * l],
            [70, 0, 0, 140, 0, 0],
            [0, 54, -13 * l, 0, 156, 22 * l],
            [0, 13 * l, -3 * l * l, 0, 22 * l, 4 * l * l]
        ]));
    }
    computeStiffness() {
        var geo = this.computeGeo();
        var kl = this.computeLocalStiffnessMtrx();
        var t = this.computeT();
        var k = math.multiply(math.multiply(math.transpose(t), kl.answer), t);
        return k;
    }
    computeMassMatrix() {
        var geo = this.computeGeo();
        var ml = this.computeLocalMassMatrix();
        var t = this.computeT();
        var m = math.multiply(math.multiply(math.transpose(t), ml), t);
        return m;
    }
    computeInitialStressMatrix(N) {
        var kl = this.computeLocalInitialStressMtrx(N);
        var t = this.computeT();
        var k = math.multiply(math.multiply(math.transpose(t), kl), t);
        return k;
    }
    computeEndDisplacement(lc) {
        var t = this.computeT();
        var loc = this.getLocationArray();
        var rloc = math.multiply(t, math.subset(lc.r, math.index(loc)));
        if (this.hasHinges()) {
            var stiffrec = this.computeLocalStiffnessMtrx(true);
            let bl = math.zeros(6);
            for (let load of lc.getElementLoadsOnElement(this.label)) {
                bl = math.add(bl, load.getLoadVectorForClampedBeam());
            }
            if (this.hasHinges()) {
                rloc = math.subset(rloc, math.index(stiffrec.b), math.multiply(math.inv(stiffrec.kbb), math.multiply(math.add(math.subset(bl, math.index(stiffrec.b)), math.squeeze(math.multiply(math.transpose(stiffrec.kab), math.subset(rloc, math.index(stiffrec.a))))), -1.0)));
            }
        }
        return rloc;
    }
    computeEndForces(lc) {
        var t = this.computeT();
        var loc = this.getLocationArray();
        var re = math.multiply(t, math.subset(lc.r, math.index(loc)));
        var stiffrec = this.computeLocalStiffnessMtrx(true);
        var fe = math.multiply(stiffrec.answer, re);
        var bl = math.zeros(6);
        for (let load of lc.getElementLoadsOnElement(this.label)) {
            bl = math.add(bl, load.getLoadVectorForClampedBeam());
        }
        if (this.hasHinges()) {
            let h1 = math.multiply(stiffrec.kab, math.inv(stiffrec.kbb));
            if (stiffrec.b.length == 1) {
                let blv = bl.get(stiffrec.b);
                for (let i = 0; i < stiffrec.a.length; i++) {
                    fe.set([stiffrec.a[i]], fe.get([stiffrec.a[i]]) + bl.get([stiffrec.a[i]]) - h1.get([i, 0]) * blv);
                }
            }
            else {
                var help = math.subtract(math.subset(bl, math.index(stiffrec.a)), math.multiply(h1, math.matrix(math.subset(bl, math.index(stiffrec.b)))));
                fe = math.subset(fe, math.index(stiffrec.a), math.subtract(math.subset(fe, math.index(stiffrec.a)), help));
            }
        }
        else {
            fe = math.add(fe, bl);
        }
        return fe;
    }
    computeLocalDefl(lc, nseg) {
        let rl = this.computeEndDisplacement(lc);
        let u = [];
        let w = [];
        let geo = this.computeGeo();
        let l = geo.l;
        let eloads = lc.getElementLoadsOnElement(this.label);
        for (let iseg = 0; iseg <= nseg; iseg++) {
            let xl = iseg / nseg;
            let wl = (1.0 - 3.0 * xl * xl + 2.0 * xl * xl * xl) * rl.get([1]) + l * (-xl + 2.0 * xl * xl - xl * xl * xl) * rl.get([2]) + (3.0 * xl * xl - 2.0 * xl * xl * xl) * rl.get([4]) + l * (xl * xl - xl * xl * xl) * rl.get([5]);
            let ul = (1. - xl) * rl.get([0]) + xl * rl.get([3]);
            for (let load of eloads) {
                let c = load.computeBeamDeflectionContrib(xl);
                wl += c.w;
                ul += c.u;
            }
            u.push(ul);
            w.push(wl);
        }
        return { u: u, w: w };
    }
    computeGlobalDefl(lc, nseg) {
        let ld = this.computeLocalDefl(lc, nseg);
        let geo = this.computeGeo();
        var c = geo.dx / geo.l;
        var s = geo.dz / geo.l;
        let ug = [];
        let wg = [];
        for (let i = 0; i <= nseg; i++) {
            ug.push(ld.u[i] * c - ld.w[i] * s);
            wg.push(ld.w[i] * c + ld.u[i] * s);
        }
        return { u: ug, w: wg };
    }
    computeEndDisplacementEigenMode(lc, ntheig) {
        var t = this.computeT();
        var loc = this.getLocationArray();
        var rloc = math.multiply(t, math.subset(lc.eigenVectors[ntheig], math.index(loc)));
        if (this.hasHinges()) {
            var stiffrec = this.computeLocalStiffnessMtrx(true);
            let bl = math.zeros(6);
            if (this.hasHinges()) {
                rloc = math.subset(rloc, math.index(stiffrec.b), math.multiply(math.inv(stiffrec.kbb), math.multiply(math.add(math.subset(bl, math.index(stiffrec.b)), math.squeeze(math.multiply(math.transpose(stiffrec.kab), math.subset(rloc, math.index(stiffrec.a))))), -1.0)));
            }
        }
        return rloc;
    }
    computeLocalEigenMode(lc, ntheig, nseg) {
        let rl = this.computeEndDisplacementEigenMode(lc, ntheig);
        let u = [];
        let w = [];
        let geo = this.computeGeo();
        let l = geo.l;
        for (let iseg = 0; iseg <= nseg; iseg++) {
            let xl = iseg / nseg;
            let wl = (1.0 - 3.0 * xl * xl + 2.0 * xl * xl * xl) * rl.get([1]) + l * (-xl + 2.0 * xl * xl - xl * xl * xl) * rl.get([2]) + (3.0 * xl * xl - 2.0 * xl * xl * xl) * rl.get([4]) + l * (xl * xl - xl * xl * xl) * rl.get([5]);
            let ul = (1. - xl) * rl.get([0]) + xl * rl.get([3]);
            u.push(ul);
            w.push(wl);
        }
        return { u: u, w: w };
    }
    computeGlobalEigenMode(lc, ntheig, nseg) {
        let ld = this.computeLocalEigenMode(lc, ntheig, nseg);
        let geo = this.computeGeo();
        var c = geo.dx / geo.l;
        var s = geo.dz / geo.l;
        let ug = [];
        let wg = [];
        for (let i = 0; i <= nseg; i++) {
            ug.push(ld.u[i] * c - ld.w[i] * s);
            wg.push(ld.w[i] * c + ld.u[i] * s);
        }
        return { u: ug, w: wg };
    }
    computeNormalForce(lc, nseg) {
        let F = this.computeEndForces(lc);
        let geo = this.computeGeo();
        let x = [];
        let N = [];
        let eloads = lc.getElementLoadsOnElement(this.label);
        for (let iseg = 0; iseg <= nseg; iseg++) {
            let xi = geo.l * iseg / nseg;
            let Ni = -F.get([0]);
            for (let load of eloads) {
                Ni += load.computeBeamNContrib(xi);
            }
            x.push(xi);
            N.push(Ni);
        }
        return { x: x, N: N };
    }
    computeShearForce(lc, nseg) {
        let F = this.computeEndForces(lc);
        let geo = this.computeGeo();
        let x = [];
        let V = [];
        let eloads = lc.getElementLoadsOnElement(this.label);
        for (let iseg = 0; iseg <= nseg; iseg++) {
            let xi = geo.l * iseg / nseg;
            let Vi = -F.get([1]);
            for (let load of eloads) {
                Vi += load.computeBeamVContrib(xi);
            }
            x.push(xi);
            V.push(Vi);
        }
        return { x: x, V: V };
    }
    computeBendingMoment(lc, nseg) {
        let F = this.computeEndForces(lc);
        let geo = this.computeGeo();
        let x = [];
        let M = [];
        let eloads = lc.getElementLoadsOnElement(this.label);
        for (let iseg = 0; iseg <= nseg; iseg++) {
            let xi = geo.l * iseg / nseg;
            let Mi = -F.get([2]) - F.get([1]) * xi;
            for (let load of eloads) {
                Mi += load.computeBeamMContrib(xi);
            }
            x.push(xi);
            M.push(Mi);
        }
        return { x: x, M: M };
    }
}
exports.Beam2D = Beam2D;
class Load {
    constructor(target, domain) {
        this.target = target;
        this.domain = domain;
    }
    getLoadVector() {
        return [];
    }
    getLocationArray() { return []; }
}
exports.Load = Load;
class NodalLoad extends Load {
    constructor(node, domain, values = {}) {
        super(node, domain);
        this.values = values;
    }
    change(node, values) {
        this.target = node;
        this.values = values;
    }
    getLoadVector() {
        var dofs = this.domain.solver.getNodeDofIDs(this.target);
        var ans = Array();
        for (let idof of dofs) {
            if (idof in this.values) {
                ans.push(this.values[idof]);
            }
            else {
                ans.push(0.0);
            }
        }
        return ans;
    }
    getLocationArray() {
        return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
    }
}
exports.NodalLoad = NodalLoad;
class BeamElementLoad extends Load {
    getLoadVectorForClampedBeam() { return []; }
    computeBeamDeflectionContrib(xl) { return { u: 0, w: 0 }; }
    ;
    computeBeamNContrib(x) { return 0; }
    ;
    computeBeamVContrib(x) { return 0; }
    ;
    computeBeamMContrib(x) { return 0; }
    ;
}
exports.BeamElementLoad = BeamElementLoad;
class BeamElementUniformEdgeLoad extends BeamElementLoad {
    constructor(elem, domain, values, lcs) {
        super(elem, domain);
        this.values = values;
        this.lcs = lcs;
    }
    change(elem, values, lcs) {
        this.target = elem;
        this.values = values;
        this.lcs = lcs;
    }
    getGlobalIntensities() {
        let fx = this.values[0];
        let fz = this.values[1];
        if (this.lcs) {
            let geo = this.domain.elements.get(this.target).computeGeo();
            let cos = geo.dx / geo.l;
            let sin = geo.dz / geo.l;
            return { fx: fx * cos - fz * sin, fz: fx * sin + fz * cos, my: 0.0 };
        }
        else {
            return { fx: fx, fz: fz, my: 0.0 };
        }
    }
    getLocalIntensities() {
        let fx = this.values[0];
        let fz = this.values[1];
        let geo = this.domain.elements.get(this.target).computeGeo();
        let l = geo.l;
        let dx = geo.dx;
        let dz = geo.dz;
        let cos = dx / l;
        let sin = dz / l;
        if (!this.lcs) {
            return {
                fx: fx * cos + fz * sin,
                fz: -fx * sin + fz * cos
            };
        }
        else {
            return { fx: fx, fz: fz };
        }
    }
    getLoadVectorForClampedBeam() {
        let geo = this.domain.elements.get(this.target).computeGeo();
        let f = this.getLocalIntensities();
        let fx = f.fx;
        let fz = f.fz;
        let l = geo.l;
        return [-0.5 * l * fx, -0.5 * l * fz, +1 / 12. * fz * l * l, -0.5 * l * fx, -0.5 * l * fz, -1 / 12. * fz * l * l];
    }
    getLocationArray() {
        return this.domain.elements.get(this.target).getLocationArray();
    }
    getLoadVector() {
        let elem = this.domain.elements.get(this.target);
        let t = elem.computeT();
        let f = this.getLoadVectorForClampedBeam();
        if (elem.hasHinges()) {
            let stiffrec = elem.computeLocalStiffnessMtrx(true);
            let ans = [0, 0, 0, 0, 0, 0];
            let h1 = math.multiply(stiffrec.kab, math.inv(stiffrec.kbb));
            if (stiffrec.b.length == 1) {
                let flv = f[stiffrec.b[0]];
                for (let i = 0; i < stiffrec.a.length; i++) {
                    ans[stiffrec.a[i]] = f[stiffrec.a[i]] - h1.get([i, 0]) * flv;
                }
                return math.multiply(math.multiply(math.transpose(t), ans), -1.0).toArray();
            }
            else {
                let help = math.subtract(math.subset(f, math.index(stiffrec.a)), math.multiply(h1, math.subset(f, math.index(stiffrec.b))));
                ans = math.subset(ans, math.index(stiffrec.a), help);
                return math.multiply(math.multiply(math.transpose(t), ans), -1.0).toArray();
            }
        }
        else {
            return math.multiply(math.multiply(math.transpose(t), f), -1.0).toArray();
        }
    }
    computeBeamDeflectionContrib(xl) {
        let f = this.getLocalIntensities();
        let elem = this.domain.elements.get(this.target);
        let geo = elem.computeGeo();
        let l = geo.l;
        let w = f.fz * l * l * l * l * (xl * xl * xl * xl / 24. - xl * xl * xl / 12. + xl * xl / 24.) / (elem.getMaterial().e * elem.getCS().iy);
        let u = 0.0;
        return { u: u, w: w };
    }
    computeBeamNContrib(x) {
        let f = this.getLocalIntensities();
        return -f.fx * x;
    }
    computeBeamVContrib(x) {
        let f = this.getLocalIntensities();
        return -f.fz * x;
    }
    computeBeamMContrib(x) {
        let f = this.getLocalIntensities();
        return -f.fz * x * x / 2.0;
    }
}
exports.BeamElementUniformEdgeLoad = BeamElementUniformEdgeLoad;
class PrescribedDisplacement {
    constructor(target, domain, values) {
        this.target = target;
        this.prescribedValues = values;
        this.domain = domain;
    }
    getNodePrescribedDisplacementVector() {
        let answer = new Array();
        let dofs = this.domain.solver.getNodeDofIDs(this.target);
        for (let dof of dofs) {
            if (dof in this.prescribedValues) {
                answer.push(this.prescribedValues[dof]);
            }
            else {
                answer.push(0.0);
            }
        }
        return answer;
    }
    getLocationArray() {
        return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
    }
}
exports.PrescribedDisplacement = PrescribedDisplacement;
class Domain {
    constructor(solver) {
        this.nodes = new Map();
        this.elements = new Map();
        this.materials = new Map();
        this.crossSections = new Map();
        this.solver = solver;
    }
    getNode(id) {
        if (this.nodes.has(id)) {
            return this.nodes.get(id);
        }
        else {
            throw new RangeError("Node label " + id + " does not exists");
        }
    }
    getElement(id) {
        if (this.elements.has(id)) {
            return this.elements.get(id);
        }
        else {
            throw new RangeError("Element label " + id + " does not exists");
        }
    }
    getMaterial(id) {
        if (this.materials.has(id)) {
            return this.materials.get(id);
        }
        else {
            throw new RangeError("Material label " + id + " does not exists");
        }
    }
    getCS(id) {
        if (this.crossSections.has(id)) {
            return this.crossSections.get(id);
        }
        else {
            throw new RangeError("CrossSection label " + id + " does not exists");
        }
    }
    createNode(label, coords = [0, 0, 0], bcs = []) {
        let ans = new Node(label, this, coords, bcs);
        this.nodes.set(label, ans);
        return ans;
    }
    createBeam2D(label, nodes, mat, cs, hinges = [false, false]) {
        let ans = new Beam2D(label, this, nodes, mat, cs, hinges);
        this.elements.set(label, ans);
        return ans;
    }
    createMaterial(label, params = {}) {
        let ans = new Material(label, params);
        this.materials.set(label, ans);
        return ans;
    }
    createCrossSection(label, params = {}) {
        let ans = new CrossSection(label, params);
        this.crossSections.set(label, ans);
        return ans;
    }
}
exports.Domain = Domain;
class LoadCase {
    constructor(label, domain) {
        this.bcMap = {};
        this.nodalLoadList = new Array();
        this.elementLoadList = new Array();
        this.prescribedBC = new Array();
        this.eigenNumbers = [];
        this.eigenVectors = [];
        this.label = label;
        this.domain = domain;
    }
    getElementLoadsOnElement(e) {
        let ans = [];
        for (let l of this.elementLoadList) {
            if (l.target == e) {
                ans.push(l);
            }
        }
        return ans;
    }
    createNodalLoad(node, values = {}) {
        let ans = new NodalLoad(node, this.domain, values);
        this.nodalLoadList.push(ans);
        return ans;
    }
    createBeamElementUniformEdgeLoad(elem, values, lcs) {
        let ans = new BeamElementUniformEdgeLoad(elem, this.domain, values, lcs);
        this.elementLoadList.push(ans);
        return ans;
    }
    createPrescribedDisplacement(target, values) {
        let ans = new PrescribedDisplacement(target, this.domain, values);
        this.prescribedBC.push(ans);
        return ans;
    }
}
exports.LoadCase = LoadCase;
__exportStar(require("./Solver"), exports);
__exportStar(require("./EigenValueDynamicSolver"), exports);
__exportStar(require("./LinearStaticSolver"), exports);
//# sourceMappingURL=fem.js.map