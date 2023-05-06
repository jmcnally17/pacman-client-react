import isOrangeFarFromPacman from "./isOrangeFarFromPacman";

let mockVariables;

describe("isOrangeFarFromPacman", () => {
  beforeEach(() => {
    mockVariables = {
      tileLength: 32,
    };
  });

  it("returns true if the orange ghost is more than eight squares away from Pac-Man", () => {
    const mockOrangeGhost = {
      position: {
        x: 300,
        y: 190,
      },
    };
    const mockPacman = {
      position: {
        x: 50,
        y: 560,
      },
    };
    expect(
      isOrangeFarFromPacman(mockOrangeGhost, mockPacman, mockVariables)
    ).toBeTruthy();
  });

  it("returns false if the orange ghost is less than eight squares away from Pac-Man", () => {
    const mockOrangeGhost = {
      position: {
        x: 300,
        y: 190,
      },
    };
    const mockPacman = {
      position: {
        x: 210,
        y: 230,
      },
    };
    expect(
      isOrangeFarFromPacman(mockOrangeGhost, mockPacman, mockVariables)
    ).toBeFalsy();
  });
});
