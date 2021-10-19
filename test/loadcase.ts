import { expect } from 'chai';
import {Node, BeamElementUniformEdgeLoad, Beam2D, CrossSection, Material, Domain, Solver, LoadCase, DofID, Load, NodalLoad} from '../src/fem';
import {setupSampleProblem, checkArray, domain, solver} from './util'
import { create, all, MathArray } from 'mathjs' 

const config = { }
const math = create(all, config)


describe("LoadCase", function() {
    it ('Default Constructor', function() {
        const lc = new LoadCase ("LC_Name", domain);
        
        expect(lc.label).to.equal("LC_Name");
    });
    it ('getElementLoadsOnElement', function() {
        const lc = new LoadCase ("LC_Name", domain);
        lc.createNodalLoad(3);
        let el1 = lc.createBeamElementUniformEdgeLoad(5, [1,2], false);
        let el2 = lc.createBeamElementUniformEdgeLoad(2, [1,2], false);
        let el3 = lc.createBeamElementUniformEdgeLoad(5, [-1,-2], false);
        
        let l=lc.getElementLoadsOnElement(5);
        expect(l).to.include(el1);
        expect(l).to.include(el3);
    });
});