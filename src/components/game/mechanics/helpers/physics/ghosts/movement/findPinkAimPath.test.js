import GhostMovement from "./ghostMovement";

describe("findPinkAimPath", () => {
  let pacman;
  let pathway;
  let variables;

  beforeEach(() => {
    pacman = { position: { x: 300, y: 180 }, rotation: 0 };
    pathway = { position: { x: 350, y: 90 } };
    variables = { tileLength: 32 };
  });

  it("returns a vector from the pathways position to four squares to the right of Pac-Man  when Pac-Man is facing right", () => {
    expect(GhostMovement.findPinkAimPath(pacman, pathway, variables)).toEqual({
      x: 78,
      y: 90,
    });
  });

  it("returns a vector from the pathways position to four squares below Pac-Man when Pac-Man is facing downwards", () => {
    pacman.rotation = Math.PI / 2;
    expect(GhostMovement.findPinkAimPath(pacman, pathway, variables)).toEqual({
      x: -50,
      y: 218,
    });
  });

  it("returns a vector from the pathways position to four squares to the left of Pac-Man when Pac-Man is facing left", () => {
    pacman.rotation = Math.PI;
    expect(GhostMovement.findPinkAimPath(pacman, pathway, variables)).toEqual({
      x: -178,
      y: 90,
    });
  });

  it("returns a vector from the pathways position to four squares above Pac-Man when Pac-Man is facing upwards", () => {
    pacman.rotation = (Math.PI * 3) / 2;
    expect(GhostMovement.findPinkAimPath(pacman, pathway, variables)).toEqual({
      x: -50,
      y: -38,
    });
  });
});
