import GhostMovement from "./ghostMovement";

describe("findPinkScatterPath", () => {
  it("returns a vector from the pathways position to the pink ghosts scatter corner", () => {
    const pathway = { position: { x: 450, y: 290 } };
    expect(GhostMovement.findPinkScatterPath(pathway)).toEqual({
      x: -450,
      y: -290,
    });
  });
});
