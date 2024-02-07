# fem.ts

Typescript finite element module. 

## Available analyses
* Linear elastic with multiple load cases

## Supported elements

## Boundary conditions
* Concentrated nodal load
* Uniform distributed force load 
* Prescribed displacements   

## Getting started
```ts
import {Beam2D, Material, CrossSection, Domain, DofID, Node, Element, Solver, BeamElementUniformEdgeLoad} from '../src/fem';
// Setup model of cantilever beam (in xz plane)
let solver = new Solver();
let domain = solver.domain;
domain.createNode(1, [0,0,0], [DofID.Dx, DofID.Dz,DofID.Ry]); // clamped node
domain.createNode(5, [3,0,0] ); // free node
domain.createBeam2D(10, [1,5], 1, 1); 
domain.createCrossSection(1, { a: 0.06, iy: 0.00045, iz: 0.00025, dyz: 0.0001, h: 0.3, k: 0.8333, j: 0.0007 });
domain.createMaterial(1, { e: 3.e7, g: 1.e7, alpha: 1.2e-5, d: 2.5e3 });
solver.loadCases[0].createBeamElementUniformEdgeLoad(10, [1,1], false);
solver.solve();
// print some results
console.log("Node 1 displacements: ", domain.nodes.get(1).getUnknowns(solver.loadCases[0], [DofID.Dx, DofID.Dz, DofID.Ry]));
console.log("Node 5 displacements: ", domain.nodes.get(5).getUnknowns(solver.loadCases[0], [DofID.Dx, DofID.Dz, DofID.Ry]));
console.log("Element 1 end forces: ", (<Beam2D>domain.elements.get(10)).computeEndForces(solver.loadCases[0]));
console.log("Reactions in node 1:", domain.getNode(1).getReactions(solver.loadCases[0]));
```


## Author
Bořek Patzák (borek.patzak@gmail.com)
 

