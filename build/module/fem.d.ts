/// <reference types="mathjs" />
/**
 * Enum to define physical meaning of degrees of freedom (DOFs)
 */
export declare enum DofID {
    Dx = 0,
    Dy = 1,
    Dz = 2,
    Rx = 3,
    Ry = 4,
    Rz = 5
}
declare type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]?: U;
};
declare type EnumSet<T> = Set<T>;
export interface MaterialParameters {
    e?: number;
    g?: number;
    alpha?: number;
    d?: number;
}
interface MaterialChangeParameters extends MaterialParameters {
    label?: string;
}
/**
 * A class representing linear elastic material
 */
export declare class Material {
    label: number;
    e: number;
    g: number;
    alpha: number;
    d: number;
    /**
     * @param  label int label of receiver
     * @param  e Young's modulus of receiver [Pa]
     * @param g  Shear modulus of receiver [Pa]
     * @param alpha thermal dillatation coefficient [K-1]
     * @param d mass density of receiver [kg/m3]
     */
    constructor(label: number, params?: MaterialParameters);
    /**
     * Change receiver properties
     * @param  e Young's modulus of receiver [Pa]
     * @param g  Shear modulus of receiver [Pa]
     * @param alpha thermal dillatation coefficient [K-1]
     * @param d mass density of receiver [kg/m3]
     */
    change(params: MaterialChangeParameters): void;
}
export interface CrossSectionParameters {
    a?: number;
    iy?: number;
    iz?: number;
    dyz?: number;
    h?: number;
    k?: number;
    j?: number;
}
interface CrossSectionChangeParameters extends CrossSectionParameters {
    label?: string;
}
/** A class representing beam cross section
*/
export declare class CrossSection {
    label: number;
    a: number;
    iy: number;
    iz: number;
    dyz: number;
    h: number;
    k: number;
    j: number;
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
    constructor(label: number, params?: CrossSectionParameters);
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
    change(params: CrossSectionChangeParameters): void;
}
/**
 * "A class representing a FE node
 * bcs and pDspl: x,y,z for displacement, X,Y,Z for rotations
 */
export declare class Node {
    label: number;
    domain: Domain;
    coords: Array<number>;
    bcs: EnumSet<DofID>;
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
    constructor(label: number, domain: Domain, coords?: number[], bcs?: Array<DofID>);
    /**
     * Change properties
     * @param label new label
     * @param coords new coordinates
     * @param bcs new dictionary with applied boundary conditions
     */
    change(label: number, coords: number[], bcs?: Array<DofID>): void;
    change2(params: {
        label?: number;
        coords?: number[];
        bcs?: Array<DofID>;
        lcs?: {
            locx: number[];
            locy: number[];
        };
    }): void;
    getLocationArray(dofs: Array<DofID>): any[];
    getUnknowns(lc: LoadCase, dofs: Array<DofID>): number[] | number[][] | import("mathjs").Matrix;
    /**
     * Returns receiver transformation matrix (from nodal to global c.s., ie. rg=t*r_n)
     * @param dofs dofs mask to consider
     */
    getTransformationMtrx(dofs: Array<DofID>): number | number[] | number[][] | import("mathjs").Matrix;
    /**
     * Updates the reciver lcs triplet according to given lcs orientation
     * @param lcs
     */
    updateLcs(lcs?: {
        locx: number[];
        locy: number[];
    }): void;
    /**
     * Returns true if receiver has local c.s.
     */
    hasLcs(): boolean;
    getReactions(lc: LoadCase, inGlobalCS?: boolean): {
        dofs: number[];
        values: number[] | number[][] | import("mathjs").Matrix;
    } | {
        dofs: DofID[];
        values: (number[] | number[][] | import("mathjs").Matrix)[];
    };
}
/**
 * A class representing Finite Element
 */
export declare class Element {
    label: number;
    nodes: Array<number>;
    mat: number;
    cs: number;
    domain: Domain;
    /**
     * Constructor
     * @param label new label
     * @param nodes element nodes
     * @param mat element material number
     * @param cs element cross section number
     */
    constructor(label: number, domain: Domain, nodes: Array<number>, mat: number, cs: number);
    /**
     * Change receiver properties
     * @param label new label
     * @param nodes nodes
     * @param mat new material (number)
     * @param cs new cross section (number)
     */
    change(label: number, nodes: Array<number>, mat: number, cs: number): void;
    change2(params: {
        label?: number;
        nodes?: number[];
        mat?: number;
        cs?: number;
    }): void;
    /**
     * Returns Material (object) associated to element
     */
    getMaterial(): Material;
    /**
     * Returns Cross Section (object) associated to element
     */
    getCS(): CrossSection;
    /**
     * Returns array of DOFs for given node
     * @param node node id
     */
    getNodeDofs(node: number): Array<DofID>;
    /**
     * Computes global stiffness matrix of element
     */
    computeStiffness(): any;
    /**
     * Returns element code numbers
     */
    getLocationArray(): any;
    /**
     * Returns object with element geometry
     */
    computeGeo(): any;
    /**
     * Returns element transformation matrix frol global to local c.s
     */
    computeT(): math.Matrix;
}
/**
 * Implementation of Timoshenko beam element in 2D (xz plane)
 */
export declare class Beam2D extends Element {
    hinges: [boolean, boolean];
    /**
     * Constructor
     * @param label element label (num)
     * @param nodes element nodes
     * @param mat element material (num)
     * @param cs element cross section (num)
     * @param hinges array of two boolean values indicating if hinge is present at start or end
     */
    constructor(label: number, domain: Domain, nodes: Array<number>, mat: number, cs: number, hinges?: [boolean, boolean]);
    change2(params: {
        label?: number;
        nodes?: number[];
        mat?: number;
        cs?: number;
        hinges: [boolean, boolean];
    }): void;
    getNodeDofs(node: number): Array<DofID>;
    getLocationArray(): number[];
    /**
     * Returns Beam2D geometry object containing l: length, dx: element projection in to x axis, dz: element projection in z axis
     */
    computeGeo(): {
        l: number;
        dx: number;
        dz: number;
    };
    /**
     * Returns tru if element has start or end hinge (or both)
     */
    hasHinges(): boolean;
    /**
     * Computes element transformation matrix from local to global (nodal) c.s.
     */
    computeT(): math.Matrix;
    /**
     * Computes Beam2D local stifness matrix
     * @param retCondenseSubMats when true, extended info on condensed DOFs is provided
     */
    computeLocalStiffnessMtrx(retCondenseSubMats?: boolean): {
        answer: number[] | number[][] | import("mathjs").Matrix;
        a: number[];
        b: number[];
        kaa: import("mathjs").Matrix;
        kab: import("mathjs").Matrix;
        kbb: import("mathjs").Matrix;
    } | {
        answer: number[] | number[][] | import("mathjs").Matrix;
        a?: undefined;
        b?: undefined;
        kaa?: undefined;
        kab?: undefined;
        kbb?: undefined;
    };
    /**
     * Computes local initial stress matrix
     * @param N normal force
     */
    computeLocalInitialStressMtrx(N: number): number[] | number[][] | import("mathjs").Matrix;
    /**
     * Evaluate element stiffness matrix in global c.s.
     */
    computeStiffness(): import("mathjs").Matrix;
    /**
     * Evaluates initial stress matrix in global c.s.
     * @param N Element normal force
     */
    computeInitialStressMatrix(N: number): import("mathjs").Matrix;
    /**
     * Computes element end displacement vector (in element local c.s.)
     * @param r global vector of unknowns
     */
    computeEndDisplacement(lc: LoadCase): import("mathjs").Matrix;
    /**
     * Computes element end forces (in element local c.s.)
     * @param lc load case reference
     */
    computeEndForces(lc: LoadCase): import("mathjs").Matrix;
    /**
     * Computes nseg+1 values of local deflections
     * @param lc reference to load case
     * @param nseg deflection will be evaluated in nseg+1 points generated along the element
     */
    computeLocalDefl(lc: LoadCase, nseg: number): {
        u: number[];
        w: number[];
    };
    /**
     * Computes nseg+1 values of global deflections
     * @param lc reference to load case
     * @param nseg deflection will be evaluated in nseg+1 points generated along the element
     */
    computeGlobalDefl(lc: LoadCase, nseg: number): {
        u: any[];
        w: any[];
    };
    /**
     * Computes the values of normal force along element
     * @param lc load case reference
     * @param nseg number of points-1
     */
    computeNormalForce(lc: LoadCase, nseg: number): {
        x: any[];
        N: any[];
    };
    /**
     * Computes the values of shear force along element
     * @param lc load case reference
     * @param nseg number of points-1
     */
    computeShearForce(lc: LoadCase, nseg: number): {
        x: any[];
        V: any[];
    };
    /**
     * Computes the values of bending moment along element
     * @param lc load case reference
     * @param nseg number of points-1
     */
    computeBendingMoment(lc: LoadCase, nseg: number): {
        x: any[];
        M: any[];
    };
}
/**
 * Abstract class representing all loads
 */
export declare class Load {
    target: number;
    domain: Domain;
    /**
     * Returns load vector for clamped beam
     * @param elem element number
     */
    constructor(target: number, domain: Domain);
    /**
     * Evaluates the contribution to the load vector
     */
    getLoadVector(): number[];
    /**
     * Returns load code numbers
     */
    getLocationArray(): number[];
}
/**
 * Implementation of concentrated nodal load
 */
export declare class NodalLoad extends Load {
    values: EnumDictionary<DofID, number>;
    constructor(node: number, domain: Domain, values?: EnumDictionary<DofID, number>);
    change(node: number, values: EnumDictionary<DofID, number>): void;
    getLoadVector(): number[];
    getLocationArray(): number[];
}
/**
 * Abstract class for Beam elements extending the basic Load class to evaluate load contribution to
 * exact displacement and internal forces.
 */
export declare class BeamElementLoad extends Load {
    getLoadVectorForClampedBeam(): Array<number>;
    computeBeamDeflectionContrib(xl: number): {
        u: number;
        w: number;
    };
    computeBeamNContrib(x: number): number;
    computeBeamVContrib(x: number): number;
    computeBeamMContrib(x: number): number;
}
/**
 * Implementation of Beam2d uniform load
 */
export declare class BeamElementUniformEdgeLoad extends BeamElementLoad {
    values: number[];
    lcs: boolean;
    constructor(elem: number, domain: Domain, values: number[], lcs: boolean);
    change(elem: number, values: number[], lcs: boolean): void;
    getGlobalIntensities(): {
        fx: number;
        fz: number;
        my: number;
    };
    getLocalIntensities(): {
        fx: number;
        fz: number;
    };
    getLoadVectorForClampedBeam(): Array<number>;
    getLocationArray(): number[];
    getLoadVector(): number[];
    computeBeamDeflectionContrib(xl: number): {
        u: number;
        w: number;
    };
    computeBeamNContrib(x: number): number;
    computeBeamVContrib(x: number): number;
    computeBeamMContrib(x: number): number;
}
/** Class representing prescribed displacement TBD */
export declare class PrescribedDisplacement {
    target: number;
    prescribedValues: EnumDictionary<DofID, number>;
    domain: Domain;
    /**
     * Constructor
     */
    constructor(target: number, domain: Domain, values: EnumDictionary<DofID, number>);
    getNodePrescribedDisplacementVector(): number[];
    getLocationArray(): any[];
}
/**
 * Class representing problem domain
 */
export declare class Domain {
    solver: Solver;
    nodes: Map<number, Node>;
    elements: Map<number, Element>;
    materials: Map<number, Material>;
    crossSections: Map<number, CrossSection>;
    /**
     * Constructor
    */
    constructor(solver: Solver);
    getNode(id: number): Node;
    getElement(id: number): Element;
    getMaterial(id: number): Material;
    getCS(id: number): CrossSection;
    createNode(label: number, coords?: number[], bcs?: Array<DofID>): Node;
    createBeam2D(label: number, nodes: Array<number>, mat: number, cs: number, hinges?: [boolean, boolean]): Beam2D;
    createMaterial(label: number, params?: MaterialParameters): Material;
    createCrossSection(label: number, params?: CrossSectionParameters): CrossSection;
}
/**
 * LoadCase represents a collection of loads. LoadCase stores also its solution vector.
 */
export declare class LoadCase {
    label: string;
    domain: Domain;
    bcMap: {
        [node: number]: PrescribedDisplacement;
    };
    nodalLoadList: NodalLoad[];
    elementLoadList: BeamElementUniformEdgeLoad[];
    prescribedBC: PrescribedDisplacement[];
    r: math.Matrix | number[] | number[][];
    R: math.Matrix | number[] | number[][];
    /**
     * Creates a new loadcase
     * @param label load case name
     */
    constructor(label: string, domain: Domain);
    /**
     * Returns list of applied element loads on element with given number
     * param e element number
     */
    getElementLoadsOnElement(e: number): Array<BeamElementLoad>;
    createNodalLoad(node: number, values?: EnumDictionary<DofID, number>): NodalLoad;
    createBeamElementUniformEdgeLoad(elem: number, values: number[], lcs: boolean): BeamElementUniformEdgeLoad;
    createPrescribedDisplacement(target: number, values: EnumDictionary<DofID, number>): PrescribedDisplacement;
}
/**
 * Class representing linear elastic solver.
 */
export declare class Solver {
    domain: Domain;
    neq: number;
    pneq: number;
    k: any;
    f: math.Matrix | number[] | number[][];
    loadCases: LoadCase[];
    codeNumberGenerated: boolean;
    constructor();
    nodeCodeNumbers: Map<number, {
        [code: number]: number;
    }>;
    getNodeLocationArray(num: number, dofs: Array<DofID>): any[];
    getNodeDofIDs(num: number): number[];
    generateCodeNumbers(): void;
    assembleVecLC(f: any, fe: number[], loc: number[], lc: number): void;
    assembleVec(f: any, fe: number[], loc: number[]): void;
    assemble(): void;
    solve(): void;
}
export {};
