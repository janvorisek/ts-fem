import { create, all, MathArray } from 'mathjs'

const config = { }
const math = create(all, config)


/**
 * Enum to define physical meaning of degrees of freedom (DOFs)
 */
export enum DofID {
    Dx = 0, // Displacement in x direction
    Dy = 1, // Displacement in y direction
    Dz = 2, // Displacement in z direction
    Rx = 3, // Rotation around x axis
    Ry = 4, // Rotation around y axis
    Rz = 5  // Rotation around z axis
};

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]?: U;
};

type EnumSet<T> = Set<T>;

export interface MaterialParameters {
    e?: number;
    g?: number;
    alpha?: number;
    d?: number;
}

interface MaterialChangeParameters extends MaterialParameters {
    label?: string;
}

const MaterialParametersDefaults = {e: 1.0, g: 1.0, alpha: 1.0, d: 1.0};

/**
 * A class representing linear elastic material
 */
export class Material {
   
    label: number; //  label
    e: number; // Young's modulus [Pa]
    g: number; // Shear modulus [Pa]
    alpha: number; // thermal dillatation coefficient [K-1]
    d : number; // mass density [kg/m3]

    /**
     * @param  label int label of receiver
     * @param  e Young's modulus of receiver [Pa]
     * @param g  Shear modulus of receiver [Pa]
     * @param alpha thermal dillatation coefficient [K-1]
     * @param d mass density of receiver [kg/m3]
     */
    constructor (label: number, params: MaterialParameters = {}) {
        // Compulsory parameters
        this.label = label;

        // Optional parameters
        params = { ...MaterialParametersDefaults, ...params }
        this.e = params.e;
        this.g = params.g;
        this.alpha = params.alpha;
        this.d = params.d;
    }

    /**
     * Change receiver properties
     * @param  e Young's modulus of receiver [Pa]
     * @param g  Shear modulus of receiver [Pa]
     * @param alpha thermal dillatation coefficient [K-1]
     * @param d mass density of receiver [kg/m3]
     */
    change (params: MaterialChangeParameters) {
        if(params.e !== undefined) this.e = params.e;
        if(params.g !== undefined) this.g = params.g;
        if(params.alpha !== undefined) this.alpha = params.alpha;
        if(params.d !== undefined) this.d = params.d;
    }
 }

 // TODO: All parameters are optional now
export interface CrossSectionParameters {
    a?:number;
    iy?:number;
    iz?:number;
    dyz?:number;
    h?:number;
    k?:number;
    j?:number;
}

interface CrossSectionChangeParameters extends CrossSectionParameters {
    label?: string;
}

// TODO: no defaults specified, is that correct?
const CrossSectionParametersDefaults = {};

 /** A class representing beam cross section
 */
export class CrossSection {
    label:number; // label of receiver
    a:number; // cross section area of receiver [m2]. > 0.0
    iy:number; // area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
    iz:number; // area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
    dyz:number; // product moment of area with respect to yz axes [m4]
    h:number; // height of receiver [m]
    k:number; // Timoshenko's shear coefficient [-]
    j:number; // torsional stiffness moment [m4]

    /**
    * Constructor
    * @param label string label of receiver
    * @param a cross section area of receiver [m2]. > 0.0
    * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
    * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
    * @param dyz product moment of area with respect to yz axes [m4]
    * @param h height of receiver [m]
    * @param k Timoshenko's shear coefficient [-]
    * @param j torsional stiffness moment [m4]
    */
    constructor (label:number, params: CrossSectionParameters = {}) {
        // Compulsory parameters 
        this.label = label;
        
        // Optional parameters
        params = { ...CrossSectionParametersDefaults, ...params }
        this.a = params.a;
        this.iy = params.iy;
        this.iz = params.iz;
        this.dyz = params.dyz;
        this.h = params.h;
        this.k = params.k;
        this.j = params.j;
    }

    /**
    * Change receiver properties
    * @param a cross section area of receiver [m2]. > 0.0
    * @param iy area moment of inertia (second moment of area) with respect to y axis [m4]. > 0.0
    * @param iz area moment of inertia (second moment of area) with respect to z axis [m4]. > 0.0
    * @param dyz product moment of area with respect to yz axes [m4]
    * @param h height of receiver [m]
    * @param k Timoshenko's shear coefficient [-]
    * @param j torsional stiffness moment [m4]
    */
    change (params: CrossSectionChangeParameters) {
        if (params.a != undefined) this.a = params.a;
        if (params.iy != undefined) this.iy = params.iy;
        if (params.iz != undefined) this.iz = params.iz;
        if (params.dyz != undefined) this.dyz = params.dyz;
        if (params.h != undefined) this.h = params.h;
        if (params.k != undefined) this.k = params.k;
        if (params.j != undefined) this.j = params.j;
    }
}

/**
 * "A class representing a FE node
 * bcs and pDspl: x,y,z for displacement, X,Y,Z for rotations
 */
export class Node {
    label:number; // Node number
    domain:Domain; // domain reference
    coords: Array<number>; // ([float,float,float])* coordinates [m]
    //bcs: Set<DofID>; // for each DOF (identified by string id) the bc is applied 
    //Note: prescribed values to be specified via boundaryCondition class
    bcs: EnumSet<DofID>;
    //Node local coordinate system. In this c.s. boundary conditions are applied and results obtained
    /**
     * Triplet defining the local coordinate system in node.
     * Value at position (i,j) represents angle between e'(i) and e(j),
     * where e' is base vector of local coordinate system and e is
     * base vector of global c.s.
     */
    lcs: number[][];
    /**
     * Node constructor
     * @param label number
     * @param coords coordinates
     * @param bcs boundary conditions {code:string]:boolean}
     */
    constructor (label:number, domain:Domain, coords:number[]=[0,0,0], bcs: Array<DofID>=[]) {
        this.label = label;
        this.domain = domain;
        this.coords = coords; 
        this.bcs = new Set<DofID>(bcs);
        this.lcs = undefined; // means local cs is the same as global cs
    }
    /**
     * Change properties 
     * @param label new label
     * @param coords new coordinates
     * @param bcs new dictionary with applied boundary conditions
     */
    change (label:number, coords:number[], bcs: Array<DofID>=[]) {
        if (label != undefined) this.label = label;
        if (coords != undefined) this.coords = coords;
        if (bcs != undefined) this.bcs = new Set<DofID> (bcs);
    }

    change2 (params:{label?:number; coords?:number[]; bcs?: Array<DofID>; 
                     lcs?:{locx:number[], locy:number[]}
                    }) {
        if (params.label != undefined) {
            this.label = params.label;
        }
        if (params.coords != undefined) {
            this.coords = params.coords;
        }
        if (params.bcs != undefined) {
            this.bcs = new Set<DofID> (params.bcs);
        }
        if (params.lcs != undefined) {
            this.updateLcs (params.lcs);
        }
    }
    getLocationArray (dofs:Array<DofID>) {
        return this.domain.solver.getNodeLocationArray(this.label, dofs);
    }
    getUnknowns (lc:LoadCase, dofs:Array<DofID>) {
        let cn = this.getLocationArray(dofs);
        return math.subset(lc.r, math.index(cn));
    }
    /**
     * Returns receiver transformation matrix (from nodal to global c.s., ie. rg=t*r_n)
     * @param dofs dofs mask to consider
     */
    getTransformationMtrx (dofs:Array<DofID>) {
        let size=dofs.length;
        if (this.lcs == undefined) {
            return math.identity(size);
        } else {
            let ans = math.zeros([size, size]);

            for ( let i = 0; i < size; i++ ) {
                let id = dofs[i];
                // test for vector quantities
                switch ( id ) {
                case DofID.Dx:
                case DofID.Dy:
                case DofID.Dz:
                    for ( let j = 0; j < size; j++ ) {
                        let id2 = dofs[j];
                        if ( ( id2 == DofID.Dx ) || ( id2 == DofID.Dy ) || ( id2 == DofID.Dz ) ) {
                            ans[i][j] = this.lcs[id2][id];
                        }
                    }
                    break;

                case DofID.Rx:
                case DofID.Ry:
                case DofID.Rz:
                    for ( let j = 0; j < size; j++ ) {
                        let id2 = dofs[j];
                        if ( ( id2 == DofID.Rx ) || ( id2 == DofID.Ry ) || ( id2 == DofID.Rz ) ) {
                            ans[i][j] = this.lcs[id2-DofID.Rx][id-DofID.Rx];
                        }
                    }
                    break;
                default:
                    throw new TypeError("Unknown DofID: " + id);
                } // end switch
            } // end loop over dofs
            return math.matrix(ans);
        }
    }
    /**
     * Updates the reciver lcs triplet according to given lcs orientation
     * @param lcs 
     */
    updateLcs (lcs?: {locx: number[], locy:number[]}) {

        if (lcs == undefined) {
            this.lcs = undefined; // reset to default
        } else {
            this.lcs = [[0,0,0], [0,0,0], [0,0,0]];
            let e1norm = math.norm(lcs.locx) as number;
            let e2norm = math.norm(lcs.locy) as number;
            for ( let j = 0; j < 3; j++ ) { // normalize e1' e2'
                this.lcs[0][j] = lcs.locx[j] / e1norm;
                this.lcs[1][j] = lcs.locy[j] / e2norm;
            }

            // vector e3' computed from vector product of e1', e2'
            this.lcs[2][0] = this.lcs[0][1] * this.lcs[1][2] - this.lcs[0][2]*this.lcs[1][1];
            this.lcs[2][1] = this.lcs[0][2] * this.lcs[1][0] - this.lcs[0][0]*this.lcs[1][2];
            this.lcs[2][2] = this.lcs[0][0] * this.lcs[1][1] - this.lcs[0][1]*this.lcs[1][0];
        }
    }
    /** 
     * Returns true if receiver has local c.s.
     */
    hasLcs () {
        return (this.lcs != undefined); 
    }
    
    getReactions (lc:LoadCase, inGlobalCS:boolean=false) {
        console.log("type R:", typeof lc.R);
        if (inGlobalCS && this.hasLcs()) {
            let sdofs = this.domain.solver.getNodeDofIDs(this.label); // all dofs
            let cn = this.getLocationArray(sdofs); // code numbers of all DOFs
            let R:number[] = [];
            for (let i=0; i<sdofs.length; i++) {
                if (this.bcs.has(sdofs[i])) {
                    R.push(<number><any> math.subset(lc.R, math.index([cn[i]-this.domain.solver.neq]))); // math.js type maze
                } else {
                    R.push(0.0);
                }
            }
            let t = this.getTransformationMtrx (sdofs);
            return {dofs:sdofs, values: (<math.Matrix> math.multiply(t, R)).toArray()};

        } else { // results in nodal c.s.
            if (this.bcs.size > 0)  {
                let sdofs = Array.from(this.bcs); // supported dofs only
                let cn = this.getLocationArray(sdofs); // code numbers of supported DOFs
                let ccn = math.subtract(cn, this.domain.solver.neq);
                let R = math.subset(lc.R, math.index(ccn));
                if (math.typeOf(R) === 'number') {
                    return {dofs:sdofs, values: [R]};
                } else {
                    return {dofs:sdofs, values: R};
                }
            } else {
                return {dofs:[], values:[]};
            }
        }
    }


 }

/**
 * A class representing Finite Element
 */
export class Element {
    label:number; //element number
    nodes:Array<number>; // element nodes
    mat:number; // material
    cs:number;// cross section
    domain:Domain; // domain reference

    /**
     * Constructor
     * @param label new label
     * @param nodes element nodes
     * @param mat element material number 
     * @param cs element cross section number
     */
    constructor (label:number, domain:Domain, nodes:Array<number>, mat:number, cs:number) {
        this.label = label;
        this.nodes = nodes;
        this.mat = mat;
        this.cs = cs;
        this.domain = domain;

    }
    /**
     * Change receiver properties
     * @param label new label
     * @param nodes nodes
     * @param mat new material (number)
     * @param cs new cross section (number)
     */
    change (label:number, nodes:Array<number>, mat:number, cs:number) {
        if (label != undefined) this.label = label;
        if (nodes != undefined) this.nodes = nodes;
        if (mat != undefined) this.mat = mat;
        if (cs != undefined) this.cs = cs;
    }

    change2 (params:{label?:number; nodes?:number[]; mat?: number; cs?:number }) {
        if (params.label != undefined) {
            this.label = params.label;
        }
        if (params.nodes != undefined) {
            this.nodes = params.nodes;
        }
        if (params.mat != undefined) {
            this.mat = params.mat;
        }
        if (params.cs != undefined) {
            this.cs = params.cs;
        }
    }

    /**
     * Returns Material (object) associated to element
     */
    getMaterial() {
        return this.domain.getMaterial(this.mat);
    }
    /**
     * Returns Cross Section (object) associated to element
     */
    getCS() {
        return this.domain.getCS(this.cs);
    }
    /**
     * Returns array of DOFs for given node
     * @param node node id
     */
    getNodeDofs (node:number) : Array<DofID> { return [];}
    /**
     * Computes global stiffness matrix of element
     */
    computeStiffness (): any {}
    /**
     * Returns element code numbers
     */
    getLocationArray(): any {}
    /**
     * Returns object with element geometry
     */
    computeGeo():any {}
    /**
     * Returns element transformation matrix frol global to local c.s
     */
    computeT():math.Matrix {return math.matrix();}
}

/**
 * Implementation of Timoshenko beam element in 2D (xz plane)
 */
export class Beam2D extends Element {
    hinges: [boolean, boolean]; // indicates element hinges

    /**
     * Constructor
     * @param label element label (num) 
     * @param nodes element nodes
     * @param mat element material (num)
     * @param cs element cross section (num)
     * @param hinges array of two boolean values indicating if hinge is present at start or end
     */
    constructor (label:number, domain:Domain, nodes:Array<number>, mat:number, cs:number, hinges:[boolean, boolean] = [false, false]){
        super(label, domain, nodes, mat, cs);
        this.hinges = hinges;
    }

    change2 (params:{label?:number; nodes?:number[]; mat?: number; cs?:number; hinges:[boolean, boolean] }) {

        if (params.label != undefined) {
            this.label = params.label;
        }
        if (params.nodes != undefined) {
            this.nodes = params.nodes;
        }
        if (params.mat != undefined) {
            this.mat = params.mat;
        }
        if (params.cs != undefined) {
            this.cs = params.cs;
        }
        if (params.hinges !=undefined) {
            this.hinges = params.hinges;
        }
    }

    getNodeDofs (node:number) : Array<DofID> {
        return [DofID.Dx, DofID.Dz, DofID.Ry];
    }
    getLocationArray() {
        var loc = Array<number> ();
        for (let n of this.nodes) { 
            //console.log("Element ", this.label, "Node ", n, "loc:", solver.getNodeLocationArray(n, [DofID.Dx, DofID.Dz, DofID.Ry]));
            loc = loc.concat(this.domain.solver.getNodeLocationArray(n, [DofID.Dx, DofID.Dz, DofID.Ry]));
        }
        return loc;
    }
    // evaluates l, dx, dz 
    /**
     * Returns Beam2D geometry object containing l: length, dx: element projection in to x axis, dz: element projection in z axis
     */
    computeGeo() {
        var c1:Array<number> = this.domain.getNode(this.nodes[0]).coords;
        var c2:Array<number> = this.domain.getNode(this.nodes[1]).coords;
        var dx:number = c2[0]-c1[0];
        var dz:number = c2[2]-c1[2];
        var l:number = Math.sqrt(dx*dx+dz*dz);
        return {l:l, dx:dx, dz:dz};
    }
    /**
     * Returns tru if element has start or end hinge (or both)
     */
    hasHinges() {return this.hinges[0] || this.hinges[1];}
    /**
     * Computes element transformation matrix from local to global (nodal) c.s. 
     */
    computeT():math.Matrix {
        var geo = this.computeGeo();
        var c:number = geo.dx/geo.l;
        var s:number = geo.dz/geo.l;
        var t = math.matrix([[c ,s ,0., 0.,0.,0.],
            [-s,c ,0., 0.,0.,0.],
            [0.,0.,1., 0.,0.,0.],
            [0.,0.,0., c ,s ,0.],
            [0.,0.,0., -s,c ,0.],
            [0.,0.,0., 0.,0.,1.]]); // rl = t*rg;

        if (this.domain.getNode(this.nodes[0]).hasLcs() || this.domain.getNode(this.nodes[1]).hasLcs()) {
            let T_n2g = math.zeros(6); // rg = T_n2g rn
            T_n2g = math.subset(T_n2g, math.index([0,1,2], [0,1,2]), this.domain.getNode(this.nodes[0]).getTransformationMtrx(this.getNodeDofs(this.nodes[0])));
            T_n2g = math.subset(T_n2g, math.index([3,4,5], [3,4,5]), this.domain.getNode(this.nodes[1]).getTransformationMtrx(this.getNodeDofs(this.nodes[1])));
            t = math.multiply(t, T_n2g);
        }
        return t;
    }
    /**
     * Computes Beam2D local stifness matrix
     * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
     */
    computeLocalStiffnessMtrx (retCondenseSubMats:boolean=false) {
        var geo = this.computeGeo();
        var mat = this.getMaterial();
        var cs = this.getCS();
    
        var ea = mat.e*cs.a;
        var eiy = mat.e*cs.iy;
        var l = geo.l;
        var l2 = l*l;
        var l3 = l2*l;
        var fi=12.*eiy/(cs.k*mat.g*cs.a*l*l);
        var fi1=1.+fi;
        var answer=math.matrix([[ ea/l,              0.,                 0.,  -ea/l,               0.,                 0.],
                      [ 0.  ,  12.*eiy/l3/fi1,     -6.*eiy/l2/fi1,     0.,  -12.*eiy/l3/fi1,     -6.*eiy/l2/fi1],
                      [ 0.  ,  -6.*eiy/l2/fi1,  (4.+fi)*eiy/l/fi1,     0.,    6.*eiy/l2/fi1,  (2.-fi)*eiy/l/fi1],
                      [-ea/l,              0.,                 0.,   ea/l,               0.,                 0.],
                      [ 0.  , -12.*eiy/l3/fi1,      6.*eiy/l2/fi1,     0.,   12.*eiy/l3/fi1,      6.*eiy/l2/fi1],
                      [ 0.  ,  -6.*eiy/l2/fi1,  (2.-fi)*eiy/l/fi1,     0.,    6.*eiy/l2/fi1,  (4.+fi)*eiy/l/fi1]]);
        
        // static condensation if some ends are hinges
        // a=nonzero force value, b=zero force(moment) value
        if (this.hasHinges()) {
            if (this.hinges[0] && this.hinges[1]) {
                var a = [0,1,3,4];
                var b = [2,5];
            } else if (this.hinges[0]) {
                var a = [0,1,3,4,5];
                var b = [2];
            } else if (this.hinges[1]) {
                var a = [0,1,2,3,4];
                var b = [5];
            }
            var kaa = answer.subset(math.index(a, a));
            var kab = answer.subset(math.index(a, b));
            var kbb = answer.subset(math.index(b, b));
            var k2 = math.subtract(kaa, math.multiply(math.multiply(kab, math.inv(kbb)), math.transpose(kab)));
        

            let answer2 =  math.zeros(6,6);
            answer2 = math.subset(answer2,math.index(a,a), k2);

            if (retCondenseSubMats) {
                return {
                    answer:answer2,
                    a:a,
                    b:b,
                    kaa:kaa,
                    kab:kab,
                    kbb:kbb};
            } else {
                return {answer:answer2};
            }
        }   
        return {answer:answer};

    }
    /**
     * Computes local initial stress matrix
     * @param N normal force
     */
    computeLocalInitialStressMtrx (N:number) {
        var geo = this.computeGeo();
        var mat = this.getMaterial();
        var cs = this.getCS();
        var l:number = geo.l;
        var l2:number = l*l;
        var c:number = N/l;

        var fi=12.*mat.e*cs.iy/(cs.k*mat.g*cs.a*l*l);
        var fi2 = fi*fi;
        var answer=math.matrix([[0.,               0.,                             0.,  0.,              0.,                            0.],
                      [0.,   6./5.+2*fi+fi2,                         -l/10.,  0.,  -6./5-2*fi-fi2,                        -l/10.],
                      [0.,           -l/10.,  2.*l2/15.+l2*fi/6.+l2*fi2/12.,  0.,           l/10.,   -l2/30.-l2*fi/6.-l2*fi2/12.],
                      [0.,               0.,                             0.,  0.,              0.,                            0.],
                      [0.,  -6./5.-2*fi-fi2,                          l/10.,  0.,  6./5.+2*fi+fi2,                         l/10.],
                      [0.,           -l/10.,    -l2/30.-l2*fi/6.-l2*fi2/12.,  0.,            l/10., 2*l2/15.+l2*fi/6.+l2*fi2/12.]]);
        math.multiply(answer, c/(1.+fi)/(1.+fi));
        
        var cc=Math.min(Math.abs(answer[1][1]), Math.abs(answer[2][2]))/1000.0
        answer[0][0]=cc;
        answer[0][3]=-cc;
        answer[3][0]=-cc;
        answer[3][3]=cc;

        // static condensation if some ends are hinges
        // a=nonzero force value, b=zero force(moment) value
        if (this.hasHinges()) {
            var stiffrec = this.computeLocalStiffnessMtrx (true);
            var asize:number = math.size(stiffrec.a)[0];
            var t=math.zeros(6, asize);

            
            math.subset(t, math.index(stiffrec.a, math.range(0,asize)), math.identity(asize));
            //print "t:",t``
            //print (-1)*dot(linalg.inv(kbb),kab.transpose())
            //print "ti",t[ix_(b),:] 
            math.subset(t, math.index(stiffrec.b,math.range(0,asize)),math.multiply(math.multiply(math.inv(stiffrec.kbb),math.transpose(stiffrec.kab)),-1.0));
            //print "t:",t
            var k2 = math.multiply(math.transpose(t), math.multiply(answer,t));
            var answer2 = math.zeros(6,6);
            math.subset(stiffrec.a, math.index(stiffrec.a,stiffrec.a), k2);
            return answer2;
            //print answer
        }
        return answer;
    }

    /**
     * Evaluate element stiffness matrix in global c.s.
     */
    computeStiffness () {
        var geo = this.computeGeo();

        var kl = this.computeLocalStiffnessMtrx();
        var t  = this.computeT();
        var k  = math.multiply(math.multiply(math.transpose(t), kl.answer), t);
        return k;
    }

    /**
     * Evaluates initial stress matrix in global c.s.
     * @param N Element normal force
     */
    computeInitialStressMatrix (N:number) {
        var kl = this.computeLocalInitialStressMtrx(N);
        var t  = this.computeT();
        var k  = math.multiply(math.multiply(math.transpose(t), kl), t);
        return k;
    }

    /**
     * Computes element end displacement vector (in element local c.s.)
     * @param r global vector of unknowns
     */
    computeEndDisplacement (lc:LoadCase) {
        var t = this.computeT();
        var loc = this.getLocationArray();
        var rloc = math.multiply(t, math.subset(lc.r, math.index(loc)));

        if (this.hasHinges()) {
            var stiffrec = this.computeLocalStiffnessMtrx(true);
            let bl = math.zeros(6);
            for (let load of lc.getElementLoadsOnElement(this.label)) {
                bl = math.add(bl, load.getLoadVectorForClampedBeam()) as number[];
            }
            if (this.hasHinges()) {
                // re[ix_(b)] = dot(linalg.inv(kbb), -bl[ix_(b)] - dot(kab.transpose(), re[ix_(a)] ) )
                
                rloc = math.subset(rloc, math.index(stiffrec.b), 
                            math.multiply(math.inv(stiffrec.kbb), 
                                          math.multiply(math.add(math.subset(bl,math.index(stiffrec.b)),
                                                                 math.squeeze(math.multiply(math.transpose(stiffrec.kab),
                                                                                            math.subset(rloc, math.index(stiffrec.a))))),
                                                        -1.0)));
            }
        } 
        return rloc;
    }
        
    /**
     * Computes element end forces (in element local c.s.)
     * @param lc load case reference
     */
    computeEndForces (lc: LoadCase) {
        var t = this.computeT();
        var loc = this.getLocationArray();
        var re = math.multiply(t, math.subset(lc.r, math.index(loc)));

        var stiffrec = this.computeLocalStiffnessMtrx(true);
        var fe = math.multiply(stiffrec.answer, re) as math.Matrix;

        var bl = math.zeros(6) as math.Matrix;
        for (let load of lc.getElementLoadsOnElement(this.label)) {
            bl = math.add(bl, load.getLoadVectorForClampedBeam()) as math.Matrix;
        }
        if (this.hasHinges()) {
            // fe[ix_(a)] += bl[ix_(a)] - dot(dot(kab,linalg.inv(kbb)),bl[ix_(b)])
            
            let h1 =  math.multiply(stiffrec.kab, math.inv(stiffrec.kbb));
            if (stiffrec.b.length == 1) {
                let blv = bl.get(stiffrec.b);
                for (let i=0; i<stiffrec.a.length; i++ ){
                    fe.set([stiffrec.a[i]], fe.get([stiffrec.a[i]]) + bl.get([stiffrec.a[i]])-h1.get([i,0])*blv);
                }
            } else {
                var help = math.subtract(math.subset(bl, math.index(stiffrec.a)),
                                         math.multiply(h1, 
                                                       math.matrix(math.subset(bl, math.index(stiffrec.b)))));
                fe = math.subset(fe, math.index(stiffrec.a), math.subtract(math.subset(fe, math.index(stiffrec.a)), help)) as math.Matrix;
            }
        } else {
            fe = (math.add(fe, bl) as math.Matrix);
        }
        return fe;
    }
     
    /**
     * Computes nseg+1 values of local deflections
     * @param lc reference to load case
     * @param nseg deflection will be evaluated in nseg+1 points generated along the element 
     */
    computeLocalDefl(lc:LoadCase, nseg:number) {
        let rl = this.computeEndDisplacement(lc);
        let u:number[] = [];
        let w:number[] = [];
        let geo = this.computeGeo();
        let l = geo.l;

        let eloads = lc.getElementLoadsOnElement(this.label);
        for (let iseg = 0; iseg<= nseg; iseg++) {
            let xl=iseg/nseg; // [0,1]
            // components from end displacements
            let wl = (1.0-3.0*xl*xl+2.0*xl*xl*xl)*rl.get([1])+l*(-xl+2.0*xl*xl-xl*xl*xl)*rl.get([2])+(3.0*xl*xl-2.0*xl*xl*xl)*rl.get([4])+l*(xl*xl-xl*xl*xl)*rl.get([5]);
            let ul = (1.-xl)*rl.get([0])+xl*rl.get([3]);
            // add contributions of loads
            for (let load of eloads) {
                let c = load.computeBeamDeflectionContrib(xl);
                wl += c.w;
                ul += c.u;
            }
            u.push(ul);
            w.push(wl);
        }
        return {u: u, w: w};
    }
    /**
     * Computes nseg+1 values of global deflections
     * @param lc reference to load case
     * @param nseg deflection will be evaluated in nseg+1 points generated along the element 
     */
    computeGlobalDefl(lc:LoadCase, nseg:number) {
        let ld = this.computeLocalDefl(lc, nseg);
        let geo = this.computeGeo();
        var c:number = geo.dx/geo.l;
        var s:number = geo.dz/geo.l;
        let ug = [];
        let wg = [];
        for (let i=0; i<=nseg; i++) {
            ug.push(ld.u[i]*c-ld.w[i]*s);
            wg.push(ld.w[i]*c+ld.u[i]*s);
        }
        return {u:ug, w:wg};
    }


    /**
     * Computes the values of normal force along element 
     * @param lc load case reference
     * @param nseg number of points-1
     */
    computeNormalForce (lc:LoadCase, nseg: number) {
        //Computes >=nseg+1 values of local normal force, 
        //returns list of distances, values N(x) and where labels should be  plotted
        let F = this.computeEndForces(lc);
        let geo = this.computeGeo();
        let x = [];
        let N = [];

        let eloads = lc.getElementLoadsOnElement(this.label);
        for (let iseg=0; iseg<=nseg; iseg++) {
            let xi = geo.l*iseg/nseg;
            let Ni = -F.get([0]);
            // add contributions of loads
            for (let load of eloads) {
                Ni += load.computeBeamNContrib (xi);
            }
            x.push(xi);
            N.push(Ni);
        }
        return {x:x, N:N};
    }
    /**
     * Computes the values of shear force along element 
     * @param lc load case reference
     * @param nseg number of points-1
     */
    computeShearForce (lc:LoadCase, nseg: number) {
        //Computes >=nseg+1 values of local normal force, 
        //returns list of distances, values N(x) and where labels should be  plotted
        let F = this.computeEndForces(lc);
        let geo = this.computeGeo();
        let x = [];
        let V = [];

        let eloads = lc.getElementLoadsOnElement(this.label);
        for (let iseg=0; iseg<=nseg; iseg++) {
            let xi = geo.l*iseg/nseg;
            let Vi = -F.get([1]);
            // add contributions of loads
            for (let load of eloads) {
                Vi += load.computeBeamVContrib (xi);
            }
            x.push(xi);
            V.push(Vi);
        }
        return {x:x, V:V};
    }
    /**
     * Computes the values of bending moment along element 
     * @param lc load case reference
     * @param nseg number of points-1
     */
    computeBendingMoment (lc:LoadCase, nseg: number) {
        //Computes >=nseg+1 values of local bending moment, 
        //returns list of distances, values N(x) and where labels should be  plotted
        let F = this.computeEndForces(lc);
        let geo = this.computeGeo();
        let x = [];
        let M = [];

        let eloads = lc.getElementLoadsOnElement(this.label);
        for (let iseg=0; iseg<=nseg; iseg++) {
            let xi = geo.l*iseg/nseg;
            let Mi = -F.get([2])-F.get([1])*xi;
            // add contributions of loads
            for (let load of eloads) {
                Mi += load.computeBeamMContrib (xi);
            }
            x.push(xi);
            M.push(Mi);
        }
        return {x:x, M:M};
    }

}

/**
 * Abstract class representing all loads
 */
export class Load {
    target: number; // component number the target is applied
    domain: Domain;
    /**
     * Returns load vector for clamped beam
     * @param elem element number
     */
    constructor (target: number, domain: Domain) {
        this.target = target;
        this.domain = domain;
    }
    
    /**
     * Evaluates the contribution to the load vector 
     */
    getLoadVector(): number[] {
        return [];
    }
    /**
     * Returns load code numbers
     */
    getLocationArray () :number[] {return [];}
}
/**
 * Implementation of concentrated nodal load
 */
export class NodalLoad extends Load {

    values: EnumDictionary<DofID, number>;

    constructor (node: number, domain: Domain, values:EnumDictionary<DofID, number>={}) {
        super(node, domain);
        this.values = values;
    }
    change (node:number, values:EnumDictionary<DofID, number>) {
        this.target = node;
        this.values = values;
    }
    getLoadVector(): number[] {
        var dofs = this.domain.solver.getNodeDofIDs(this.target);
        var ans = Array<number>();
        for (let idof of dofs) {
            if (idof in this.values) {
                ans.push(this.values[idof]);
            } else {
                ans.push(0.0);
            }
        }
        return ans;
    }
    getLocationArray () :number[] {
        return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
    }
}

/**
 * Abstract class for Beam elements extending the basic Load class to evaluate load contribution to 
 * exact displacement and internal forces.
 */
export class BeamElementLoad extends Load {
    getLoadVectorForClampedBeam() : Array<number> {return [];}
    computeBeamDeflectionContrib (xl: number) :{u:number, w:number} {return{u:0, w:0}};
    computeBeamNContrib(x:number):number {return 0};
    computeBeamVContrib(x:number):number {return 0};
    computeBeamMContrib(x:number):number {return 0};
}

/**
 * Implementation of Beam2d uniform load 
 */
export class BeamElementUniformEdgeLoad extends BeamElementLoad {
    values: number[]; // fx, fz intensities
    lcs: boolean; // true if values in element local c.s (along length)
    constructor (elem: number, domain: Domain, values:number[], lcs: boolean) {
        super(elem, domain);
        this.values = values;
        this.lcs = lcs;
    }
    change (elem:number, values:number[], lcs: boolean) {
        this.target = elem;
        this.values = values;
        this.lcs = lcs;
    }
    getGlobalIntensities() {
        let fx = this.values[0]; // intensity in x-local
        let fz = this.values[1]; // intensity in z-local
        if (this.lcs) {
            // transrform intensities to global
            let geo = this.domain.elements.get(this.target).computeGeo();
            let cos = geo.dx / geo.l;
            let sin = geo.dz / geo.l;
            return {fx: fx*cos - fz*sin, fz:fx*sin+fz*cos, my:0.0};
        } else {
            return {fx:fx, fz:fz, my:0.0};
        }
    }
    getLocalIntensities() {
        let fx = this.values[0]; // intensity in x-local
        let fz = this.values[1]; // intensity in z-local
        let geo = this.domain.elements.get(this.target).computeGeo();
        let l = geo.l;
        let dx = geo.dx;
        let dz = geo.dz;     
        let cos = dx/l;
        let sin = dz/l;
        if (!this.lcs) {
            // transform global intensities to local c.s.
            return {
                fx:fx*cos+fz*sin,
                fz:-fx*sin+fz*cos};
        } else {
            return {fx:fx, fz:fz};   
        }       
    }

    // in local c.s
    getLoadVectorForClampedBeam() : Array<number> {
        let geo = this.domain.elements.get(this.target).computeGeo();
        let f = this.getLocalIntensities();
        let fx = f.fx;
        let fz = f.fz;
        let l = geo.l;
    
        return [-0.5*l*fx, -0.5*l*fz,+1/12.*fz*l*l, -0.5*l*fx, -0.5*l*fz, -1/12.*fz*l*l ];

    }

    
    getLocationArray () :number[] {
        return this.domain.elements.get(this.target).getLocationArray();
    }

    getLoadVector(): number[] {
        let elem = <Beam2D> this.domain.elements.get(this.target);
        let t = elem.computeT()
        let f = this.getLoadVectorForClampedBeam();
        if (elem.hasHinges()) {
            let stiffrec = elem.computeLocalStiffnessMtrx(true);
            let ans = [0,0,0,0,0,0];
            // following is result of static condensation
            // ret[ix_(a)] = f[ix_(a)] - dot(dot(kab,linalg.inv(kbb)),f[ix_(b)])


            // fe[ix_(a)] += bl[ix_(a)] - dot(dot(kab,linalg.inv(kbb)),bl[ix_(b)])
            
            let h1 =  math.multiply(stiffrec.kab, math.inv(stiffrec.kbb));
            if (stiffrec.b.length == 1) {
                let flv = f[stiffrec.b[0]];
                for (let i=0; i<stiffrec.a.length; i++ ){
                    ans[stiffrec.a[i]] = f[stiffrec.a[i]] - h1.get([i,0])*flv;
                }
                
                return math.multiply(math.multiply(math.transpose(t), ans),-1.0).toArray() as number[];
            } else {
                let help = math.subtract(math.subset(f, math.index(stiffrec.a)), 
                                         math.multiply(h1, math.subset(f, math.index(stiffrec.b))));
                ans = math.subset(ans, math.index(stiffrec.a), help);
                return math.multiply(math.multiply(math.transpose(t), ans),-1.0).toArray() as number[];
            }
        } else {
            return math.multiply(math.multiply(math.transpose(t), f), -1.0).toArray() as number[];
        }    
    }

    computeBeamDeflectionContrib (xl: number) :{u:number, w:number} {
        let f = this.getLocalIntensities();
        let elem = this.domain.elements.get(this.target);
        let geo = elem.computeGeo();
        let l = geo.l;
        let w = f.fz*l*l*l*l * (xl*xl*xl*xl/24.-xl*xl*xl/12.+xl*xl/24.)/(elem.getMaterial().e*elem.getCS().iy);
        let u = 0.0;
        return {u:u, w:w};
    }
    computeBeamNContrib(x:number):number {
        let f = this.getLocalIntensities();
        return -f.fx*x;
    }
    computeBeamVContrib(x:number):number {
        let f = this.getLocalIntensities();
        return -f.fz*x;
    }
    computeBeamMContrib(x:number):number {
        let f = this.getLocalIntensities();
        return -f.fz*x*x/2.0;
    }

}
/** Class representing prescribed displacement TBD */
export class PrescribedDisplacement {
    target: number; // node (umber) subjected to Prescribed Displacement
    prescribedValues: EnumDictionary<DofID, number>; // prescribed values of individual DOFs
    domain: Domain;

    /**
     * Constructor
     */
    constructor (target: number, domain:Domain, values:EnumDictionary<DofID, number>) {
        this.target = target;
        this.prescribedValues = values;
        this.domain = domain;
    }
    getNodePrescribedDisplacementVector() {
        let answer = new Array<number>();
        // get node DOFs
        let dofs = this.domain.solver.getNodeDofIDs(this.target);
        // generate prescribed displacement vector
        for (let dof of dofs) {
            if (dof in this.prescribedValues) {
                answer.push(this.prescribedValues[dof]);
            } else {
                answer.push(0.0);
            }
        }
        return answer;

    }
    getLocationArray() {
        return this.domain.solver.getNodeLocationArray(this.target, this.domain.solver.getNodeDofIDs(this.target));
    }
}

/**
 * Class representing problem domain
 */
export class Domain {
    solver:Solver;
    nodes = new Map<number, Node>();
    elements = new Map<number, Element>();
    materials = new Map<number, Material>();
    crossSections = new Map<number, CrossSection> ();

    /**
     * Constructor
    */
    constructor (solver: Solver) {
        this.solver = solver;
    }
    getNode(id:number) : Node {
        if (this.nodes.has(id)) {
            return this.nodes.get(id);
        } else {
            throw new RangeError ("Node label "+id+" does not exists");
        }
    }

    getElement(id:number) : Element {
        if (this.elements.has(id)) {
            return this.elements.get(id);
        } else {
            throw new RangeError ("Element label "+id+" does not exists");
        }       
    }

    getMaterial(id:number) : Material {
        if (this.materials.has(id)) {
            return this.materials.get(id);
        } else {
            throw new RangeError ("Material label "+id+" does not exists");
        }
    }
    getCS(id:number) : CrossSection {
        if (this.crossSections.has(id)) {
            return this.crossSections.get(id);
        } else {
            throw new RangeError ("CrossSection label "+id+" does not exists");
        }
    }


    // class factory
    createNode (label:number, coords:number[]=[0,0,0], bcs: Array<DofID>=[]) {
        let ans = new Node (label, this, coords, bcs);
        this.nodes.set(label, ans);
        return ans;
    }
    createBeam2D (label:number, nodes:Array<number>, mat:number, cs:number, hinges:[boolean, boolean] = [false, false]) {
        let ans = new Beam2D (label, this, nodes, mat, cs, hinges);
        this.elements.set(label, ans);
        return ans;
    }
    createMaterial (label: number, params: MaterialParameters = {}) {
        let ans = new Material(label, params);
        this.materials.set(label, ans);
        return ans;
    }
    createCrossSection (label:number, params: CrossSectionParameters = {}) {
        let ans = new CrossSection(label, params);
        this.crossSections.set(label, ans);
        return ans;
    }
    
}

/**
 * LoadCase represents a collection of loads. LoadCase stores also its solution vector.
 */
export class LoadCase {
    label: string;
    domain: Domain; // domain reference
    // dictionary (map), key is node number, value is PrescribedDisplacement object applied
    bcMap: { [node: number]: PrescribedDisplacement } = {};
    // Array of loads applied
    nodalLoadList = new Array<NodalLoad>();
    elementLoadList = new Array<BeamElementUniformEdgeLoad>();
    prescribedBC = new Array<PrescribedDisplacement>();
    // solution vector 
    r: math.Matrix | number[] | number[][];
    // vector of reactions
    R: math.Matrix | number[] | number[][];

    /**
     * Creates a new loadcase
     * @param label load case name
     */
    constructor(label:string, domain: Domain) {
        this.label = label;
        this.domain = domain;
    }
    /**
     * Returns list of applied element loads on element with given number
     * param e element number
     */
    getElementLoadsOnElement (e:number) : Array<BeamElementLoad> {
        let ans = [];
        for (let l of this.elementLoadList) {
            if (l.target == e) {
                ans.push(l);
            } 
        }
        return ans;
    }    

    //class factory
    createNodalLoad (node: number, values:EnumDictionary<DofID, number>={}) {
        let ans =  new NodalLoad(node, this.domain, values);
        this.nodalLoadList.push(ans);
        return ans;
    }
    createBeamElementUniformEdgeLoad (elem: number, values:number[], lcs: boolean) {
        let ans = new BeamElementUniformEdgeLoad (elem, this.domain, values, lcs);
        this.elementLoadList.push (ans);
        return ans;
    }
    createPrescribedDisplacement (target: number, values:EnumDictionary<DofID, number>) {
        let ans = new PrescribedDisplacement (target, this.domain, values);
        this.prescribedBC.push(ans);
        return ans;
    }
}

/**
 * Class representing linear elastic solver.
 */
export class Solver {
    domain:Domain;
    neq: number; // number of unknowns
    pneq: number; // number of prescribed unknowns
    k: any;
    f: math.Matrix | number[] | number[][];
    loadCases = new Array<LoadCase>();
    codeNumberGenerated:boolean = false;

    constructor () {
        this.domain = new Domain(this);
        this.loadCases.push(new LoadCase("DefaultLC", this.domain));
    }
    // code numbers assigned to supported as well as free DOFs
    nodeCodeNumbers = new Map<number, {[code:number] : number}>();

    getNodeLocationArray (num:number, dofs:Array<DofID>) {
        var ans = [];
        //console.log("Node:", num, "Locatioan Array dofs:", dofs);
        for (let i of dofs) {
            //console.log(num, i, this.nodeCodeNumbers.get(num)[i]);
            ans = ans.concat(this.nodeCodeNumbers.get(num)[i]);
        }
        return ans;
    }
    getNodeDofIDs (num:number) : number[] {
        let ans:number[]=[];
        for (let d in this.nodeCodeNumbers.get(num)) {
            ans.push(parseInt(d));
        }
        return ans;
    }

    generateCodeNumbers () {
        var nodalDofs = new Map<number, Set<DofID>>();
        for (let [key, node] of this.domain.nodes) {
            this.nodeCodeNumbers.set(key, {});
            nodalDofs.set(key, new Set<DofID>());
        }
        // compile list of DOFs needed in nodes from element requirements
        for (let [ie, elem] of this.domain.elements) {
            for (let en of elem.nodes) {
                var dofs = elem.getNodeDofs(en);
                for (let d of dofs){
                    if (nodalDofs.has(en)) {
                        nodalDofs.get(en).add(d);
                    } else {
                        console.log(en, en in nodalDofs, nodalDofs.get(en));
                        throw new RangeError ("Node label "+en+" does not exists");
                    }
                }
            }
        }
        //console.log(nodalDofs);
        // compute number of unknown and prescribed DOFs
        this.neq = 0;
        this.pneq = 0;
        for (let [num, node] of this.domain.nodes) {
            for (let d of nodalDofs.get(num)) {
                if (node.bcs.has(d)) {
                    this.pneq++;
                } else {
                    this.neq++;
                }
            }
        } 
        
        // assign equation (code) numbers to dofs
        var eq:number = 0;
        var peq: number = this.neq;
        for (let [num, node] of this.domain.nodes) {
            for (let d of nodalDofs.get(num)){
                if (node.bcs.has(d)) {
                    this.nodeCodeNumbers.get(num)[d]=peq++;
                } else {
                    this.nodeCodeNumbers.get(num)[d]=eq++;
                }
            }
        }
        //console.log("Number of equations: ",this.neq, ", number of prescribved: ", this.pneq);
        //console.log(this.nodeCodeNumbers);
        this.codeNumberGenerated = true;
    }

    assembleVecLC (f:any, fe:number[], loc:number[], lc:number) {
        for (let i=0; i<loc.length; i++) {
            f.set([loc[i],lc], f.get([loc[i],lc])+fe[i]);      
        }
    }
    assembleVec (f:any, fe:number[], loc:number[]) {
        for (let i=0; i<loc.length; i++) {
            f.set([loc[i]], f.get([loc[i]]) +fe[i]);      
        }
    }

    
    assemble () {
        this.k = math.zeros(this.neq+this.pneq, this.neq+this.pneq); 
        
        // assemble stifness matrix
        for (let [num, el] of this.domain.elements) {
            let estiff = el.computeStiffness();
            let loc = el.getLocationArray() as [];
            let ndofs = math.size(loc)[0];
            //console.log("assembling element ", num);
            //console.log("loc[",math.size(loc)[0],"]:", loc );
            //console.log("Element ", num, "loc:", loc, "k:", estiff);

            if (true) {    
            for (let r = 0; r< ndofs; r++) {
                let rc = loc[r];
                for (let c = 0; c< ndofs; c++) {
                    let cc = loc[c];
                    this.k.set([rc,cc],  this.k.get([rc,cc])+estiff.get([r,c]));
                }
            }
            } else {
            //console.log("El: ", num, "loc:", loc, "ke:", el.computeStiffness());
            let acc = math.add(math.subset(this.k, math.index(loc,loc)), el.computeStiffness());
            //console.log("add:", acc);
            //console.log("indx:", math.index(loc,loc));
            
            math.subset(this.k, math.index(loc, loc), acc);
            }
        }
        //console.log("k=", this.k);

        this.f = math.zeros(this.neq+this.pneq, this.loadCases.length);
        for (let i=0; i< this.loadCases.length; i++) {
            this.loadCases[i].r = math.zeros(this.neq+this.pneq);
            let lc = this.loadCases[i];
            for (let load of lc.nodalLoadList) {
                // assemble load
                //math.subset(this.f, math.index(load.getLocationArray()), load.getLoadVector());
                this.assembleVecLC (this.f, load.getLoadVector(), load.getLocationArray(),i);
                //console.log("nodal load:", load.getLoadVector(), "codes:", load.getLocationArray(), "result:", this.f);
            }

            for (let load of lc.elementLoadList) {
                // assemble load
                //math.subset(this.f, math.index(load.getLocationArray()), load.getLoadVector());
                //console.log("element load:", load.getLoadVector(), "codes:", load.getLocationArray());
                this.assembleVecLC (this.f, load.getLoadVector(), load.getLocationArray(),i);
            }

            // assemble prescribed displacement vector
            for (let dbc of lc.prescribedBC) {
                this.assembleVec (lc.r, dbc.getNodePrescribedDisplacementVector(), dbc.getLocationArray());
            }

        }

    }

    solve() {
        const startime = new Date();
        if (!this.codeNumberGenerated) {
            this.generateCodeNumbers();
        }

        this.assemble();
        if (this.neq > 0) {
            let unknowns = math.range(0, this.neq);
            let prescribed = math.range(this.neq, this.neq+this.pneq);
            // solve linear system 
            //console.log("unknowns=", unknowns);
            //console.log("kuu=", math.subset(this.k, math.index(unknowns, unknowns)));
            //console.log("fu=", math.subset(this.f, math.index(unknowns, math.range(0, this.loadCases.length))));

        
            for (let lc=0; lc<this.loadCases.length; lc++) {
                let rp = math.subset(this.loadCases[lc].r, math.index(prescribed));
                let fp = math.multiply (math.subset(this.k, math.index(unknowns, prescribed)), rp) as math.Matrix;
                //console.log('fp', fp);
                //console.log('fsubset', math.squeeze(math.subset(this.f, math.index(unknowns, [lc]))));
                let b = math.subtract(math.squeeze(math.subset(this.f, math.index(unknowns, [lc]))),fp) as math.Matrix;
                let ru = math.squeeze(math.lusolve(math.subset(this.k, math.index(unknowns, unknowns)),b)); 
                                                            
          
                //this.loadCases[lc].r = math.zeros(this.neq+this.pneq);
                this.loadCases[lc].r = math.subset(this.loadCases[lc].r, math.index(math.range(0, this.neq)), ru);

                // evaluate reactions
                this.loadCases[lc].R = math.multiply(math.subset(this.k, math.index(prescribed, unknowns)), ru).toArray();
                // add contributions from elements
                this.loadCases[lc].R = math.subtract (this.loadCases[lc].R, math.squeeze(math.subset(this.f, math.index(prescribed,[lc])))) as math.Matrix;
                //console.log("lc:", lc, " r:", this.loadCases[lc].r, " R:", this.loadCases[lc].R);
        
            }
        }
        const endtime = new Date();
        let timediff = (endtime.getTime()-startime.getTime())/1000;
        console.log("Solution took ", Math.round(timediff), " [sec]");
    }
}


