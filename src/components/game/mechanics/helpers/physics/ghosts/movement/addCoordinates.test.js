import GhostMovement from "./ghostMovement";

describe("addCoordinates", () => {
  let ghost;
  let variables;

  beforeEach(() => {
    ghost = { position: { x: 200, y: 300 } };
    variables = { tileLength: 32 };
  });

  it("finds the position of the tile above the ghost", () => {
    const pathway = { direction: "up" };
    GhostMovement.addCoordinates(pathway, ghost, variables);
    expect(pathway.position).toEqual({ x: 200, y: 296 });
  });

  it("finds the position of the tile below the ghost", () => {
    const pathway = { direction: "down" };
    GhostMovement.addCoordinates(pathway, ghost, variables);
    expect(pathway.position).toEqual({ x: 200, y: 304 });
  });

  it("finds the position of the tile to the left of the ghost", () => {
    const pathway = { direction: "left" };
    GhostMovement.addCoordinates(pathway, ghost, variables);
    expect(pathway.position).toEqual({ x: 196, y: 300 });
  });

  it("finds the position of the tile the right of the ghost", () => {
    const pathway = { direction: "right" };
    GhostMovement.addCoordinates(pathway, ghost, variables);
    expect(pathway.position).toEqual({ x: 204, y: 300 });
  });
});
