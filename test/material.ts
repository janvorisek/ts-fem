import { expect } from 'chai';
import {Material} from '../src/fem';



describe("Material", () => {
    it ('Default constructor', () => {
        const m = new Material(1);
        expect(m.label).to.equal(1);
        expect(m.d).to.equal(1.0);
        expect(m.e).to.equal(1.0);
        expect(m.g).to.equal(1.0);
        expect(m.alpha).to.equal(1.0);
    });
    it ('Constructor with params', () => {
        const m = new Material(3, { e: 1.e3, g: 0.5e3, alpha: 1.2e-5, d: 0.25 });
        expect(m.label).to.equal(3);
        expect(m.d).to.equal(0.25);
        expect(m.e).to.equal(1.e3);
        expect(m.g).to.equal(0.5e3);
        expect(m.alpha).to.equal(1.2e-5);
    });
    it ('change', () => {
        let m = new Material(3);
        m.change({label: 'NewMaterial', e: 1.e3, g: 0.5e3, alpha: 1.2e-5, d: 0.25 });
        expect(m.label).to.equal(3);
        expect(m.d).to.equal(0.25);
        expect(m.e).to.equal(1.e3);
        expect(m.g).to.equal(0.5e3);
        expect(m.alpha).to.equal(1.2e-5);
    });
});




