import { create, all, MathArray } from 'mathjs'

const config = { }
const math = create(all, config)

import { Domain, LoadCase, DofID, Solver } from "./fem";

/**
 * Class representing eigen value solver for the structural dynamic problems
 */
 export class EigenValueDynamicSolver extends Solver {
    n = 10;
    
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

        const endtime1 = new Date();
        const kinv = math.inv(kk);
        const mkinv = math.multiply(kinv, mm);
        let timediff2 = (endtime1.getTime()-startime.getTime())/1000;
        console.log("Matrix inverse took ", Math.round(timediff2*100)/100, " [sec]");

        const evs = [];

        for(let i =0; i < Math.min(this.n, this.neq); i++) {
            let tol = 1e-6;
            let nits = 0;
            let rho = 0;
            let newrho = 1e32;

            let x = math.ones(this.neq) as math.Matrix;
            x = math.divide(x, Math.sqrt((math.multiply(math.multiply(math.transpose(x), mm),x) as math.Matrix) as unknown as number)) as math.Matrix;
            // gramm schmidt
            let dx = math.zeros(this.neq) as math.Matrix;
            for(let j =0; j < evs.length; j++) {
                const c = math.multiply(math.multiply(math.transpose(evs[j]), mm), x) as unknown as number;
                dx = math.add(dx, math.multiply(c, evs[j])) as math.Matrix;
            }
            x = math.subtract(x, dx) as math.Matrix;

            while(Math.abs(newrho-rho)/newrho > tol && nits < 100) {
                rho = newrho;

                const newx =  math.squeeze(math.multiply(mkinv, x)) as math.Matrix;
                const divisor = (math.multiply(math.multiply(math.transpose(newx), mm),newx) as math.Matrix) as unknown as number;
                newrho = (math.multiply(math.multiply(math.transpose(newx), mm),x) as math.Matrix) as unknown as number / divisor;
                
                // normovani
                x = math.divide(newx, Math.sqrt(divisor)) as math.Matrix;

                // gramm schmidt
                let dx = math.zeros(this.neq) as math.Matrix;
                for(let j =0; j < evs.length; j++) {
                    const c = math.multiply(math.multiply(math.transpose(evs[j]), mm), x) as unknown as number;
                    dx = math.add(dx, math.multiply(c, evs[j])) as math.Matrix;
                }
                x = math.subtract(x, dx) as math.Matrix;
                
                nits++;
                //console.log(newrho)
            }

            //console.log(`omega=${Math.sqrt(newrho)}, f=${Math.sqrt(newrho)/(2*Math.PI)}`)
            //console.log(x)
            x = math.squeeze(x)
            evs.push(x)
            
            this.loadCases[0].eigenNumbers.push(newrho);
            let fullvec = math.zeros(this.neq + this.pneq);
            fullvec = math.subset(fullvec, math.index(math.range(0, this.neq)), x) as math.Matrix;
            this.loadCases[0].eigenVectors.push(fullvec);
        }

        const indices = Array.from(this.loadCases[0].eigenNumbers.keys())
        indices.sort( (a,b) => this.loadCases[0].eigenNumbers[a] - this.loadCases[0].eigenNumbers[b] )
        this.loadCases[0].eigenNumbers = indices.map(i => this.loadCases[0].eigenNumbers[i]),
        this.loadCases[0].eigenVectors = indices.map(i => this.loadCases[0].eigenVectors[i])

        for(let i of this.loadCases[0].eigenNumbers) {
            console.log(`omega=${Math.sqrt(i)}, f=${Math.sqrt(i)/(2*Math.PI)}`)
        }

        const endtime = new Date();
        let timediff = (endtime.getTime()-startime.getTime())/1000;
        console.log("Solution took ", Math.round(timediff*100)/100, " [sec]");
    }
}
