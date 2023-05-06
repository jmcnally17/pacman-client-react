import findCyanAimPath from "./findCyanAimPath";

let mockPacman;
let mockVariables;
let mockRedGhost;
let mockPathway;

describe("findCyanAimPath", () => {
  beforeEach(() => {
    mockPacman = {
      position: {
        x: 300,
        y: 250,
      },
      rotation: 0,
    };
    mockVariables = {
      tileLength: 32,
    };
    mockRedGhost = {
      position: {
        x: 480,
        y: 170,
      },
    };
    mockPathway = {
      position: {
        x: 250,
        y: 620,
      },
    };
  });

  it("returns a vector from the pathways position to the mirror of the red ghosts postion around two spaces to the right of Pac-Man when Pac-Man is facing right", () => {
    expect(
      findCyanAimPath(mockPacman, mockVariables, mockRedGhost, mockPathway)
    ).toEqual({
      x: -66,
      y: -290,
    });
  });

  it("returns a vector from the pathways position to the mirror of the red ghosts postion around two spaces below Pac-Man when Pac-Man is facing downwards", () => {
    mockPacman.rotation = Math.PI / 2;
    expect(
      findCyanAimPath(mockPacman, mockVariables, mockRedGhost, mockPathway)
    ).toEqual({
      x: -130,
      y: -226,
    });
  });

  it("returns a vector from the pathways position to the mirror of the red ghosts postion around two spaces to the left of Pac-Man when Pac-Man is facing left", () => {
    mockPacman.rotation = Math.PI;
    expect(
      findCyanAimPath(mockPacman, mockVariables, mockRedGhost, mockPathway)
    ).toEqual({
      x: -194,
      y: -290,
    });
  });

  it("returns a vector from the pathways position to the mirror of the red ghosts postion around two spaces above Pac-Man when Pac-Man is facing upwards", () => {
    mockPacman.rotation = (Math.PI * 3) / 2;
    expect(
      findCyanAimPath(mockPacman, mockVariables, mockRedGhost, mockPathway)
    ).toEqual({
      x: -130,
      y: -354,
    });
  });
});
