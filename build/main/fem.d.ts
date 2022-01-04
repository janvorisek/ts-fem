import { MathArray } from 'mathjs';
import { Solver } from './Solver';
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
export declare class Material {
    label: number;
    e: number;
    g: number;
    alpha: number;
    d: number;
    constructor(label: number, params?: MaterialParameters);
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
export declare class CrossSection {
    label: number;
    a: number;
    iy: number;
    iz: number;
    dyz: number;
    h: number;
    k: number;
    j: number;
    constructor(label: number, params?: CrossSectionParameters);
    change(params: CrossSectionChangeParameters): void;
}
export declare class Node {
    label: number;
    domain: Domain;
    coords: Array<number>;
    bcs: EnumSet<DofID>;
    lcs: number[][];
    constructor(label: number, domain: Domain, coords?: number[], bcs?: Array<DofID>);
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
    getEigenValueUnknowns(lc: LoadCase, dofs: Array<DofID>, ev: number): import("mathjs").Matrix;
    getTransformationMtrx(dofs: Array<DofID>): number | number[] | number[][] | import("mathjs").Matrix;
    updateLcs(lcs?: {
        locx: number[];
        locy: number[];
    }): void;
    hasLcs(): boolean;
    getReactions(lc: LoadCase, inGlobalCS?: boolean): {
        dofs: number[];
        values: MathArray;
    } | {
        dofs: DofID[];
        values: (number[] | number[][] | import("mathjs").Matrix)[];
    } | {
        dofs: DofID[];
        values: number[] | number[][] | import("mathjs").Matrix;
    };
}
export declare class Element {
    label: number;
    nodes: Array<number>;
    mat: number;
    cs: number;
    domain: Domain;
    constructor(label: number, domain: Domain, nodes: Array<number>, mat: number, cs: number);
    change(label: number, nodes: Array<number>, mat: number, cs: number): void;
    change2(params: {
        label?: number;
        nodes?: number[];
        mat?: number;
        cs?: number;
    }): void;
    getMaterial(): Material;
    getCS(): CrossSection;
    getNodeDofs(node: number): Array<DofID>;
    computeStiffness(): any;
    computeMassMatrix(): any;
    getLocationArray(): any;
    computeGeo(): any;
    computeT(): math.Matrix;
}
export declare class Beam2D extends Element {
    hinges: [boolean, boolean];
    diagonalMassMatrix: boolean;
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
    computeGeo(): {
        l: number;
        dx: number;
        dz: number;
    };
    hasHinges(): boolean;
    computeT(): math.Matrix;
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
    computeLocalInitialStressMtrx(N: number): number[] | number[][] | import("mathjs").Matrix;
    computeLocalMassMatrix(retCondenseSubMats?: boolean): import("mathjs").MathType;
    computeStiffness(): import("mathjs").Matrix;
    computeMassMatrix(): import("mathjs").Matrix;
    computeInitialStressMatrix(N: number): import("mathjs").Matrix;
    computeEndDisplacement(lc: LoadCase): import("mathjs").Matrix;
    computeEndForces(lc: LoadCase): import("mathjs").Matrix;
    computeLocalDefl(lc: LoadCase, nseg: number): {
        u: number[];
        w: number[];
    };
    computeGlobalDefl(lc: LoadCase, nseg: number): {
        u: any[];
        w: any[];
    };
    computeEndDisplacementEigenMode(lc: LoadCase, ntheig: number): import("mathjs").Matrix;
    computeLocalEigenMode(lc: LoadCase, ntheig: number, nseg: number): {
        u: number[];
        w: number[];
    };
    computeGlobalEigenMode(lc: LoadCase, ntheig: number, nseg: number): {
        u: any[];
        w: any[];
    };
    computeNormalForce(lc: LoadCase, nseg: number): {
        x: any[];
        N: any[];
    };
    computeShearForce(lc: LoadCase, nseg: number): {
        x: any[];
        V: any[];
    };
    computeBendingMoment(lc: LoadCase, nseg: number): {
        x: any[];
        M: any[];
    };
}
export declare class Load {
    target: number;
    domain: Domain;
    constructor(target: number, domain: Domain);
    getLoadVector(): number[];
    getLocationArray(): number[];
}
export declare class NodalLoad extends Load {
    values: EnumDictionary<DofID, number>;
    constructor(node: number, domain: Domain, values?: EnumDictionary<DofID, number>);
    change(node: number, values: EnumDictionary<DofID, number>): void;
    getLoadVector(): number[];
    getLocationArray(): number[];
}
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
export declare class PrescribedDisplacement {
    target: number;
    prescribedValues: EnumDictionary<DofID, number>;
    domain: Domain;
    constructor(target: number, domain: Domain, values: EnumDictionary<DofID, number>);
    getNodePrescribedDisplacementVector(): number[];
    getLocationArray(): any[];
}
export declare class Domain {
    solver: Solver;
    nodes: Map<number, Node>;
    elements: Map<number, Element>;
    materials: Map<number, Material>;
    crossSections: Map<number, CrossSection>;
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
    eigenNumbers: number[];
    eigenVectors: math.Matrix[];
    solved: boolean;
    constructor(label: string, domain: Domain);
    getElementLoadsOnElement(e: number): Array<BeamElementLoad>;
    createNodalLoad(node: number, values?: EnumDictionary<DofID, number>): NodalLoad;
    createBeamElementUniformEdgeLoad(elem: number, values: number[], lcs: boolean): BeamElementUniformEdgeLoad;
    createPrescribedDisplacement(target: number, values: EnumDictionary<DofID, number>): PrescribedDisplacement;
}
export * from './Solver';
export * from './EigenValueDynamicSolver';
export * from './LinearStaticSolver';
