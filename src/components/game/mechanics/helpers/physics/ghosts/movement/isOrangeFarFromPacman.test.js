import GhostMovement from "./ghostMovement";

describe("isOrangeFarFromPacman", () => {
  let variables;

  beforeEach(() => {
    variables = { tileLength: 32 };
  });

  it("returns true if the orange ghost is more than eight squares away from Pac-Man", () => {
    const orangeGhost = { position: { x: 300, y: 190 } };
    const pacman = { position: { x: 50, y: 560 } };
    expect(
      GhostMovement.isOrangeFarFromPacman(orangeGhost, pacman, variables)
    ).toBeTruthy();
  });

  it("returns false if the orange ghost is less than eight squares away from Pac-Man", () => {
    const orangeGhost = { position: { x: 300, y: 190 } };
    const pacman = { position: { x: 210, y: 230 } };
    expect(
      GhostMovement.isOrangeFarFromPacman(orangeGhost, pacman, variables)
    ).toBeFalsy();
  });
});
