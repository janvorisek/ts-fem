import { expect } from 'chai';
import {Solver,Node, BeamElementUniformEdgeLoad, Beam2D, CrossSection, Material, Domain, LoadCase, DofID, Load, NodalLoad, PrescribedDisplacement} from '../src/fem';
import {setupSampleProblem, setupSampleCantileverProblem, solver, domain, checkArray} from './util'
import { create, all, MathArray } from 'mathjs' 

const config = { }
const math = create(all, config)


describe("Solver", function() {
    it ('Default Constructor', function() {
        const s = new Solver();
        // check if default LC has been created
        expect(s.loadCases.length).to.equal(1);
        expect(s.loadCases[0].label).to.equal("DefaultLC");
    });
    it ('getNodeLocationArray', function() {
        setupSampleProblem();
        //console.log(solver.nodeCodeNumbers);
        expect(solver.getNodeLocationArray(1, [DofID.Dx])).to.eqls([3]);
        expect(solver.getNodeLocationArray(1, [DofID.Dx, DofID.Ry])).to.eqls([3,1]);
        expect(solver.getNodeLocationArray(1, [DofID.Dx, DofID.Dz, DofID.Ry])).to.eqls([3,0,1]);
        expect(solver.getNodeLocationArray(5, [DofID.Dx, DofID.Dz, DofID.Ry])).to.eqls([4,5,2]);
    });
    it ('getNodeDofIDs', function() {
        setupSampleProblem();
        //console.log(solver.getNodeDofIDs(1));
        expect(solver.getNodeDofIDs(1)).to.contain(DofID.Dx);
    });
    it ('generateCodeNumbers', function() {
        setupSampleProblem();
        solver.generateCodeNumbers();
        expect(solver.getNodeLocationArray(5, [DofID.Dx, DofID.Dz, DofID.Ry])).to.eqls([4,5,2]);
    });
    it ('assembleVecLC', function() {
        let f = math.zeros(4,1) as math.Matrix;
        solver.assembleVecLC(f, [1,2,3,4], [3,0,1,2], 0);
        expect(f.get([0,0])).to.equal(2);
        expect(f.get([1,0])).to.equal(3);

    });
    it ('solve', function () {
        setupSampleCantileverProblem();
        solver.solve();
        let r = (solver.loadCases[0].r as math.Matrix).toArray() as [];
        checkArray(r, [2.5e-06,0.000759,-0.00033333333,0,0,0], 1.e-6);
    })
    it ('solve with precribed displacements', function () {
        setupSampleCantileverProblem();
        solver.loadCases[0].createPrescribedDisplacement(1, {[DofID.Ry]:0.23});
        solver.solve();
        let r = (solver.loadCases[0].r as math.Matrix).toArray() as [];
        checkArray(r, [2.5e-06,-0.689241 ,0.23-0.00033333333,0,0,0.23], 1.e-6);
    })

});