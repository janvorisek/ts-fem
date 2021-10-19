
import {Node, Beam2D, CrossSection, Material, DofID, Domain, Solver, NodalLoad, LoadCase, BeamElementUniformEdgeLoad} from '../src/fem';
import { create, all, MathArray } from 'mathjs'
import {exportDrawingtoURL, setupCanvas, drawGeometry, drawDeformedGeometry, clearCanvas, drawVariable} from './simpledraw'

const config = { }
const math = create(all, config)

const fs = require('fs');

var solver = new Solver();
let domain = solver.domain;
domain.createNode(1, [0,0,0], [DofID.Dx,DofID.Dz,DofID.Ry]);
domain.createNode(10, [0,0,-2]);
domain.createNode(20, [2,0,-2]);
domain.createNode(2,  [2,0,0], [DofID.Dx,DofID.Dz,DofID.Ry]);

domain.createBeam2D(1,[1,10],1,1, [false, false]);
domain.createBeam2D(2,[10,20],1,1);
domain.createBeam2D(3,[20,2],1,1);

domain.createCrossSection(1, { a: 1.0, iy: 1.0, iz: 1.0, dyz: 1.0, h: 1.0, k: 1.0, j: 1.0 });
domain.createMaterial(1, { e: 1.0, g: 1.0, alpha: 1.0, d: 1.0 });
solver.loadCases[0].createBeamElementUniformEdgeLoad(1,[1, 0], false);
//solver.loadCases.push(new LoadCase("LC2"));
console.log(domain);

//console.log(domain.elements.get(1));
solver.solve();

var stream = fs.createWriteStream("plot.html");
stream.once('open', function(fd) {
    setupCanvas(domain);
    drawGeometry(domain);
    drawDeformedGeometry(solver.loadCases[0], domain, 0.1);
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
