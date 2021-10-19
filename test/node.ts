import { expect } from 'chai';
import {Node, DofID, Domain, Solver} from '../src/fem';
import {checkArray, checkMtrx} from './util'

var solver = new Solver();
var domain = solver.domain;

describe("Node", () => {
    it ('Default Constructor', () => {
        const n = new Node(1, domain);
        expect(n.label).to.equal(1);
        expect(n.coords).to.eql([0,0,0]);
        expect(n.bcs).to.be.empty;
    });
    it ('Constructor', () => {
        const n = new Node(2, domain, [1.,2.,3.3], [DofID.Dx,DofID.Rx]);
        expect(n.label).to.equal(2);
        expect(n.coords).to.eql([1.,2.,3.3]);
        expect(n.bcs.has(DofID.Dx)).to.be.true;
        expect(n.bcs.has(DofID.Dy)).to.be.false;
        expect(n.bcs.has(DofID.Dz)).to.be.false;
        expect(n.bcs.has(DofID.Rx)).to.be.true;


    });
    it ('change', () => {
        let n = new Node(3, domain);
        n.change(4, [1.,2.,3.3], [DofID.Dx]);
        expect(n.label).to.equal(4);
        expect(n.coords).to.eql([1.,2.,3.3]);
        expect(n.bcs.has(DofID.Dx)).to.be.true;
        expect(n.bcs.has(DofID.Dy)).to.be.false;
        expect(n.bcs.has(DofID.Dz)).to.be.false;

    });
    it ('change2', function () {
        let n = new Node(3, domain);
        n.change2({label:44});
        expect(n.label).to.equal(44);
        expect(n.coords).to.eql([0,0,0]);
        expect(n.bcs).to.be.empty;
        expect(n.lcs).to.be.undefined;
        n.change2({coords:[2,3,4]});
        expect(n.label).to.equal(44);
        expect(n.coords).to.eql([2,3,4]);
        expect(n.bcs).to.be.empty;
        expect(n.lcs).to.be.undefined;
    })
    it ('updateLcs', function () {
        let n = new Node(3, domain);
        n.updateLcs({locx:[4, 3, 0], locy:[-3, 4, 0]});
        checkArray(n.lcs[0], [4/5, 3/5, 0], 1.e-6);
        checkArray(n.lcs[1], [-3/5, 4/5, 0], 1.e-6);
        checkArray(n.lcs[2], [0,0,1], 1.e-6);
    })
    it ('getTransformationMtrx', function () {
        let n = new Node(2, domain);
        let t = n.getTransformationMtrx([DofID.Dx, DofID.Dy, DofID.Dz]) as math.Matrix;
        checkMtrx(t, [[1,0,0], [0,1,0], [0,0,1]], 1.e-6);
        t = n.getTransformationMtrx([DofID.Rx, DofID.Ry, DofID.Rz]) as math.Matrix;
        checkMtrx(t, [[1,0,0], [0,1,0], [0,0,1]], 1.e-6);
        // custom lcs
        n.updateLcs({locx:[4, 0, 3], locy:[0, 1, 0]});
        t = n.getTransformationMtrx([DofID.Dx, DofID.Dz, DofID.Ry]) as math.Matrix;
        //console.log('nt', t);
        checkMtrx(t, [[4/5,-3/5,0], [3/5,4/5,0], [0,0,1]], 1.e-6);
        // custom lcs 2
        n.updateLcs({locx:[4, 0, 3], locy:[0, 1, 0]});
        t = n.getTransformationMtrx([DofID.Rx, DofID.Ry, DofID.Rz]) as math.Matrix;
        checkMtrx(t, [[4/5,0,-3/5], [0,1,0], [3/5,0,4/5]], 1.e-6);
       
        
    })
    it ('hasLcs', function() {
        let n = new Node(2, domain);
        expect(n.hasLcs()).to.be.false;
        n.updateLcs({locx:[4, 3, 0], locy:[-3, 4, 0]});
        expect(n.hasLcs()).to.be.true;
        n.updateLcs();
        expect(n.hasLcs()).to.be.false;
    })
});
