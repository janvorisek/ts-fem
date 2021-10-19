import { expect } from 'chai';
import {Node, NodalLoad, Domain, Solver, DofID} from '../src/fem';
import { create, all, MathArray } from 'mathjs' 

const config = { }
const math = create(all, config)

var solver = new Solver();
var domain = solver.domain;

domain.createNode(1, [0,0,0], [DofID.Dx]); // code numbers [3,0,1]
domain.createNode(5, [3,0,4], [DofID.Dx,DofID.Dz]); // code numbers [4,5,2]
solver.nodeCodeNumbers.set(1,{[DofID.Dx]:3, [DofID.Dz]:0, [DofID.Ry]:1});
solver.nodeCodeNumbers.set(5,{[DofID.Dx]:4, [DofID.Dz]:5, [DofID.Ry]:2});


describe("NodalLoad", function() {
    it ('Default Constructor', function() {
        const e = new NodalLoad(1, domain);
        expect(e.target).to.equal(1);
        expect(e.values).to.eql({});
    });
    it ('Constructor', function() {
        const e = new NodalLoad(2, domain, {[DofID.Dx]:10, [DofID.Ry]:15});
        expect(e.target).to.equal(2);
        expect(e.values).to.include({[DofID.Dx]:10, [DofID.Ry]:15});
    });
    it ('change', function() {
        const e = new NodalLoad(2, domain);
        e.change(3, {[DofID.Dx]:10, [DofID.Ry]:15});
        expect(e.target).to.equal(3);
        expect(e.values).to.include({[DofID.Dx]:10, [DofID.Ry]:15});
    });
    it ('getLoadVector', function() {
        const e = new NodalLoad(2, domain);
        expect(e.getLoadVector()).to.eql([]);
        const e2 = new NodalLoad(1, domain, {[DofID.Dx]:10, [DofID.Dy]:7, [DofID.Ry]:15});
        expect(e2.getLoadVector()).to.eql([10, 0, 15]);
    });
    it ('getLocationArray', function() {
        const e = new NodalLoad(2, domain);
        expect(e.getLocationArray()).to.eql([]);
        const e2 = new NodalLoad(1, domain, {[DofID.Dx]:10, [DofID.Dy]:7, [DofID.Ry]:15});
        expect(e2.getLocationArray()).to.eql([3, 0, 1]);
    });
});