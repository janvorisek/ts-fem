import {Node, Beam2D, CrossSection, Material, DofID, Domain, Solver, NodalLoad, LoadCase, BeamElementUniformEdgeLoad} from '../src/fem';
import { create, all, MathArray } from 'mathjs'
import { doesNotMatch } from 'assert';

const config = { }
const math = create(all, config)

const { createCanvas, loadImage, Image, drawImage } = require('canvas')
let canvasSize = 250;
const canvas = createCanvas(canvasSize, canvasSize);
const ctx = canvas.getContext('2d')


let minx, minz, maxx, maxz; // draving coords
let scale; // conversion scale between dravinf and canvas coords
let ox, oz; // drawing origin in drawing coords

function drawLine (x1,z1, x2, z2) {// draws a line
    ctx.beginPath();
    ctx.moveTo ((x1-ox)*scale,(z1-oz)*scale);
    ctx.lineTo ((x2-ox)*scale,(z2-oz)*scale);
    ctx.closePath();
    ctx.stroke();

}

export function setupCanvas(domain:Domain) {
    // get min max coordinates to auto scale
    let init = false;
    for (let [num, node] of domain.nodes) {
        if (init) {
            minx = math.min(minx, node.coords[0]);
            maxx = math.max(maxx, node.coords[0]);
            minz = math.min(minz, node.coords[2]);
            maxz = math.max(maxz, node.coords[2]);
        } else {
            maxx = minx = node.coords[0];
            maxz = minz = node.coords[2];
            init=true;
        }
    }

    console.log("Draw: minx, maxx, minz, maxz", minx, maxx, minz, maxz);
    scale = math.min(((canvasSize-40)/(1.2*(maxx-minx))), ((canvasSize-40)/(1.2*(maxz-minz))));
    let offset = 20/scale;
    ox = minx-offset;
    oz = minz-offset;
    //console.log("ox, oz, scale:", ox, oz, scale);
}

export function drawGeometry (domain:Domain) {

    for (let [num, el] of domain.elements) {
        let n1 = domain.getNode(el.nodes[0]);
        let n2 = domain.getNode(el.nodes[1]);
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        drawLine (n1.coords[0], n1.coords[2], n2.coords[0], n2.coords[2]);
     
        ctx.font = '10px Impact';
        let mx = 0.5*(n1.coords[0]+n2.coords[0]);
        let mz = 0.5*(n1.coords[2]+n2.coords[2]);
        ctx.fillText(num, (mx-ox)*scale, (mz-oz)*scale);
    }
}

export function drawDeformedGeometry (lc: LoadCase, domain:Domain, scale:number) {
    let nseg = 20;
    for (let [num, el] of domain.elements) {
        let n1 = domain.getNode(el.nodes[0]);
        let n2 = domain.getNode(el.nodes[1]);
        //console.log("El ", num, n1, n2);
        let def = (<Beam2D>el).computeGlobalDefl(lc, nseg);
        //console.log("DEf:", def);
        let geo = el.computeGeo();
        let cos = geo.dx/geo.l;
        let sin = geo.dz/geo.l;
        for (let s=0; s<nseg; s++) {
            let xc = n1.coords[0]+cos*geo.l*s/nseg;
            let zc = n1.coords[2]+sin*geo.l*s/nseg;
            let xc1 = n1.coords[0]+cos*geo.l*(s+1)/nseg;
            let zc1 = n1.coords[2]+sin*geo.l*(s+1)/nseg;

            //console.log(xc,zc,xc1,zc1);
            ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
            drawLine(xc+def.u[s]*scale, zc+def.w[s]*scale, xc1+def.u[s+1]*scale, zc1+def.w[s+1]*scale);

        }
    }
}

export function drawVariable (lc: LoadCase, domain:Domain, variable:string) {
    let nseg = 20;
    // 
    let elvars = [];
    var maxvv = 0.0;
    for (let [num, el] of domain.elements) {
        let vv = {};
        if (variable=="N") {
            vv = (<Beam2D>el).computeNormalForce(lc, nseg);
        } else if (variable=="V") {
            vv = (<Beam2D>el).computeShearForce(lc, nseg);
        } else if (variable=="M") {
            vv = (<Beam2D>el).computeBendingMoment(lc, nseg);
        }
        elvars.push(vv);
        //console.log(variable,":", vv[variable]);
        var maxvv = Math.max(maxvv, Math.max(...vv[variable].map(a => Math.abs(a))));
        var vvscale = (0.1*math.max(maxx-minx, maxz-minz))/maxvv;
    }
    console.log(variable, "_max:", maxvv, "scale:", vvscale);
    
    ctx.font = '10px Impact';
    ctx.fillText(variable, 0, 10);
    let ei = 0;
    for (let [num, el] of domain.elements) {
        let n1 = domain.getNode(el.nodes[0]);
        let n2 = domain.getNode(el.nodes[1]);
        //console.log("El ", num, n1, n2);
        let vv = elvars[ei++];
        
        let geo = el.computeGeo();
        let cos = geo.dx/geo.l;
        let sin = geo.dz/geo.l;
        var max = vv[variable][0];
        var min = vv[variable][0];
        var maxs = 0; var mins = 0;

        // determine min, max value and its position
        for (let iseg=0; iseg<=nseg; iseg++) {
            if (vv[variable][iseg] > max) {
                max = vv[variable][iseg];
                maxs = iseg;
            } 
            if (vv[variable][iseg] < min) {
                min = vv[variable][iseg];
                mins = iseg;
            } 
        }

        for (let s=0; s<nseg; s++) {
            ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
            let xc = n1.coords[0]+cos*geo.l*s/nseg - vv[variable][s]*sin*vvscale;
            let zc = n1.coords[2]+sin*geo.l*s/nseg + vv[variable][s]*cos*vvscale;
            let xc1 = n1.coords[0]+cos*geo.l*(s+1)/nseg - vv[variable][s+1]*sin*vvscale;
            let zc1 = n1.coords[2]+sin*geo.l*(s+1)/nseg + vv[variable][s+1]*cos*vvscale;

            drawLine(xc, zc, xc1, zc1);
            if (s==0) {
                drawLine(n1.coords[0],n1.coords[2], xc,zc );
            } else if (s == nseg-1) {
                drawLine(xc1,zc1, n2.coords[0], n2.coords[2]);
            }
  

        }
        // anotate min value
        if ((Math.abs(min) > 1.e-3)) {
            //console.log('element ', num, 'mins ', mins, 'min ',min.toPrecision(3));
            ctx.font = '6px Impact';
            let mx = n1.coords[0]+cos*geo.l*mins/nseg - vv[variable][mins]*sin*vvscale;
            let mz = n1.coords[2]+sin*geo.l*mins/nseg + vv[variable][mins]*cos*vvscale;
            ctx.fillText(min.toPrecision(3), (mx-ox)*scale, (mz-oz)*scale);
            //console.log((mx-ox)*scale, (mz-oz)*scale);
        } 
        // anotate max value
        if ((Math.abs(max) > 1.e-3) && (Math.abs(max-min)> 1.e-3)) {
            ctx.font = '6px Impact';
            let mx = n1.coords[0]+cos*geo.l*maxs/nseg - vv[variable][maxs]*sin*vvscale;
            let mz = n1.coords[2]+sin*geo.l*maxs/nseg + vv[variable][maxs]*cos*vvscale;
            ctx.fillText(max.toPrecision(3), (mx-ox)*scale, (mz-oz)*scale);
        } 

    }

}

export function clearCanvas () {
    ctx.clearRect (0,0,canvas.width, canvas.height);
}
export function exportDrawingtoURL (fs) {
    fs.write('<img src="' + canvas.toDataURL() + '" />');
}
