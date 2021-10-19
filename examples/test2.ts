
import {Node, Beam2D, CrossSection, Material, DofID, Domain, Solver, NodalLoad, LoadCase, BeamElementUniformEdgeLoad} from '../src/fem';
import { create, all, MathArray } from 'mathjs'
import {exportDrawingtoURL, setupCanvas, drawGeometry} from './simpledraw'

const config = { }
const math = create(all, config)

var solver = new Solver();
let domain = solver.domain;
domain.createNode(1, [0,0,2], [DofID.Dx,DofID.Dz,DofID.Ry]);
domain.createNode(25, [2,0,2], [DofID.Dx,DofID.Dz,DofID.Ry]);

domain.createBeam2D(1,[1,25],1,1, [false, true]);
domain.createCrossSection(1, { a: 1.0, iy: 1.0, iz: 1.0, dyz: 1.0, h: 1.0, k: 1.0, j: 1.0 });
domain.createMaterial(1, { e: 1.0, g: 1.0, alpha: 1.0, d: 1.0 });
solver.loadCases[0].createBeamElementUniformEdgeLoad(1,[1, 2], false);
console.log(domain);

//console.log(domain.elements.get(1));
solver.solve();
console.log("LC0: element 1 end displ : ", (<Beam2D>domain.elements.get(1)).computeEndDisplacement(solver.loadCases[0]));
console.log("LC0: element 1 end forces: ", (<Beam2D>domain.elements.get(1)).computeEndForces(solver.loadCases[0]));
console.log("LC0: element 1 N:", (<Beam2D>domain.elements.get(1)).computeNormalForce(solver.loadCases[0],10));
console.log("LC0: element 1 V:", (<Beam2D>domain.elements.get(1)).computeShearForce(solver.loadCases[0],10));
console.log("LC0: element 1 M:", (<Beam2D>domain.elements.get(1)).computeBendingMoment(solver.loadCases[0],10));

