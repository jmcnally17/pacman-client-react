import chase from "./chase";

let mockPathway;
let mockPacman;
let mockVariables;
let mockRedGhost;
let mockIsOrangeFarFromPacman;
let mockFindRedOrangeAimPath;
let mockFindPinkAimPath;
let mockFindCyanAimPath;
let mockFindOrangeScatterPath;

describe("chase", () => {
  beforeEach(() => {
    mockPathway = "pathway";
    mockPacman = "pacman";
    mockVariables = "variables";
    mockRedGhost = "redGhost";
    mockIsOrangeFarFromPacman = jest.fn();
    mockFindRedOrangeAimPath = jest.fn();
    mockFindPinkAimPath = jest.fn();
    mockFindCyanAimPath = jest.fn();
    mockFindOrangeScatterPath = jest.fn();
  });

  it("calls findRedOrangeAimPath if the ghost is red", () => {
    const mockRedGhost = {
      colour: "red",
    };
    chase(
      mockRedGhost,
      mockPathway,
      mockPacman,
      mockVariables,
      mockRedGhost,
      mockIsOrangeFarFromPacman,
      mockFindRedOrangeAimPath,
      mockFindPinkAimPath,
      mockFindCyanAimPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindRedOrangeAimPath).toHaveBeenCalledTimes(1);
    expect(mockFindRedOrangeAimPath).toHaveBeenCalledWith(
      mockPacman,
      mockPathway
    );
  });

  it("calls findPinkAimPath if the ghost is pink", () => {
    const mockPinkGhost = {
      colour: "pink",
    };
    chase(
      mockPinkGhost,
      mockPathway,
      mockPacman,
      mockVariables,
      mockRedGhost,
      mockIsOrangeFarFromPacman,
      mockFindRedOrangeAimPath,
      mockFindPinkAimPath,
      mockFindCyanAimPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindPinkAimPath).toHaveBeenCalledTimes(1);
    expect(mockFindPinkAimPath).toHaveBeenCalledWith(
      mockPacman,
      mockPathway,
      mockVariables
    );
  });

  it("calls findCyanAimPath if the ghost is cyan", () => {
    const mockCyanGhost = {
      colour: "cyan",
    };
    chase(
      mockCyanGhost,
      mockPathway,
      mockPacman,
      mockVariables,
      mockRedGhost,
      mockIsOrangeFarFromPacman,
      mockFindRedOrangeAimPath,
      mockFindPinkAimPath,
      mockFindCyanAimPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindCyanAimPath).toHaveBeenCalledTimes(1);
    expect(mockFindCyanAimPath).toHaveBeenCalledWith(
      mockPacman,
      mockVariables,
      mockRedGhost,
      mockPathway
    );
  });

  it("calls isOrangeFarFromPacman if the ghost is orange", () => {
    const mockOrangeGhost = {
      colour: "orange",
    };
    chase(
      mockOrangeGhost,
      mockPathway,
      mockPacman,
      mockVariables,
      mockRedGhost,
      mockIsOrangeFarFromPacman,
      mockFindRedOrangeAimPath,
      mockFindPinkAimPath,
      mockFindCyanAimPath,
      mockFindOrangeScatterPath
    );
    expect(mockIsOrangeFarFromPacman).toHaveBeenCalledTimes(1);
    expect(mockIsOrangeFarFromPacman).toHaveBeenCalledWith(
      mockOrangeGhost,
      mockPacman,
      mockVariables
    );
  });

  it("calls findRedOrangeAimPath if the ghost is orange and is far away from Pac-Man", () => {
    const mockOrangeGhost = {
      colour: "orange",
    };
    mockIsOrangeFarFromPacman.mockReturnValue(true);
    chase(
      mockOrangeGhost,
      mockPathway,
      mockPacman,
      mockVariables,
      mockRedGhost,
      mockIsOrangeFarFromPacman,
      mockFindRedOrangeAimPath,
      mockFindPinkAimPath,
      mockFindCyanAimPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindRedOrangeAimPath).toHaveBeenCalledTimes(1);
    expect(mockFindRedOrangeAimPath).toHaveBeenCalledWith(
      mockPacman,
      mockPathway
    );
  });

  it("calls findOrangeScatterPath if the ghost is orange and is close to Pac-Man", () => {
    const mockOrangeGhost = {
      colour: "orange",
    };
    mockIsOrangeFarFromPacman.mockReturnValue(false);
    chase(
      mockOrangeGhost,
      mockPathway,
      mockPacman,
      mockVariables,
      mockRedGhost,
      mockIsOrangeFarFromPacman,
      mockFindRedOrangeAimPath,
      mockFindPinkAimPath,
      mockFindCyanAimPath,
      mockFindOrangeScatterPath
    );
    expect(mockFindOrangeScatterPath).toHaveBeenCalledTimes(1);
    expect(mockFindOrangeScatterPath).toHaveBeenCalledWith(mockPathway);
  });
});
