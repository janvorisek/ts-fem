
import {Node, Beam2D, CrossSection, Material, DofID, Domain, Solver, NodalLoad, LoadCase} from '../src/fem';
import { create, all, MathArray } from 'mathjs'

const config = { }
const math = create(all, config)

let solver = new Solver();
let domain = solver.domain;
domain.createNode(1, [0,0,0], [DofID.Dx, DofID.Dz, DofID.Ry]);
domain.createNode(25, [2,0,0], []);

domain.createBeam2D(1,[1,25],1,1);
domain.createCrossSection(1, { a: 1.0, iy: 1.0, iz: 1.0, dyz: 1.0, h: 1.0, k: 1.0, j: 1.0 });
domain.createMaterial(1, { e: 1.0, g: 1.0, alpha: 1.0, d: 1.0 });
solver.loadCases[0].createNodalLoad(25, {[DofID.Dx]:1,[DofID.Dz]:2, [DofID.Ry]:3});
console.log(domain);

//console.log(domain.elements.get(1));
solver.solve();
console.log("LC0: element 1 end forces: ", (<Beam2D>domain.elements.get(1)).computeEndForces(solver.loadCases[0]));


