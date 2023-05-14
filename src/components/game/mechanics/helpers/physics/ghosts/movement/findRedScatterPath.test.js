import GhostMovement from "./ghostMovement";

describe("findRedScatterPath", () => {
  it("returns a vector from the pathways position to the red ghosts scatter corner", () => {
    const pathway = { position: { x: 450, y: 290 } };
    expect(GhostMovement.findRedScatterPath(pathway)).toEqual({
      x: 446,
      y: -290,
    });
  });
});
