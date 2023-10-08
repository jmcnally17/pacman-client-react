import GhostMovement from "./ghostMovement";

describe("findCyanAimPath", () => {
  let redGhost;
  let pacman;
  let assets;
  let variables;
  let pathway;

  beforeEach(() => {
    redGhost = { position: { x: 480, y: 170 } };
    pacman = { position: { x: 300, y: 250 }, rotation: 0 };
    assets = { characters: { ghosts: { red: redGhost }, pacman: pacman } };
    variables = { tileLength: 32 };
    pathway = {
      position: { x: 250, y: 620 },
    };
  });

  it("returns a vector from the pathways position to the mirror of the red ghosts postion around two spaces to the right of Pac-Man when Pac-Man is facing right", () => {
    expect(GhostMovement.findCyanAimPath(assets, variables, pathway)).toEqual({
      x: -66,
      y: -290,
    });
  });

  it("returns a vector from the pathways position to the mirror of the red ghosts postion around two spaces below Pac-Man when Pac-Man is facing downwards", () => {
    pacman.rotation = Math.PI / 2;
    expect(GhostMovement.findCyanAimPath(assets, variables, pathway)).toEqual({
      x: -130,
      y: -226,
    });
  });

  it("returns a vector from the pathways position to the mirror of the red ghosts postion around two spaces to the left of Pac-Man when Pac-Man is facing left", () => {
    pacman.rotation = Math.PI;
    expect(GhostMovement.findCyanAimPath(assets, variables, pathway)).toEqual({
      x: -194,
      y: -290,
    });
  });

  it("returns a vector from the pathways position to the mirror of the red ghosts postion around two spaces above Pac-Man when Pac-Man is facing upwards", () => {
    pacman.rotation = (Math.PI * 3) / 2;
    expect(GhostMovement.findCyanAimPath(assets, variables, pathway)).toEqual({
      x: -130,
      y: -354,
    });
  });
});
