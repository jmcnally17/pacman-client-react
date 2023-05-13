import calculateDistance from "./calculateDistance";

let mockPacman;
let mockGhost;
let mockPathwayOne;
let mockPathwayTwo;
let mockPathways;
let mockVariables;
let mockRedGhost;
let mockAddCoordinates;
let mockChase;
let mockScatter;
let mockCalculateHypotenuse;

describe("calculateDistance", () => {
  beforeEach(() => {
    mockPacman = "pacman";
    mockGhost = "ghost";
    mockPathwayOne = "pathwayOne";
    mockPathwayTwo = "pathwayTwo";
    mockPathways = [mockPathwayOne, mockPathwayTwo];
    mockVariables = "variables";
    mockRedGhost = "redGhost";
    mockAddCoordinates = jest.fn();
    mockChase = jest.fn();
    mockScatter = jest.fn();
    mockCalculateHypotenuse = jest.fn();
  });

  it("calls addCoordinates", () => {
    calculateDistance(
      mockPacman,
      mockGhost,
      mockPathways,
      mockVariables,
      mockRedGhost,
      mockAddCoordinates,
      mockChase,
      mockScatter,
      mockCalculateHypotenuse
    );
    expect(mockAddCoordinates).toHaveBeenCalledTimes(2);
    expect(mockAddCoordinates).toHaveBeenNthCalledWith(
      1,
      mockPathwayOne,
      mockGhost,
      mockVariables
    );
    expect(mockAddCoordinates).toHaveBeenNthCalledWith(
      2,
      mockPathwayTwo,
      mockGhost,
      mockVariables
    );
  });

  it("calls chase if the ghost is chasing", () => {
    const mockChasingGhost = {
      isChasing: true,
    };
    calculateDistance(
      mockPacman,
      mockChasingGhost,
      mockPathways,
      mockVariables,
      mockRedGhost,
      mockAddCoordinates,
      mockChase,
      mockScatter,
      mockCalculateHypotenuse
    );
    expect(mockChase).toHaveBeenCalledTimes(2);
    expect(mockChase).toHaveBeenNthCalledWith(
      1,
      mockChasingGhost,
      mockPathwayOne,
      mockPacman,
      mockVariables,
      mockRedGhost
    );
    expect(mockChase).toHaveBeenNthCalledWith(
      2,
      mockChasingGhost,
      mockPathwayTwo,
      mockPacman,
      mockVariables,
      mockRedGhost
    );
  });

  it("calls scatter if the ghost is not chasing", () => {
    const mockScatteringGhost = {
      isChasing: false,
    };
    calculateDistance(
      mockPacman,
      mockScatteringGhost,
      mockPathways,
      mockVariables,
      mockRedGhost,
      mockAddCoordinates,
      mockChase,
      mockScatter,
      mockCalculateHypotenuse
    );
    expect(mockScatter).toHaveBeenCalledTimes(2);
    expect(mockScatter).toHaveBeenNthCalledWith(
      1,
      mockScatteringGhost,
      mockPathwayOne
    );
    expect(mockScatter).toHaveBeenNthCalledWith(
      2,
      mockScatteringGhost,
      mockPathwayTwo
    );
  });

  it("calls calculateHypotenus", () => {
    calculateDistance(
      mockPacman,
      mockGhost,
      mockPathways,
      mockVariables,
      mockRedGhost,
      mockAddCoordinates,
      mockChase,
      mockScatter,
      mockCalculateHypotenuse
    );
    expect(mockCalculateHypotenuse).toHaveBeenCalledTimes(2);
    expect(mockCalculateHypotenuse).toHaveBeenNthCalledWith(
      1,
      undefined,
      mockPathwayOne
    );
    expect(mockCalculateHypotenuse).toHaveBeenNthCalledWith(
      2,
      undefined,
      mockPathwayTwo
    );
  });
});
