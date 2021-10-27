
import {Node, Beam2D, CrossSection, Material, DofID, Domain, Solver, NodalLoad, LoadCase, LinearStaticSolver, EigenValueDynamicSolver} from '../src/fem';
import { create, all, MathArray } from 'mathjs'

import * as fs from 'fs';

const config = { }
const math = create(all, config)

let solver = new EigenValueDynamicSolver()
let domain = solver.domain;

const steps = 2;
const len = 2.0;
const step = len / steps;

domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);

for (let i = 1; i <= steps; i++) {
    if(i === steps)
        domain.createNode(i + 1, [i * step, 0, 0], [DofID.Dx, DofID.Dz]);
    else
        domain.createNode(i + 1, [i * step, 0, 0], [DofID.Dx]);
}


for (let i = 0; i < steps; i++) {
    domain.createBeam2D(i + 1, [i + 1, i + 2], 1, 1);
}

domain.createCrossSection(1, { a: 53.8e-4, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 999999, j: 99999.0 });
domain.createMaterial(1, { e: 210000e6, g: 210000e6/(2*(1+0.2)), alpha: 1.0, d: 42.2/53.8e-4 /*kg/m3!!!*/ });

//solver.loadCases[0].createNodalLoad(31, {[DofID.Dx]:0,[DofID.Dz]:30000, [DofID.Ry]:0});

//console.log(domain);

//console.log(domain.elements.get(1));
//solver.solve();
//console.log("LC0: element 1 end forces: ", (<Beam2D>domain.elements.get(4)).computeEndDisplacement(solver.loadCases[0]));

//console.log(domain.elements.get(1).computeStiffness());
//console.log(domain.elements.get(1).computeMassMatrix());

solver.n = 20;
solver.solve();

//console.log("LC0: element 1 end forces: ", (<Beam2D>domain.elements.get(8)).computeGlobalEigenMode(solver.loadCases[0], 0, 20));

let fileString = "";
let file = `vk_steps_${steps-1}-diag.csv`;

for(let i = 1; i <= steps; i++) {
    for(let j = 0; j < (<Beam2D>domain.elements.get(i)).computeGlobalEigenMode(solver.loadCases[0], 0, 10).u.length; j ++) {
        for(let e = 0; e < solver.loadCases[0].eigenNumbers.length; e++) {
            const eigv = (<Beam2D>domain.elements.get(i)).computeGlobalEigenMode(solver.loadCases[0], e, 10);
        
            if(e == 0) {
                const x = len / steps / (eigv.u.length-1) * j + (i-1)*len / steps;
                fileString += `${new String(x).replace('.', ',')};`;
            }

            fileString += `${new String(eigv.w[j]).replace('.', ',')};`;

            if(e == solver.loadCases[0].eigenNumbers.length -1) fileString += '\r\n';
        }
    }
}

fileString

fs.writeFileSync(file, fileString, 'utf8')