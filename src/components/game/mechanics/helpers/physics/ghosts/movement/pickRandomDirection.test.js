import GhostMovement from "./ghostMovement";
import { mockRandom, resetMockRandom } from "jest-mock-random";

describe("pickRandomDirection", () => {
  let ghost;
  let pathways;

  beforeEach(() => {
    ghost = { velocity: { x: 0, y: 0 }, speed: 4 };
    pathways = ["up", "down", "right", "left"];
  });

  afterEach(() => {
    resetMockRandom();
  });

  it("can start moving the ghost upwards if it is available", () => {
    mockRandom([0]);
    GhostMovement.pickRandomDirection(ghost, pathways);
    expect(ghost.velocity).toEqual({ x: 0, y: -4 });
  });

  it("can start moving the ghost downwards if it is available", () => {
    mockRandom([0.3]);
    GhostMovement.pickRandomDirection(ghost, pathways);
    expect(ghost.velocity).toEqual({ x: 0, y: 4 });
  });

  it("can start moving the ghost to the right if it is available", () => {
    mockRandom([0.6]);
    GhostMovement.pickRandomDirection(ghost, pathways);
    expect(ghost.velocity).toEqual({ x: 4, y: 0 });
  });

  it("can start moving the ghost to the left if it is available", () => {
    mockRandom([0.9]);
    GhostMovement.pickRandomDirection(ghost, pathways);
    expect(ghost.velocity).toEqual({ x: -4, y: 0 });
  });
});
