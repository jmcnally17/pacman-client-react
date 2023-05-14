import GhostCollision from "./ghostCollision";

describe("collisionConditional", () => {
  it("returns true when the ghost and Pac-Man are colliding", () => {
    const mockGhost = { position: { x: 200, y: 200 }, radius: 10 };
    const mockPacman = { position: { x: 200, y: 200 }, radius: 10 };
    expect(
      GhostCollision.collisionConditional(mockGhost, mockPacman)
    ).toBeTruthy();
  });

  it("returns false when the ghost and Pac-Man are not colliding", () => {
    const mockGhost = { position: { x: 250, y: 300 }, radius: 10 };
    const mockPacman = { position: { x: 300, y: 500 }, radius: 10 };
    expect(
      GhostCollision.collisionConditional(mockGhost, mockPacman)
    ).toBeFalsy();
  });
});
