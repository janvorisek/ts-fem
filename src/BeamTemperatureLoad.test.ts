import * as math from "mathjs";

import { expect, test } from "vitest";
import { LinearStaticSolver } from "./LinearStaticSolver";
import { DofID } from ".";

test("Cantilever - uniform temperature change", () => {
  const solver = new LinearStaticSolver();
  solver.domain.createNode(1, [0, 0, 0], [DofID.Dx, DofID.Dz, DofID.Ry]);
  solver.domain.createNode(2, [2, 0, 0]);

  solver.domain.createBeam2D("1", [1, 2], 1, 1, [false, false]);

  solver.domain.createMaterial("1", { e: 210000e6, g: 210000e6 / (2 * (1 + 0.2)), alpha: 12e-6, d: 4000 /*kg/m3!!!*/ });
  solver.domain.createCrossSection("1", { a: 1, iy: 8.356e-5, iz: 1.0, dyz: 999991.0, h: 1, k: 1e32, j: 99999.0 });

  solver.loadCases[0].createBeamTemperatureLoad("1", [100]);

  solver.solve();

  const reactions = solver.domain.getNode(1).getReactions(solver.loadCases[0]).values as math.Matrix;
  const unknowns = solver.domain
    .getNode(2)
    .getUnknowns(solver.loadCases[0], [DofID.Dx, DofID.Dz, DofID.Ry]) as math.Matrix;

  expect(reactions.get([0])).toBeCloseTo(0);
  expect(reactions.get([1])).toBeCloseTo(0);
  expect(reactions.get([2])).toBeCloseTo(0);

  expect(unknowns.get([0])).toBeCloseTo(2 * 12e-6 * 100, 6);
  expect(unknowns.get([1])).toBeCloseTo(0);
  expect(unknowns.get([2])).toBeCloseTo(0);
});
