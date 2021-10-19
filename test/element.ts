import { expect } from 'chai';
import {Element, Material, CrossSection, Domain, DofID, Solver} from '../src/fem';

var solver = new Solver();
let domain = solver.domain;

describe("Element", function() {
    it ('Constructor', function() {
        const e = new Element(1, domain, [1,2], 1, 2);
        expect(e.label).to.equal(1);
        expect(e.nodes).to.eql([1,2]);
        expect(e.mat).to.equal(1);
        expect(e.cs).to.equal(2);
    });
    it ('change', function() {
        let e = new Element(1, domain, [1,2], 1, 2);
        e.change(2, [3,4], 5, 6);
        expect(e.label).to.equal(2);
        expect(e.nodes).to.eql([3,4]);
        expect(e.mat).to.equal(5);
        expect(e.cs).to.equal(6);
    });
    it ('getMaterial', function() {
        const m = domain.createMaterial(1);
        const e = new Element(1, domain, [1,2], 1, 2);
        expect(e.getMaterial()).to.eql(m);
    });
    it ('getCS', function() {
        const c = domain.createCrossSection(2, { a: 1.0, iy: 0.1, iz: 0.1, dyz: 0.1, h:1.0, k:1.0, j:1.2e-5});
        const e = new Element(1, domain, [1,2], 1, 2);
        expect(e.getCS()).to.eql(c);
    });
    it ('getNodeDofs', function() {
        const e = new Element(1, domain, [1,2], 1, 2);
        expect(e.getNodeDofs(1)).to.eql([]);
    });
});
