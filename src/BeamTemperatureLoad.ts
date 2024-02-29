import * as math from "mathjs";
import { Beam2D } from "./Beam2D";
import { BeamElementLoad } from "./BeamElementLoad";
import { Domain } from "./Domain";
import { LabelType } from ".";

export class BeamTemperatureLoad extends BeamElementLoad {
  values: number[]; // fx, fz intensities

  constructor(elem: LabelType, domain: Domain, values: number[]) {
    super(elem, domain);
    this.values = values;
  }

  change(elem: LabelType, values: number[]) {
    this.target = elem.toString();
    this.values = values;
  }

  getGlobalIntensities() {
    const fx = this.values[0]; // temperature of top fibers
    const fz = this.values[1]; // temperature of bottom fibers

    // transrform intensities to global
    const geo = this.domain.getElement(this.target).computeGeo();
    const cos = geo.dx / geo.l;
    const sin = geo.dz / geo.l;
    return { fx: fx * cos - fz * sin, fz: fx * sin + fz * cos, my: 0.0 };
  }

  getLocalIntensities() {
    const fx = this.values[0]; // intensity in x-local
    const fz = this.values[1]; // intensity in z-local
    const geo = this.domain.getElement(this.target).computeGeo();
    const l = geo.l;
    const dx = geo.dx;
    const dz = geo.dz;
    const cos = dx / l;
    const sin = dz / l;

    return {
      fx: fx * cos + fz * sin,
      fz: -fx * sin + fz * cos,
    };
  }

  // in local c.s
  getLoadVectorForClampedBeam(): Array<number> {
    const geo = this.domain.getElement(this.target).computeGeo();
    const l = geo.l;
    const e = this.domain.getElement(this.target).getMaterial().e;
    const alpha = this.domain.getElement(this.target).getMaterial().alpha;
    const a = this.domain.getElement(this.target).getCS().a;

    return [e * a * alpha * this.values[0], 0, 0, -e * a * alpha * this.values[0], 0, 0];
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
      // following is result of static condensation
      // ret[ix_(a)] = f[ix_(a)] - dot(dot(kab,linalg.inv(kbb)),f[ix_(b)])

      // fe[ix_(a)] += bl[ix_(a)] - dot(dot(kab,linalg.inv(kbb)),bl[ix_(b)])

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
    const elem = this.domain.elements.get(this.target);
    const geo = elem.computeGeo();
    const l = geo.l;
    const w =
      (f.fz * l * l * l * l * ((xl * xl * xl * xl) / 24 - (xl * xl * xl) / 12 + (xl * xl) / 24)) /
      (elem.getMaterial().e * elem.getCS().iy);
    const u = 0.0;
    return { u: u, w: w };
  }
  computeBeamNContrib(x: number): number {
    const f = this.getLocalIntensities();
    return -f.fx * x;
  }
  computeBeamVContrib(x: number): number {
    const f = this.getLocalIntensities();
    return -f.fz * x;
  }
  computeBeamMContrib(x: number): number {
    const f = this.getLocalIntensities();
    return (-f.fz * x * x) / 2.0;
  }
}
