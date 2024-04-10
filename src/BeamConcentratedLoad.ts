import * as math from "mathjs";
import { Beam2D } from "./Beam2D";
import { BeamElementLoad } from "./BeamElementLoad";
import { Domain } from "./Domain";
import { LabelType } from ".";

/**
 * Implementation of Beam2d concentrated load
 * TODO: only Fx, Fz now - add concentrated moment support
 */
export class BeamConcentratedLoad extends BeamElementLoad {
  values: number[]; // Fx, Fz, My, distance x
  lcs: boolean;

  constructor(elem: LabelType, domain: Domain, values: number[], lcs: boolean) {
    super(elem, domain);
    this.values = values;
    this.lcs = lcs;
  }
  change(elem: LabelType, values: number[], lcs: boolean) {
    this.target = elem.toString();
    this.values = values;
    this.lcs = lcs;
  }
  getGlobalIntensities() {
    const fx = this.values[0];
    const fz = this.values[1];
    if (this.lcs) {
      const geo = this.domain.getElement(this.target).computeGeo();
      const cos = geo.dx / geo.l;
      const sin = geo.dz / geo.l;
      return { fx: fx * cos - fz * sin, fz: fx * sin + fz * cos, my: 0.0 };
    } else {
      return { fx: fx, fz: fz, my: 0.0 };
    }
  }
  getLocalIntensities() {
    const fx = this.values[0];
    const fz = this.values[1];
    const geo = this.domain.getElement(this.target).computeGeo();
    const l = geo.l;
    const dx = geo.dx;
    const dz = geo.dz;
    const cos = dx / l;
    const sin = dz / l;
    if (!this.lcs) {
      return {
        fx: fx * cos + fz * sin,
        fz: -fx * sin + fz * cos,
      };
    } else {
      return { fx: fx, fz: fz };
    }
  }

  getLoadVectorForClampedBeam(): Array<number> {
    const geo = this.domain.getElement(this.target).computeGeo();
    const f = this.getLocalIntensities();
    const fx = f.fx;
    const fz = f.fz;
    const l = geo.l;

    const a = this.values[3];
    const b = l - a;

    return [
      (-b / l) * fx,
      (b / l) * ((a * (a - b)) / l / l - 1) * fz,
      ((a * b * b) / l / l) * fz,
      (-a / l) * fx,
      (a / l) * ((b * (b - a)) / l / l - 1) * fz,
      ((-a * a * b) / l / l) * fz,
    ];
  }

  getLocationArray(): number[] {
    return this.domain.getElement(this.target).getLocationArray();
  }

  getLoadVector(): number[] {
    const elem = <Beam2D>this.domain.getElement(this.target);
    const t = elem.computeT();
    const f = this.getLoadVectorForClampedBeam();
    if (elem.hasHinges()) {
      const stiffrec = elem.computeLocalStiffnessMtrx(true);
      let ans = [0, 0, 0, 0, 0, 0];

      const h1 = math.multiply(stiffrec.kab, math.inv(stiffrec.kbb));
      if (stiffrec.b.length == 1) {
        const flv = f[stiffrec.b[0]];
        for (let i = 0; i < stiffrec.a.length; i++) {
          ans[stiffrec.a[i]] = f[stiffrec.a[i]] - h1.get([i, 0]) * flv;
        }

        return math.multiply(math.multiply(math.transpose(t), ans), -1.0).toArray() as number[];
      } else {
        const help = math.subtract(
          math.subset(f, math.index(stiffrec.a)),
          math.multiply(h1, math.subset(f, math.index(stiffrec.b)))
        );
        ans = math.subset(ans, math.index(stiffrec.a), help);
        return math.multiply(math.multiply(math.transpose(t), ans), -1.0).toArray() as number[];
      }
    } else {
      return math.multiply(math.multiply(math.transpose(t), f), -1.0).toArray() as number[];
    }
  }

  computeBeamDeflectionContrib(xl: number): { u: number; w: number } {
    const f = this.getLocalIntensities();
    const elem = this.domain.elements.get(this.target)!;
    const geo = elem.computeGeo();
    const l = geo.l;

    const Fxloc = f.fx;
    const Fzloc = f.fz;

    const e = this.domain.getElement(this.target).getMaterial().e;
    const area = this.domain.getElement(this.target).getCS().a;
    const iy = this.domain.getElement(this.target).getCS().iy;

    const a = this.values[3];
    const b = l - a;

    const Za = (b / l) * ((a * (a - b)) / l / l - 1) * Fzloc;
    const Ma = ((a * b * b) / l / l) * Fzloc;
    const EI = e * iy;
    const EA = e * area;
    const x = xl * l;

    let u = 0;
    let w = 0;

    if (x < a) u += ((b / l) * Fxloc * x) / EA;
    else u += ((b / l) * Fxloc * a) / EA - ((a / l) * Fxloc * (x - a)) / EA;

    if (x > a) {
      w = ((Za * Math.pow(x, 3)) / 6 + (Ma * Math.pow(x, 2)) / 2 + (Fzloc * Math.pow(x - a, 3)) / 6) / EI;
    } else {
      w = ((Za * Math.pow(x, 3)) / 6 + (Ma * Math.pow(x, 2)) / 2) / EI;
    }

    return { u: u, w: w };
  }
  computeBeamNContrib(x: number): number {
    const f = this.getLocalIntensities();
    const a = this.values[3];
    return x < a ? 0 : -f.fx;
  }
  computeBeamVContrib(x: number): number {
    const f = this.getLocalIntensities();
    const a = this.values[3];
    return x < a ? 0 : -f.fz;
  }
  computeBeamMContrib(x: number): number {
    const f = this.getLocalIntensities();
    const a = this.values[3];
    return x < a ? 0 : -f.fz * (x - a);
  }
}
