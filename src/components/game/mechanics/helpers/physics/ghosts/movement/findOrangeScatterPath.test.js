import GhostMovement from "./ghostMovement";

describe("findOrangeScatterPath", () => {
  it("returns a vector from the pathway to the orange ghosts scatter corner", () => {
    const pathway = { position: { x: 280, y: 420 } };
    expect(GhostMovement.findOrangeScatterPath(pathway)).toEqual({
      x: -280,
      y: 572,
    });
  });
});
