import GhostMovement from "./ghostMovement";

describe("pickDirection", () => {
  let ghost;

  beforeEach(() => {
    ghost = { velocity: { x: 0, y: 0 }, speed: 4 };
  });

  it("starts moving the ghost upwards if it is the direction with the shortest distance", () => {
    const pathwayOne = { direction: "down", distance: 50 };
    const pathwayTwo = { direction: "up", distance: 25 };
    const pathways = [pathwayOne, pathwayTwo];
    GhostMovement.pickDirection(pathways, ghost, 32);
    expect(ghost.velocity).toEqual({ x: 0, y: -4 });
  });

  it("starts moving the ghost downwards if it is the direction with the shortest distance", () => {
    const pathwayOne = { direction: "right", distance: 50 };
    const pathwayTwo = { direction: "down", distance: 25 };
    const pathways = [pathwayOne, pathwayTwo];
    GhostMovement.pickDirection(pathways, ghost, 32);
    expect(ghost.velocity).toEqual({ x: 0, y: 4 });
  });

  it("starts moving the ghost to the right if it is the direction with the shortest distance", () => {
    const pathwayOne = { direction: "left", distance: 50 };
    const pathwayTwo = { direction: "right", distance: 25 };
    const pathways = [pathwayOne, pathwayTwo];
    GhostMovement.pickDirection(pathways, ghost, 32);
    expect(ghost.velocity).toEqual({ x: 4, y: 0 });
  });

  it("starts moving the ghost to the left if it is the direction with the shortest distance", () => {
    const pathwayOne = { direction: "up", distance: 50 };
    const pathwayTwo = { direction: "left", distance: 25 };
    const pathways = [pathwayOne, pathwayTwo];
    GhostMovement.pickDirection(pathways, ghost, 32);
    expect(ghost.velocity).toEqual({ x: -4, y: 0 });
  });
});
