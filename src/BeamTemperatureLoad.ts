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

  // in local c.s
  getLoadVectorForClampedBeam(): Array<number> {
    const mat = this.domain.getElement(this.target).getMaterial();
    const cs = this.domain.getElement(this.target).getCS();

    const e = mat.e;
    const alpha = mat.alpha;

    const a = cs.a;
    const iy = cs.iy;
    const h = cs.h;

    const dT = this.values[1] - this.values[2];

    return [
      +e * a * alpha * this.values[0],
      0,
      +(e * iy * alpha * dT) / h,
      -e * a * alpha * this.values[0],
      0,
      -(e * iy * alpha * dT) / h,
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
    const w = 0.0;
    const u = 0.0;
    return { u: u, w: w };
  }
  computeBeamNContrib(x: number): number {
    return 0.0;
  }
  computeBeamVContrib(x: number): number {
    return 0.0;
  }
  computeBeamMContrib(x: number): number {
    return 0.0;
  }
}
