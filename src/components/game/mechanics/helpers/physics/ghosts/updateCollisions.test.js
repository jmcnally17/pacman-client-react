import updateCollisions from "./updateCollisions";

let mockBoundary;
let mockBoundaries;
let mockTrueHitBoundaryConditional;
let mockFalseHitBoundaryConditional;

describe("updateCollisions", () => {
  beforeEach(() => {
    mockBoundary = "boundary";
    mockBoundaries = [mockBoundary];
    mockTrueHitBoundaryConditional = jest.fn().mockReturnValue(true);
    mockFalseHitBoundaryConditional = jest.fn().mockReturnValue(false);
  });

  it("adds down to the collisions array", () => {
    const mockCollisions = [];
    const mockGhost = {
      speed: 8,
      prevCollisions: ["down"],
    };
    updateCollisions(
      mockBoundaries,
      mockCollisions,
      mockGhost,
      mockTrueHitBoundaryConditional
    );
    expect(mockTrueHitBoundaryConditional).toHaveBeenCalledTimes(1);
    expect(mockTrueHitBoundaryConditional).toHaveBeenCalledWith(
      mockGhost,
      mockBoundary,
      {
        velocity: {
          x: 0,
          y: 8,
        },
      }
    );
    expect(mockCollisions).toEqual(["down"]);
  });

  it("adds right to the collisions array", () => {
    const mockCollisions = ["down"];
    const mockGhost = {
      speed: 8,
      prevCollisions: ["down", "right"],
    };
    updateCollisions(
      mockBoundaries,
      mockCollisions,
      mockGhost,
      mockTrueHitBoundaryConditional
    );
    expect(mockTrueHitBoundaryConditional).toHaveBeenCalledTimes(1);
    expect(mockTrueHitBoundaryConditional).toHaveBeenCalledWith(
      mockGhost,
      mockBoundary,
      {
        velocity: {
          x: 8,
          y: 0,
        },
      }
    );
    expect(mockCollisions).toEqual(["down", "right"]);
  });

  it("adds left to the collisions array", () => {
    const mockCollisions = ["down", "right"];
    const mockGhost = {
      speed: 8,
      prevCollisions: ["down", "right", "left"],
    };
    updateCollisions(
      mockBoundaries,
      mockCollisions,
      mockGhost,
      mockTrueHitBoundaryConditional
    );
    expect(mockTrueHitBoundaryConditional).toHaveBeenCalledTimes(1);
    expect(mockTrueHitBoundaryConditional).toHaveBeenCalledWith(
      mockGhost,
      mockBoundary,
      {
        velocity: {
          x: -8,
          y: 0,
        },
      }
    );
    expect(mockCollisions).toEqual(["down", "right", "left"]);
  });

  it("adds up to the collisions array", () => {
    const mockCollisions = ["down", "right", "left"];
    const mockGhost = {
      speed: 8,
      prevCollisions: ["down", "right", "left", "up"],
    };
    updateCollisions(
      mockBoundaries,
      mockCollisions,
      mockGhost,
      mockTrueHitBoundaryConditional
    );
    expect(mockTrueHitBoundaryConditional).toHaveBeenCalledTimes(1);
    expect(mockTrueHitBoundaryConditional).toHaveBeenCalledWith(
      mockGhost,
      mockBoundary,
      {
        velocity: {
          x: 0,
          y: -8,
        },
      }
    );
    expect(mockCollisions).toEqual(["down", "right", "left", "up"]);
  });

  it("does not add any directions if the boundary conditional is false", () => {
    const mockCollisions = [];
    const mockGhost = {
      prevCollisions: ["down", "right", "left", "up"],
    };
    updateCollisions(
      mockBoundaries,
      mockCollisions,
      mockGhost,
      mockFalseHitBoundaryConditional
    );
    expect(mockCollisions).toEqual([]);
  });

  it("updates the prevCollisions array if it is shorter than the resultant collisions array", () => {
    const mockCollisions = ["down", "right", "left"];
    const mockGhost = {
      prevCollisions: ["down"],
    };
    updateCollisions(
      mockBoundaries,
      mockCollisions,
      mockGhost,
      mockTrueHitBoundaryConditional
    );
    expect(mockCollisions).toEqual(["down", "right", "left", "up"]);
    expect(mockGhost.prevCollisions).toEqual(["down", "right", "left", "up"]);
  });
});
