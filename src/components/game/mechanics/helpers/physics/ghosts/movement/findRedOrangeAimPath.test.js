import GhostMovement from "./ghostMovement";

describe("findRedOrangeAimPath", () => {
  it("returns a vector from the pathways position to Pac-Man's position", () => {
    const pacman = { position: { x: 250, y: 300 } };
    const pathway = { position: { x: 240, y: 430 } };
    expect(GhostMovement.findRedOrangeAimPath(pacman, pathway)).toEqual({
      x: 10,
      y: -130,
    });
  });
});
