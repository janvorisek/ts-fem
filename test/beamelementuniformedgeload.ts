import { expect } from 'chai';
import {Node, BeamElementUniformEdgeLoad, Beam2D, CrossSection, Material, Domain, Solver, DofID} from '../src/fem';
import {setupSampleProblem, checkArray, domain} from './util'
import { create, all, MathArray } from 'mathjs' 

const config = { }
const math = create(all, config)


describe("BeamElementUniformEdgeLoad", function() {
    it ('Default Constructor', function() {
        setupSampleProblem();
        const e = new BeamElementUniformEdgeLoad(10, domain, [1,2,3], false);
        expect(e.target).to.equal(10);
        expect(e.values).to.eql([1,2,3]);
        expect(e.lcs).to.be.false;
    });
    it ('change', function() {
        setupSampleProblem();
        const e = new BeamElementUniformEdgeLoad(10, domain, [1,2,3], false);
        e.change(11, [4,5,6], true);
        expect(e.target).to.equal(11);
        expect(e.values).to.eql([4,5,6]);
        expect(e.lcs).to.be.true;
    });
    it ('getLocalIntensities', function() {
        setupSampleProblem();
        let e = new BeamElementUniformEdgeLoad(10, domain, [1,2], false);
        let l = e.getLocalIntensities();
        expect(l).to.have.property('fx', 3/5*1+4/5*2);
        expect(l).to.have.property('fz',-4/5*1+3/5*2);
        e.change(10, [1,2,3], true);
        l = e.getLocalIntensities();
        expect(l).to.have.property('fx', 1);
        expect(l).to.have.property('fz', 2);
    });
    it ('getLoadVectorForClampedBeam', function() {
        setupSampleProblem();
        let e = new BeamElementUniformEdgeLoad(10, domain, [1,2], true);
        expect(e.getLoadVectorForClampedBeam()).to.eql([-0.5*5*1, -0.5*5*2,+1/12.*2*5*5, -0.5*5*1, -0.5*5*2, -1/12.*2*5*5]);
    });
    it ('getLocationArray', function() {
        setupSampleProblem();
        let e = new BeamElementUniformEdgeLoad(10, domain, [1,2], true);
        expect(e.getLocationArray()).to.eql([3,0,1,4,5,2]);
    });
    it ('getLoadVector', function() {
        setupSampleProblem();
        let e = new BeamElementUniformEdgeLoad(10, domain, [1,2], true);
        const flx = 1; const flz=2; 
        const cos = 3/5; const sin = 4/5;
        const fgx = cos*flx-sin*flz; const fgz=sin*flx+cos*flz;
        const l = 5;
        
        checkArray(e.getLoadVector(), [fgx*l/2, fgz*l/2, -fgz*l*l/12, fgx*l/2, fgz*l/2, fgz*l*l/12], 1.e-5);
        (<Beam2D>domain.elements.get(10)).hinges=[true, false];
        domain.crossSections.get(1).k=1.e6;
        checkArray(e.getLoadVector(), [cos*flx*l/2-sin*flz*3*l/8, sin*flx*l/2+cos*flz*3*l/8, 0, 
                                       cos*flx*l/2-sin*flz*5*l/8, sin*flx*l/2+cos*flz*5*l/8, fgz*l*l/8], 1.e-5);
    });

});