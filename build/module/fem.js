import { create, all } from 'mathjs';
const config = {};
const math = create(all, config);
export var DofID;
(function (DofID) {
    DofID[DofID["Dx"] = 0] = "Dx";
    DofID[DofID["Dy"] = 1] = "Dy";
    DofID[DofID["Dz"] = 2] = "Dz";
    DofID[DofID["Rx"] = 3] = "Rx";
    DofID[DofID["Ry"] = 4] = "Ry";
    DofID[DofID["Rz"] = 5] = "Rz";
})(DofID || (DofID = {}));
;
const MaterialParametersDefaults = { e: 1.0, g: 1.0, alpha: 1.0, d: 1.0 };
export class Material {
    constructor(label, params = {}) {
        this.label = label;
        params = { ...MaterialParametersDefaults, ...params };
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
const CrossSectionParametersDefaults = {};
export class CrossSection {
    constructor(label, params = {}) {
        this.label = label;
        params = { ...CrossSectionParametersDefaults, ...params };
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
export class Node {
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
        console.log("type R:", typeof lc.R);
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
export class Element {
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
export class Beam2D extends Element {
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
export class Load {
    constructor(target, domain) {
        this.target = target;
        this.domain = domain;
    }
    getLoadVector() {
        return [];
    }
    getLocationArray() { return []; }
}
export class NodalLoad extends Load {
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
export class BeamElementLoad extends Load {
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
export class BeamElementUniformEdgeLoad extends BeamElementLoad {
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
export class PrescribedDisplacement {
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
export class Domain {
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
export class LoadCase {
    constructor(label, domain) {
        this.bcMap = {};
        this.nodalLoadList = new Array();
        this.elementLoadList = new Array();
        this.prescribedBC = new Array();
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
export class Solver {
    constructor() {
        this.loadCases = new Array();
        this.codeNumberGenerated = false;
        this.nodeCodeNumbers = new Map();
        this.domain = new Domain(this);
        this.loadCases.push(new LoadCase("DefaultLC", this.domain));
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
                let rp = math.subset(this.loadCases[lc].r, math.index(prescribed));
                let fp = math.multiply(math.subset(this.k, math.index(unknowns, prescribed)), rp);
                let b = math.subtract(math.squeeze(math.subset(this.f, math.index(unknowns, [lc]))), fp);
                let ru = math.squeeze(math.lusolve(math.subset(this.k, math.index(unknowns, unknowns)), b));
                this.loadCases[lc].r = math.subset(this.loadCases[lc].r, math.index(math.range(0, this.neq)), ru);
                this.loadCases[lc].R = math.multiply(math.subset(this.k, math.index(prescribed, unknowns)), ru).toArray();
                this.loadCases[lc].R = math.subtract(this.loadCases[lc].R, math.squeeze(math.subset(this.f, math.index(prescribed, [lc]))));
            }
        }
        const endtime = new Date();
        let timediff = (endtime.getTime() - startime.getTime()) / 1000;
        console.log("Solution took ", Math.round(timediff * 100) / 100, " [sec]");
    }
    assembleDyn() {
        this.k = math.zeros(this.neq + this.pneq, this.neq + this.pneq);
        this.m = math.zeros(this.neq + this.pneq, this.neq + this.pneq);
        this.loadCases[0].r = math.zeros(this.neq + this.pneq);
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
    solveDyn() {
        const startime = new Date();
        if (!this.codeNumberGenerated) {
            this.generateCodeNumbers();
        }
        let unknowns = math.range(0, this.neq);
        this.assembleDyn();
        const kk = math.subset((this.k), math.index(unknowns, unknowns));
        const mm = math.subset((this.m), math.index(unknowns, unknowns));
        const mkinv = math.multiply(math.inv(kk), mm);
        let omegas = [];
        let vectors = [];
        for (let i = 0; i < this.neq; i++) {
            let tol = 1e-6;
            let rho = 0;
            let newrho = 999;
            let x = math.ones(this.neq, 1);
            while (Math.abs(newrho - rho) / newrho > tol) {
                rho = newrho;
                const newx = math.multiply(mkinv, x);
                const divisor = math.multiply(math.multiply(math.transpose(newx), mm), newx).get([0, 0]);
                newrho = math.multiply(math.multiply(math.transpose(newx), mm), x).get([0, 0]) / divisor;
                x = math.divide(newx, Math.sqrt(divisor));
                let dx = math.zeros(this.neq, 1);
                for (let j = 0; j < omegas.length; j++) {
                    const c = math.multiply(math.multiply(math.transpose(vectors[j]), mm), x).get([0, 0]);
                    dx = math.add(dx, math.multiply(c, vectors[j]));
                }
                x = math.subtract(x, dx);
            }
            console.log(`omega=${Math.sqrt(newrho)}, f=${Math.sqrt(newrho) / (2 * Math.PI)}`);
            omegas.push(Math.sqrt(newrho));
            vectors.push(x);
            if (i == 0)
                this.loadCases[0].r = math.subset(this.loadCases[0].r, math.index(math.range(0, this.neq), 1), x);
        }
        console.log(this.loadCases[0].r);
        const endtime = new Date();
        let timediff = (endtime.getTime() - startime.getTime()) / 1000;
        console.log("Solution took ", Math.round(timediff * 100) / 100, " [sec]");
    }
}
//# sourceMappingURL=fem.js.map