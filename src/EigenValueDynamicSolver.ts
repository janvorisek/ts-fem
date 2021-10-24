import { create, all, MathArray } from 'mathjs'

const config = { }
const math = create(all, config)

import { Domain, LoadCase, DofID, Solver } from "./fem";

/**
 * Class representing eigen value solver for the structural dynamic problems
 */
 export class EigenValueDynamicSolver extends Solver {
    constructor() {
        super();
    }

    assemble () {
        this.k = math.zeros(this.neq+this.pneq, this.neq+this.pneq);
        this.m = math.zeros(this.neq+this.pneq, this.neq+this.pneq);

        this.loadCases[0
        
        ].r = math.zeros(this.neq+this.pneq);
        this.loadCases[0].eigenVectors = [];
        this.loadCases[0].eigenNumbers = [];
        
        // assemble stifness matrix
        for (let [num, el] of this.domain.elements) {
            let estiff = el.computeStiffness();
            let emass = el.computeMassMatrix();
            let loc = el.getLocationArray() as [];
            let ndofs = math.size(loc)[0];
  
            for (let r = 0; r< ndofs; r++) {
                let rc = loc[r];
                for (let c = 0; c< ndofs; c++) {
                    let cc = loc[c];
                    this.k.set([rc,cc],  this.k.get([rc,cc])+estiff.get([r,c]));
                    this.m.set([rc,cc],  this.m.get([rc,cc])+emass.get([r,c]));
                }
            }
        }
    }
    
    solve() {
        const startime = new Date();
        if (!this.codeNumberGenerated) {
            this.generateCodeNumbers();
        }

        let unknowns = math.range(0, this.neq);
        this.assemble();

        const kk = math.subset((this.k), math.index(unknowns, unknowns)) as math.Matrix;
        const mm = math.subset((this.m), math.index(unknowns, unknowns)) as math.Matrix;
        const mkinv = math.multiply(math.inv(kk), mm);

        const evs = [];

        for(let i =0; i < this.neq; i++) {
            let tol = 1e-6;
            let rho = 0;
            let newrho = 999;

            let x = math.ones(this.neq) as math.Matrix;
            
            while(Math.abs(newrho-rho)/newrho > tol) {
                rho = newrho;

                const newx =  math.squeeze(math.multiply(mkinv, x)) as math.Matrix;
                const divisor = (math.multiply(math.multiply(math.transpose(newx), mm),newx) as math.Matrix) as unknown as number;
                newrho = (math.multiply(math.multiply(math.transpose(newx), mm),x) as math.Matrix) as unknown as number / divisor;
                
                // normovani
                x = math.divide(newx, Math.sqrt(divisor)) as math.Matrix;

                let dx = math.zeros(this.neq) as math.Matrix;
                for(let j =0; j < this.loadCases[0].eigenNumbers.length; j++) {
                    const c = math.multiply(math.multiply(math.transpose(evs[j]), mm), x) as unknown as number;
                    dx = math.add(dx, math.multiply(c, evs[j])) as math.Matrix;
                }
                x = math.subtract(x, dx) as math.Matrix;
            }

            console.log(`omega=${Math.sqrt(newrho)}, f=${Math.sqrt(newrho)/(2*Math.PI)}`)
            x = math.squeeze(x)
            evs.push(x)
            
            this.loadCases[0].eigenNumbers.push(Math.sqrt(newrho));
            let fullvec = math.zeros(this.neq + this.pneq);
            fullvec = math.subset(fullvec, math.index(math.range(0, this.neq)), x) as math.Matrix;
            this.loadCases[0].eigenVectors.push(fullvec);

        }
        
        const endtime = new Date();
        let timediff = (endtime.getTime()-startime.getTime())/1000;
        console.log("Solution took ", Math.round(timediff*100)/100, " [sec]");
    }
}
