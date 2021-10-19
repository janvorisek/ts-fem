import { expect } from 'chai';
import {CrossSection} from '../src/fem';



describe("CrossSection", () => {
    it ('Constructor', () => {
        const c = new CrossSection(1, {a: 0.6, iy: 1e-3, iz: 0.5e-3, dyz: 0.7e-3, h: 0.1, k: 0.6, j: 1.5e-3});
        expect(c.label).to.equal(1);
        expect(c.j).to.equal(1.5e-3);
        expect(c.a).to.equal(0.6);
        expect(c.iy).to.equal(1.e-3);
        expect(c.iz).to.equal(0.5e-3);
        expect(c.dyz).to.equal(0.7e-3);
        expect(c.h).to.equal(0.1);
        expect(c.k).to.equal(0.6);
    });
    it ('change', () => {
        const c = new CrossSection(1, {a: 0.6, iy: 1e-3, iz: 0.5e-3, dyz: 0.7e-3, h: 0.1, k: 0.6, j: 1.5e-3});
        c.change({a: 1, iy: 2, iz: 3, dyz: 4, h: 5, k: 6, j: 7})
        expect(c.label).to.equal(1);
        expect(c.a).to.equal(1);
        expect(c.iy).to.equal(2);
        expect(c.iz).to.equal(3);
        expect(c.dyz).to.equal(4);
        expect(c.h).to.equal(5);
        expect(c.k).to.equal(6);
        expect(c.j).to.equal(7);
    });
});
