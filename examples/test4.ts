
import {Node, Beam2D, CrossSection, Material, DofID, Domain, Solver, NodalLoad, LoadCase, BeamElementUniformEdgeLoad} from '../src/fem';
import { create, all, MathArray } from 'mathjs'
import {exportDrawingtoURL, setupCanvas, drawGeometry, drawDeformedGeometry, clearCanvas, drawVariable} from './simpledraw'

const config = { }
const math = create(all, config)

const fs = require('fs');
var solver = new Solver();
let domain = solver.domain;

domain.createNode(1, [0,0,3], [DofID.Dx, DofID.Dz]);
domain.createNode(2, [0,0,0]);
domain.createNode(3, [2,0,0]);
domain.createNode(4, [4,0,0], [DofID.Dz]);
domain.getNode(4).updateLcs({locx:[0.866025, 0.0, -0.5], locy:[0.0, 1.0, 0.0]});

domain.createBeam2D(1,[1,2],1,1);
domain.createBeam2D(2,[2,3],1,1);
domain.createBeam2D(3,[3,4],1,1);

 
domain.createCrossSection(1, { a: 1.0e3, iy: 0.0026244, iz: 1.0, dyz: 1.0, h: 1.0, k: 1.0e18, j: 1.0 });
domain.createMaterial(1, { e: 25.0e6, g: 1.0, alpha: 1.2e-5, d: 1.0 });
solver.loadCases[0].createNodalLoad(3, {[DofID.Dx]:0,[DofID.Dz]:10, [DofID.Ry]:0});
//console.log(domain);

//console.log(domain.elements.get(1));
solver.solve();

console.log("REACTIONS:");
console.log("R1:", domain.getNode(1).getReactions(solver.loadCases[0]));
console.log("R4:", domain.getNode(4).getReactions(solver.loadCases[0]));
console.log("R1g:", domain.getNode(1).getReactions(solver.loadCases[0], true));
console.log("R4g:", domain.getNode(4).getReactions(solver.loadCases[0], true));
console.log("R2:", domain.getNode(2).getReactions(solver.loadCases[0], true));



var stream = fs.createWriteStream("plot.html");
stream.once('open', function(fd) {
    setupCanvas(domain);
    drawGeometry(domain);
    drawDeformedGeometry(solver.loadCases[0], domain, 2000.);
    exportDrawingtoURL(stream);
    clearCanvas();
    drawGeometry(domain);
    drawVariable(solver.loadCases[0], domain, 'N');
    exportDrawingtoURL(stream);
    clearCanvas();
    drawGeometry(domain);
    drawVariable(solver.loadCases[0], domain, 'V');
    exportDrawingtoURL(stream);
    clearCanvas();
    drawGeometry(domain);
    drawVariable(solver.loadCases[0], domain, 'M');
    exportDrawingtoURL(stream);
    stream.end();
});
