import * as math from "mathjs";
import { Domain } from "./Domain";
import { LoadCase } from "./LoadCase";
import { DofID, LabelType } from ".";
import { Element } from "./Element";

/**
 * Implementation of Timoshenko beam element in 2D (xz plane)
 */
export class Beam2D extends Element {
  hinges: [boolean, boolean]; // indicates element hinges

  diagonalMassMatrix = false;

  /**
   * Constructor
   * @param label element label (num)
   * @param nodes element nodes
   * @param mat element material (num)
   * @param cs element cross section (num)
   * @param hinges array of two boolean values indicating if hinge is present at start or end
   */
  constructor(
    label: LabelType,
    domain: Domain,
    nodes: Array<LabelType>,
    mat: LabelType,
    cs: LabelType,
    hinges: [boolean, boolean] = [false, false]
  ) {
    super(label, domain, nodes, mat, cs);
    this.hinges = hinges;
  }

  getNodeDofs(node: LabelType): Array<DofID> {
    return [DofID.Dx, DofID.Dz, DofID.Ry];
  }

  getLocationArray() {
    let loc = Array<number>();
    for (const n of this.nodes) {
      //console.log("Element ", this.label, "Node ", n, "loc:", solver.getNodeLocationArray(n, [DofID.Dx, DofID.Dz, DofID.Ry]));
      loc = loc.concat(this.domain.solver.getNodeLocationArray(n, [DofID.Dx, DofID.Dz, DofID.Ry]));
    }
    return loc;
  }
  // evaluates l, dx, dz
  /**
   * Returns Beam2D geometry object containing l: length, dx: element projection in to x axis, dz: element projection in z axis
   */
  computeGeo() {
    const c1: Array<number> = this.domain.getNode(this.nodes[0]).coords;
    const c2: Array<number> = this.domain.getNode(this.nodes[1]).coords;
    const dx: number = c2[0] - c1[0];
    const dz: number = c2[2] - c1[2];
    const l: number = Math.sqrt(dx * dx + dz * dz);
    return { l: l, dx: dx, dz: dz };
  }
  /**
   * Returns tru if element has start or end hinge (or both)
   */
  hasHinges() {
    return this.hinges[0] || this.hinges[1];
  }
  /**
   * Computes element transformation matrix from local to global (nodal) c.s.
   */
  computeT(): math.Matrix {
    const geo = this.computeGeo();
    const c: number = geo.dx / geo.l;
    const s: number = geo.dz / geo.l;
    let t = math.matrix([
      [c, s, 0, 0, 0, 0],
      [-s, c, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, c, s, 0],
      [0, 0, 0, -s, c, 0],
      [0, 0, 0, 0, 0, 1],
    ]); // rl = t*rg;

    if (this.domain.getNode(this.nodes[0]).hasLcs() || this.domain.getNode(this.nodes[1]).hasLcs()) {
      let T_n2g = math.zeros(6); // rg = T_n2g rn
      T_n2g = math.subset(
        T_n2g,
        math.index([0, 1, 2], [0, 1, 2]),
        this.domain.getNode(this.nodes[0]).getTransformationMtrx(this.getNodeDofs(this.nodes[0]))
      );
      T_n2g = math.subset(
        T_n2g,
        math.index([3, 4, 5], [3, 4, 5]),
        this.domain.getNode(this.nodes[1]).getTransformationMtrx(this.getNodeDofs(this.nodes[1]))
      );
      t = math.multiply(t, T_n2g);
    }
    return t;
  }
  /**
   * Computes Beam2D local stifness matrix
   * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
   */
  computeLocalStiffnessMtrx(retCondenseSubMats: boolean = false) {
    const geo = this.computeGeo();
    const mat = this.getMaterial();
    const cs = this.getCS();

    const ea = mat.e * cs.a;
    const eiy = mat.e * cs.iy;
    const l = geo.l;
    const l2 = l * l;
    const l3 = l2 * l;
    const fi = (12 * eiy) / (cs.k * mat.g * cs.a * l * l);
    const fi1 = 1 + fi;
    const answer = math.matrix([
      [ea / l, 0, 0, -ea / l, 0, 0],
      [0, (12 * eiy) / l3 / fi1, (-6 * eiy) / l2 / fi1, 0, (-12 * eiy) / l3 / fi1, (-6 * eiy) / l2 / fi1],
      [0, (-6 * eiy) / l2 / fi1, ((4 + fi) * eiy) / l / fi1, 0, (6 * eiy) / l2 / fi1, ((2 - fi) * eiy) / l / fi1],
      [-ea / l, 0, 0, ea / l, 0, 0],
      [0, (-12 * eiy) / l3 / fi1, (6 * eiy) / l2 / fi1, 0, (12 * eiy) / l3 / fi1, (6 * eiy) / l2 / fi1],
      [0, (-6 * eiy) / l2 / fi1, ((2 - fi) * eiy) / l / fi1, 0, (6 * eiy) / l2 / fi1, ((4 + fi) * eiy) / l / fi1],
    ]);

    // static condensation if some ends are hinges
    // a=nonzero force value, b=zero force(moment) value
    if (this.hasHinges()) {
      if (this.hinges[0] && this.hinges[1]) {
        var a = [0, 1, 3, 4];
        var b = [2, 5];
      } else if (this.hinges[0]) {
        var a = [0, 1, 3, 4, 5];
        var b = [2];
      } else if (this.hinges[1]) {
        var a = [0, 1, 2, 3, 4];
        var b = [5];
      }
      const kaa = answer.subset(math.index(a, a));
      const kab = answer.subset(math.index(a, b));
      const kbb = answer.subset(math.index(b, b));
      const k2 = math.subtract(kaa, math.multiply(math.multiply(kab, math.inv(kbb)), math.transpose(kab)));

      let answer2 = math.zeros(6, 6);
      answer2 = math.subset(answer2, math.index(a, a), k2);

      if (retCondenseSubMats) {
        return {
          answer: answer2,
          a: a,
          b: b,
          kaa: kaa,
          kab: kab,
          kbb: kbb,
        };
      } else {
        return { answer: answer2 };
      }
    }
    return { answer: answer };
  }
  /**
   * Computes local initial stress matrix
   * @param N normal force
   */
  computeLocalInitialStressMtrx(N: number) {
    const geo = this.computeGeo();
    const mat = this.getMaterial();
    const cs = this.getCS();
    const l: number = geo.l;
    const l2: number = l * l;
    const c: number = N / l;

    const fi = (12 * mat.e * cs.iy) / (cs.k * mat.g * cs.a * l * l);
    const fi2 = fi * fi;
    const answer = math.matrix([
      [0, 0, 0, 0, 0, 0],
      [0, 6 / 5 + 2 * fi + fi2, -l / 10, 0, -6 / 5 - 2 * fi - fi2, -l / 10],
      [
        0,
        -l / 10,
        (2 * l2) / 15 + (l2 * fi) / 6 + (l2 * fi2) / 12,
        0,
        l / 10,
        -l2 / 30 - (l2 * fi) / 6 - (l2 * fi2) / 12,
      ],
      [0, 0, 0, 0, 0, 0],
      [0, -6 / 5 - 2 * fi - fi2, l / 10, 0, 6 / 5 + 2 * fi + fi2, l / 10],
      [
        0,
        -l / 10,
        -l2 / 30 - (l2 * fi) / 6 - (l2 * fi2) / 12,
        0,
        l / 10,
        (2 * l2) / 15 + (l2 * fi) / 6 + (l2 * fi2) / 12,
      ],
    ]);
    math.multiply(answer, c / (1 + fi) / (1 + fi));

    const cc = Math.min(Math.abs(answer[1][1]), Math.abs(answer[2][2])) / 1000.0;
    answer[0][0] = cc;
    answer[0][3] = -cc;
    answer[3][0] = -cc;
    answer[3][3] = cc;

    // static condensation if some ends are hinges
    // a=nonzero force value, b=zero force(moment) value
    if (this.hasHinges()) {
      const stiffrec = this.computeLocalStiffnessMtrx(true);
      const asize: number = math.size(stiffrec.a)[0];
      const t = math.zeros(6, asize);

      math.subset(t, math.index(stiffrec.a, math.range(0, asize)), math.identity(asize));
      //print "t:",t``
      //print (-1)*dot(linalg.inv(kbb),kab.transpose())
      //print "ti",t[ix_(b),:]
      math.subset(
        t,
        math.index(stiffrec.b, math.range(0, asize)),
        math.multiply(math.multiply(math.inv(stiffrec.kbb), math.transpose(stiffrec.kab)), -1.0)
      );
      //print "t:",t
      const k2 = math.multiply(math.transpose(t), math.multiply(answer, t));
      const answer2 = math.zeros(6, 6);
      math.subset(stiffrec.a, math.index(stiffrec.a, stiffrec.a), k2);
      return answer2;
      //print answer
    }
    return answer;
  }

  /**
   * Computes Beam2D local stifness matrix
   * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
   */
  computeLocalMassMatrix(retCondenseSubMats: boolean = false) {
    const geo = this.computeGeo();
    const mat = this.getMaterial();
    const cs = this.getCS();

    //var ea = mat.e*cs.a;
    // var eiy = mat.e*cs.iy;
    const l = geo.l;
    const l2 = l * l;
    const l3 = l2 * l;
    //var fi=12.*eiy/(cs.k*mat.g*cs.a*l*l);
    //var fi2= fi*fi;
    /*const M_CT = math.matrix([
            [0, 0, 0, 0, 0, 0],
            [0, 13/35+7/10*fi+1/3*fi2,         (11/210+11/120*fi+1/24*fi2)*l, 0, 9/70+3/10*fi+1/6*fi2,        -(13/420+3/40*fi+1/24*fi2)*l],
            [0, (11/210+11/120*fi+1/24*fi2)*l, (1/105+1/60*fi+1/120*fi2)*l2,  0, (13/420+3/40*fi+1/24*fi2)*l, -(1/140+1/60*fi+1/120*fi2)*l2],
            [0, 0, 0, 0, 0, 0],
            [0, 9/70+3/10*fi+1/6*fi2,          (13/420+3/40*fi+1/24*fi2)*l,   0, 13/35+7/10*fi+1/3*fi2,        (11/210+11/120*fi+1/24*fi2)*l],
            [0, -(13/420+3/40*fi+1/24*fi2)*l,  -(1/140+1/60*fi+1/120*fi2)*l2, 0, (11/210+11/120*fi+1/24*fi2)*l, (1/105+1/60*fi+1/120*fi2)*l2],     
        ]);

        const M_CR = math.matrix([
            [0, 0, 0, 0, 0, 0],
            [0, 6/5, (1/10-1/2*fi)*l, 0, -6/5, (1/10-1/2*fi)*l],
            [0, (1/10-1/2*fi)*l, (2/15+1/6*fi+1/3*fi2)*l2, 0, -(1/10-1/2*fi)*l, -(1/30+1/6*fi-1/6*fi2)*l2],
            [0, 0, 0, 0, 0, 0],
            [0, -6/5, -(1/10-1/2*fi)*l, 0, 6/5, -(1/10-1/2*fi)*l],
            [0, (1/10-1/2*fi)*l, -(1/30+1/6*fi-1/6*fi2)*l2, 0, -(1/10-1/2*fi)*l, (2/15+1/6*fi+1/3*fi2)*l2]
        ]);

        return math.add(math.multiply((mat.d*cs.a*l)/((1+fi)*(1+fi)),M_CT), math.multiply(mat.d*cs.iy/((1+fi)*(1+fi)*l),M_CR));*/

    // Consistent mass matrix
    if (!this.diagonalMassMatrix)
      return math.multiply(
        (mat.d * cs.a * l) / 420,
        math.matrix([
          [140, 0, 0, 70, 0, 0],
          [0, 156, -22 * l, 0, 54, 13 * l],
          [0, -22 * l, 4 * l * l, 0, -13 * l, -3 * l * l],
          [70, 0, 0, 140, 0, 0],
          [0, 54, -13 * l, 0, 156, 22 * l],
          [0, 13 * l, -3 * l * l, 0, 22 * l, 4 * l * l],
        ])
      );

    // Diagonal mass matrix
    const alpha = 1 / 78;
    return math.multiply(
      mat.d * cs.a * l,
      math.matrix([
        [1 / 2, 0, 0, 0, 0, 0],
        [0, 1 / 2, 0, 0, 0, 0],
        [0, 0, alpha * l2, 0, 0, 0],
        [0, 0, 0, 1 / 2, 0, 0],
        [0, 0, 0, 0, 1 / 2, 0],
        [0, 0, 0, 0, 0, alpha * l2],
      ])
    );
  }

  /**
   * Evaluate element stiffness matrix in global c.s.
   */
  computeStiffness() {
    const geo = this.computeGeo();

    const kl = this.computeLocalStiffnessMtrx();
    const t = this.computeT();
    const k = math.multiply(math.multiply(math.transpose(t), kl.answer), t);
    return k;
  }

  /**
   * Evaluate element mass matrix in global c.s.
   */
  computeMassMatrix() {
    const geo = this.computeGeo();

    const ml = this.computeLocalMassMatrix();
    const t = this.computeT();
    const m = math.multiply(math.multiply(math.transpose(t), ml), t);
    return m;
  }

  /**
   * Evaluates initial stress matrix in global c.s.
   * @param N Element normal force
   */
  computeInitialStressMatrix(N: number) {
    const kl = this.computeLocalInitialStressMtrx(N);
    const t = this.computeT();
    const k = math.multiply(math.multiply(math.transpose(t), kl), t);
    return k;
  }

  /**
   * Computes element end displacement vector (in element local c.s.)
   * @param r global vector of unknowns
   */
  computeEndDisplacement(lc: LoadCase) {
    const t = this.computeT();
    const loc = this.getLocationArray();
    let rloc = math.multiply(t, math.subset(lc.r, math.index(loc)));

    if (this.hasHinges()) {
      const stiffrec = this.computeLocalStiffnessMtrx(true);
      let bl = math.zeros(6);
      for (const load of lc.getElementLoadsOnElement(this.label)) {
        bl = math.add(bl, load.getLoadVectorForClampedBeam()) as number[];
      }
      if (this.hasHinges()) {
        // re[ix_(b)] = dot(linalg.inv(kbb), -bl[ix_(b)] - dot(kab.transpose(), re[ix_(a)] ) )

        rloc = math.subset(
          rloc,
          math.index(stiffrec.b),
          math.multiply(
            math.inv(stiffrec.kbb),
            math.multiply(
              math.add(
                math.subset(bl, math.index(stiffrec.b)),
                math.squeeze(math.multiply(math.transpose(stiffrec.kab), math.subset(rloc, math.index(stiffrec.a))))
              ),
              -1.0
            )
          )
        );
      }
    }
    return rloc;
  }

  /**
   * Computes element end forces (in element local c.s.)
   * @param lc load case reference
   */
  computeEndForces(lc: LoadCase) {
    const t = this.computeT();
    const loc = this.getLocationArray();
    const re = math.multiply(t, math.subset(lc.r, math.index(loc)));

    const stiffrec = this.computeLocalStiffnessMtrx(true);
    let fe = math.multiply(stiffrec.answer, re) as math.Matrix;

    let bl = math.zeros(6) as math.Matrix;
    for (const load of lc.getElementLoadsOnElement(this.label)) {
      bl = math.add(bl, load.getLoadVectorForClampedBeam()) as math.Matrix;
    }
    if (this.hasHinges()) {
      // fe[ix_(a)] += bl[ix_(a)] - dot(dot(kab,linalg.inv(kbb)),bl[ix_(b)])

      const h1 = math.multiply(stiffrec.kab, math.inv(stiffrec.kbb));
      if (stiffrec.b.length == 1) {
        const blv = bl.get(stiffrec.b);
        for (let i = 0; i < stiffrec.a.length; i++) {
          fe.set([stiffrec.a[i]], fe.get([stiffrec.a[i]]) + bl.get([stiffrec.a[i]]) - h1.get([i, 0]) * blv);
        }
      } else {
        const help = math.subtract(
          math.subset(bl, math.index(stiffrec.a)),
          math.multiply(h1, math.matrix(math.subset(bl, math.index(stiffrec.b))))
        );
        fe = math.subset(
          fe,
          math.index(stiffrec.a),
          math.subtract(math.subset(fe, math.index(stiffrec.a)), help)
        ) as math.Matrix;
      }
    } else {
      fe = math.add(fe, bl) as math.Matrix;
    }
    return fe;
  }

  /**
   * Computes nseg+1 values of local deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeLocalDefl(lc: LoadCase, nseg: number) {
    const rl = this.computeEndDisplacement(lc);
    const u: number[] = [];
    const w: number[] = [];
    const geo = this.computeGeo();
    const l = geo.l;

    const eloads = lc.getElementLoadsOnElement(this.label);
    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xl = iseg / nseg; // [0,1]
      // components from end displacements
      let wl =
        (1.0 - 3.0 * xl * xl + 2.0 * xl * xl * xl) * rl.get([1]) +
        l * (-xl + 2.0 * xl * xl - xl * xl * xl) * rl.get([2]) +
        (3.0 * xl * xl - 2.0 * xl * xl * xl) * rl.get([4]) +
        l * (xl * xl - xl * xl * xl) * rl.get([5]);
      let ul = (1 - xl) * rl.get([0]) + xl * rl.get([3]);
      // add contributions of loads
      for (const load of eloads) {
        const c = load.computeBeamDeflectionContrib(xl);
        wl += c.w;
        ul += c.u;
      }
      u.push(ul);
      w.push(wl);
    }
    return { u: u, w: w };
  }

  /**
   * Computes nseg+1 values of global deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeGlobalDefl(lc: LoadCase, nseg: number) {
    const ld = this.computeLocalDefl(lc, nseg);
    const geo = this.computeGeo();
    const c: number = geo.dx / geo.l;
    const s: number = geo.dz / geo.l;
    const ug = [];
    const wg = [];
    for (let i = 0; i <= nseg; i++) {
      ug.push(ld.u[i] * c - ld.w[i] * s);
      wg.push(ld.w[i] * c + ld.u[i] * s);
    }
    return { u: ug, w: wg };
  }

  /**
   * Computes element end displacement vector (in element local c.s.)
   * @param r global vector of unknowns
   */
  computeEndDisplacementEigenMode(lc: LoadCase, ntheig: number) {
    const t = this.computeT();
    const loc = this.getLocationArray();
    let rloc = math.multiply(t, math.subset(lc.eigenVectors[ntheig], math.index(loc)));

    if (this.hasHinges()) {
      const stiffrec = this.computeLocalStiffnessMtrx(true);
      const bl = math.zeros(6);
      if (this.hasHinges()) {
        // re[ix_(b)] = dot(linalg.inv(kbb), -bl[ix_(b)] - dot(kab.transpose(), re[ix_(a)] ) )

        rloc = math.subset(
          rloc,
          math.index(stiffrec.b),
          math.multiply(
            math.inv(stiffrec.kbb),
            math.multiply(
              math.add(
                math.subset(bl, math.index(stiffrec.b)),
                math.squeeze(math.multiply(math.transpose(stiffrec.kab), math.subset(rloc, math.index(stiffrec.a))))
              ),
              -1.0
            )
          )
        );
      }
    }
    return rloc;
  }

  /**
   * Computes nseg+1 values of local deflections
   * @param lc reference to load case
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeLocalEigenMode(lc: LoadCase, ntheig: number, nseg: number) {
    const rl = this.computeEndDisplacementEigenMode(lc, ntheig);
    const u: number[] = [];
    const w: number[] = [];
    const geo = this.computeGeo();
    const l = geo.l;

    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xl = iseg / nseg; // [0,1]
      // components from end displacements
      const wl =
        (1.0 - 3.0 * xl * xl + 2.0 * xl * xl * xl) * rl.get([1]) +
        l * (-xl + 2.0 * xl * xl - xl * xl * xl) * rl.get([2]) +
        (3.0 * xl * xl - 2.0 * xl * xl * xl) * rl.get([4]) +
        l * (xl * xl - xl * xl * xl) * rl.get([5]);
      const ul = (1 - xl) * rl.get([0]) + xl * rl.get([3]);
      u.push(ul);
      w.push(wl);
    }
    return { u: u, w: w };
  }

  /**
   * Computes nseg+1 values of global deflections
   * @param lc reference to load case
   * @param ntheig n-th eigen value
   * @param nseg deflection will be evaluated in nseg+1 points generated along the element
   */
  computeGlobalEigenMode(lc: LoadCase, ntheig: number, nseg: number) {
    const ld = this.computeLocalEigenMode(lc, ntheig, nseg);
    const geo = this.computeGeo();
    const c: number = geo.dx / geo.l;
    const s: number = geo.dz / geo.l;
    const ug = [];
    const wg = [];
    for (let i = 0; i <= nseg; i++) {
      ug.push(ld.u[i] * c - ld.w[i] * s);
      wg.push(ld.w[i] * c + ld.u[i] * s);
    }
    return { u: ug, w: wg };
  }

  /**
   * Computes the values of normal force along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeNormalForce(lc: LoadCase, nseg: number) {
    //Computes >=nseg+1 values of local normal force,
    //returns list of distances, values N(x) and where labels should be  plotted
    const F = this.computeEndForces(lc);
    const geo = this.computeGeo();
    const x = [];
    const N = [];

    const eloads = lc.getElementLoadsOnElement(this.label);
    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xi = (geo.l * iseg) / nseg;
      let Ni = -F.get([0]);
      // add contributions of loads
      for (const load of eloads) {
        Ni += load.computeBeamNContrib(xi);
      }
      x.push(xi);
      N.push(Ni);
    }
    return { x: x, N: N };
  }

  computeNormalForceAt(lc: LoadCase, xi: number) {
    const F = this.computeEndForces(lc);

    const eloads = lc.getElementLoadsOnElement(this.label);
    let Ni = -F.get([0]);

    // add contributions of loads
    for (const load of eloads) {
      Ni += load.computeBeamNContrib(xi);
    }

    return Ni;
  }

  /**
   * Computes the values of shear force along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeShearForce(lc: LoadCase, nseg: number) {
    //Computes >=nseg+1 values of local normal force,
    //returns list of distances, values N(x) and where labels should be  plotted
    const F = this.computeEndForces(lc);
    const geo = this.computeGeo();
    const x = [];
    const V = [];

    const eloads = lc.getElementLoadsOnElement(this.label);
    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xi = (geo.l * iseg) / nseg;
      let Vi = -F.get([1]);
      // add contributions of loads
      for (const load of eloads) {
        Vi += load.computeBeamVContrib(xi);
      }
      x.push(xi);
      V.push(Vi);
    }
    return { x: x, V: V };
  }

  computeShearForceAt(lc: LoadCase, xi: number) {
    const F = this.computeEndForces(lc);

    const eloads = lc.getElementLoadsOnElement(this.label);
    let Vi = -F.get([1]);

    // add contributions of loads
    for (const load of eloads) {
      Vi += load.computeBeamVContrib(xi);
    }

    return Vi;
  }

  /**
   * Computes the values of bending moment along element
   * @param lc load case reference
   * @param nseg number of points-1
   */
  computeBendingMoment(lc: LoadCase, nseg: number) {
    //Computes >=nseg+1 values of local bending moment,
    //returns list of distances, values N(x) and where labels should be  plotted
    const F = this.computeEndForces(lc);
    const geo = this.computeGeo();
    const x = [];
    const M = [];

    const eloads = lc.getElementLoadsOnElement(this.label);
    for (let iseg = 0; iseg <= nseg; iseg++) {
      const xi = (geo.l * iseg) / nseg;
      let Mi = -F.get([2]) - F.get([1]) * xi;
      // add contributions of loads
      for (const load of eloads) {
        Mi += load.computeBeamMContrib(xi);
      }
      x.push(xi);
      M.push(Mi);
    }
    return { x: x, M: M };
  }

  computeBendingMomentAt(lc: LoadCase, xi: number) {
    const F = this.computeEndForces(lc);

    const eloads = lc.getElementLoadsOnElement(this.label);
    let Mi = -F.get([2]) - F.get([1]) * xi;

    // add contributions of loads
    for (const load of eloads) {
      Mi += load.computeBeamMContrib(xi);
    }

    return Mi;
  }
}
