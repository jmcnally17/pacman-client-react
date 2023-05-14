import GhostMovement from "./ghostMovement";

describe("findCyanScatterPath", () => {
  it("returns a vector from the pathways position to the cyan ghosts scatter corner", () => {
    const pathway = { position: { x: 450, y: 290 } };
    expect(GhostMovement.findCyanScatterPath(pathway)).toEqual({
      x: 446,
      y: 702,
    });
  });
});
