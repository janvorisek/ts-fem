import { expect } from 'chai';
import {Beam2D, Material, CrossSection, Domain, DofID, Node, Element, Solver, BeamElementUniformEdgeLoad} from '../src/fem';
import { create, all, MathArray } from 'mathjs' 

const config = { }
const math = create(all, config)

export var solver = new Solver();
export var domain = solver.domain;

export function setupSampleProblem() {
    domain.nodes = new Map<number, Node>();
    domain.elements = new Map<number, Element>();
    domain.crossSections = new Map<number, CrossSection>();
    domain.materials = new Map<number,Material>();

    domain.createNode(1, [0,0,0], [DofID.Dx]); // code numbers [3,0,1]
    domain.createNode(5, [3,0,4], [DofID.Dx,DofID.Dz]); // code numbers [4,5,2]
    domain.createBeam2D(10, [1,5], 1, 1);
    domain.createCrossSection(1, { a: 0.06, iy: 0.00045, iz: 0.00025, dyz: 0.0001, h: 0.3, k: 0.8333, j: 0.0007 });
    domain.createMaterial(1, { e: 3.e7, g: 1.e7, alpha: 1.2e-5, d: 2.5e3 });
    solver.generateCodeNumbers();
    // prescribed displacement vector at nodes, code numbers of element = [3,0,1,  4,5,2]
    solver.loadCases[0].nodalLoadList=[];
    solver.loadCases[0].elementLoadList=[];
    solver.loadCases[0].prescribedBC=[];
    solver.loadCases[0].r=[2,1.e-4,1.e-4, 1, 1.001, 2.001];
}
export function setupSampleCantileverProblem() {
    domain.nodes = new Map<number, Node>();
    domain.elements = new Map<number, Element>();
    domain.crossSections = new Map<number, CrossSection>();
    domain.materials = new Map<number,Material>();

    domain.createNode(1, [0,0,0], [DofID.Dx,DofID.Dz,DofID.Ry]); // code numbers [3,4,5]
    domain.createNode(5, [3,0,0] ); // code numbers [0,1,2]
    domain.createBeam2D(10, [1,5], 1, 1);
    domain.createCrossSection(1, { a: 0.06, iy: 0.00045, iz: 0.00025, dyz: 0.0001, h: 0.3, k: 0.8333, j: 0.0007});
    domain.createMaterial(1, { e: 3.e7, g: 1.e7, alpha: 1.2e-5, d: 2.5e3 });
    solver.loadCases[0].nodalLoadList=[];
    solver.loadCases[0].elementLoadList=[];
    solver.loadCases[0].prescribedBC=[];

    solver.loadCases[0].createBeamElementUniformEdgeLoad(10, [1,1], false);
    solver.codeNumberGenerated=false;
    
}
export function checkMtrx (a:math.Matrix, expected:number[][], tol:number) {
    expect(a.size()).to.be.eql([expected.length, expected[0].length]);
    for (let i=0; i<expected.length; i++) {
        for (let j=0;j<expected.length; j++){
            expect(a.get([i,j])).to.be.closeTo(expected[i][j], tol);
        }
    }   
}
export function checkArray (a:number[], expected:number[], tol:number) {
    expect(a.length).to.be.equal(expected.length);
    for (let i=0; i<expected.length; i++) {
        expect(a[i]).to.be.closeTo(expected[i], tol);
    }   
}