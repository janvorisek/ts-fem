import { expect } from 'chai';
import {Beam2D, Material, CrossSection, Domain, DofID, Node, Solver} from '../src/fem';
import {checkArray, checkMtrx} from './util'
import { create, all, MathArray } from 'mathjs' 

const config = { }
const math = create(all, config)

var solver = new Solver();
var domain = solver.domain;

function setup() {
    domain.createNode(1, [0,0,0], [DofID.Dx]);
    domain.createNode(5, [3,0,4], [DofID.Dx,DofID.Dz]);
    domain.createBeam2D(10, [1,5], 1, 1);

    domain.createCrossSection(1, {a: 0.06, iy: 0.00045, iz: 0.00025, dyz: 0.0001, h: 0.3, k: 0.8333, j: 0.0007});
    domain.createMaterial(1, {e: 3.e7, g: 1.e7, alpha: 1.2e-5, d: 2.5e3 });
    solver.generateCodeNumbers();
    // prescribed displacement vector at nodes, code numbers of element = [3,0,1,  4,5,2]
    solver.loadCases[0].r=[2,1.e-4,1.e-4, 1, 1.001, 2.001];
}

describe("Beam2D", function() {
    it ('Default Constructor', function() {
        const e = new Beam2D(1, domain, [1,2], 1, 2);
        expect(e.label).to.equal(1);
        expect(e.nodes).to.eql([1,2]);
        expect(e.mat).to.equal(1);
        expect(e.cs).to.equal(2);
        expect(e.hinges).to.eql([false, false]);
    });
    it ('Constructor', function() {
        let e = new Beam2D(1, domain, [3,4], 5, 6, [false,true]);
        expect(e.label).to.equal(1);
        expect(e.nodes).to.eql([3,4]);
        expect(e.mat).to.equal(5);
        expect(e.cs).to.equal(6);
        expect(e.hinges).to.eql([false, true]);
    });
    it ('getNodeDofs', function() {
        const e = new Beam2D(1, domain, [1,2], 1, 2);
        expect(e.getNodeDofs(1)).to.have.all.members([DofID.Ry, DofID.Dx, DofID.Dz]);
    });
    it ('getLocationArray', function() {
        setup();
        expect(domain.getElement(10).getLocationArray()).to.eql([3,0,1,  4,5,2]);
    });
    it ('hasHinges', function() {
        setup();
        expect((<Beam2D> domain.getElement(10)).hasHinges()).to.equal(false);
        let e = new Beam2D(1, domain, [3,4], 5, 6, [false,true]);
        expect(e.hasHinges()).to.equal(true);
    });
    it ('computeGeo', function() {
        setup();
        let e10 = domain.getElement(10);
        expect(e10.computeGeo()).to.have.property('l', 5);
        expect(e10.computeGeo()).to.have.property('dx', 3.0);
        expect(e10.computeGeo()).to.have.property('dz', 4.0);
    });
    it ('computeT', function() {
        setup();
        let e10 = domain.getElement(10);
        expect(e10.computeT().toArray()).to.eql([[3/5, 4/5, 0, 0,0,0],[-4/5, 3/5,0, 0,0,0], [0,0,1, 0,0,0],
                                                 [0,0,0, 3/5, 4/5, 0],[0,0,0, -4/5, 3/5,0], [0,0,0, 0,0,1]]);
    });
    it ('computeT with nodal lcs', function () {
        setup();
        let e10 = domain.getElement(10);

        domain.getNode(1).updateLcs({locx:[0,0,-1], locy:[0,1,0]});
        expect(e10.computeT().toArray()).to.eql([[-4/5, 3/5, 0, 0,0,0],[-3/5, -4/5,0, 0,0,0], [0,0,1, 0,0,0],
                                                 [0,0,0, 3/5, 4/5, 0],[0,0,0, -4/5, 3/5,0], [0,0,0, 0,0,1]]);
        domain.getNode(1).updateLcs();
        domain.getNode(1).change2({coords:[1,0,0]});
        domain.getNode(5).change2({coords:[3,0,0]}); 
        domain.getNode(1).updateLcs({locx:[0,0,-1], locy:[0,1,0]});
        expect(e10.computeT().toArray()).to.eql([[0, 1, 0, 0,0,0],[-1, 0,0, 0,0,0], [0,0,1, 0,0,0],
                                                 [0,0,0, 1, 0, 0],[0,0,0, 0, 1,0], [0,0,0, 0,0,1]]);

    });
    it ('computeLocalStiffnessMatrix of clamped beam', function() {
        setup();
        let e10 = <Beam2D> domain.getElement(10);

        let s = e10.computeLocalStiffnessMtrx();
        expect(s).to.have.property('answer');
        //expect(s.answer).to.be.a("Matrix");
        const expectedAns = [ [360000,0,0,-360000,0,0],
                            [0,1279.42,-3198.55,0,-1279.42,-3198.55],
                            [0,-3198.55,10696.4,0,3198.55,5296.37],
                            [-360000,0,0,360000,0,0],
                            [0,-1279.42,3198.55,0,1279.42,3198.55],
                            [0,-3198.55,5296.37,0,3198.55,10696.4]];
        checkMtrx(<math.Matrix>s.answer, expectedAns, 5.e-2);
    });
    it ('computeLocalStiffnessMatrix of clamped-hinged beam', function() {
        setup();
        let e10 = <Beam2D> domain.getElement(10);

        e10.hinges=[false, true];
        let s = e10.computeLocalStiffnessMtrx(true);
        e10.hinges=[false, false];
        expect(s).to.have.property('answer');
        expect(s).to.have.property('a');
        expect(s).to.have.property('b');
        expect(s).to.have.property('kaa');
        expect(s).to.have.property('kab');
        expect(s).to.have.property('kbb');
        //expect(s.answer).to.be.a("Matrix");
        const expectedAns = [[360000,0,0,-360000,0,0],
                            [0,322.954,-1614.77,0,-322.954,0],
                            [0,-1614.77,8073.84,0,1614.77,0],
                            [-360000,0,0,360000,0,0],
                            [0,-322.954,1614.77,0,322.954,0],
                            [0,0,0,0,0,0]];
        checkMtrx(<math.Matrix>s.answer, expectedAns, 5.e-2);
        expect(s.a).to.eql([0,1,2,3,4]);
        expect(s.b).to.eql([5]);
    });
    it ('computeStiffness', function() {
        setup();
        let e10 = <Beam2D> domain.getElement(10);

        let s = e10.computeStiffness();
        e10.hinges=[false, false];
        //expect(s.answer).to.be.a("Matrix");
        const expectedAns = [[130419,172186,2558.84,-130419,-172186,2558.84],
                            [172186,230861,-1919.13,-172186,-230861,-1919.13],
                            [2558.84,-1919.13,10696.4,-2558.84,1919.13,5296.37],
                            [-130419,-172186,-2558.84,130419,172186,-2558.84],
                            [-172186,-230861,1919.13,172186,230861,1919.13],
                            [2558.84,-1919.13,5296.37,-2558.84,1919.13,10696.4]];
        checkMtrx(<math.Matrix>s, expectedAns, 5.e-1);
    });
    it ('computeEndDisplacement', function() {
        setup();
        let e10 = <Beam2D> domain.getElement(10);

        let s = e10.computeEndDisplacement(solver.loadCases[0]).toArray() as number[];
        checkArray(s, [2.2, 0.4, 1.e-4, 2.2014, 0.3998, 1.e-4], 5.e-4);
    });
    it ('computeEndDisplacement hinge-clamped ', function() {
        setup();
        let e10 = <Beam2D> domain.getElement(10);

        // code numbers = [3,0,1,  4,5,2]
        e10.hinges=[true, false];
        let s = e10.computeEndDisplacement(solver.loadCases[0]).toArray() as number[];
        e10.hinges=[false, false];
        
        checkArray(s, [2.2, 0.4,1.0290658e-5, 2.2014, 0.3998, 1.e-4], 5.e-8);
    });
    it ('computeEndForces', function() {
        setup();
        let e10 = <Beam2D> domain.getElement(10);

        let s = e10.computeEndForces(solver.loadCases[0]).toArray() as number[];
        checkArray(s, [-504,-0.38382562,0.95956405,504,0.38382562,0.95956405], 5.e-5);
    });
    it ('computeEndForces hinge-clamped', function() {
        setup();
        let e10 = <Beam2D> domain.getElement(10);

        e10.hinges=[true, false];
        let s = e10.computeEndForces(solver.loadCases[0]).toArray() as number[];
        e10.hinges=[false, false];
        checkArray(s, [-504,-0.096886089,0,504,0.096886089,0.48443044], 5.e-6);
    });

});
