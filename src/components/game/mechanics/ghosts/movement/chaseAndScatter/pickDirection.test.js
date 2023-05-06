import pickDirection from "./pickDirection";

let mockGhost;

describe("pickDirection", () => {
  beforeEach(() => {
    mockGhost = {
      velocity: {
        x: 0,
        y: 0,
      },
      speed: 4,
    };
  });

  it("starts moving the ghost upwards if it is the direction with the shortest distance", () => {
    const mockPathwayOne = {
      direction: "down",
      distance: 50,
    };
    const mockPathwayTwo = {
      direction: "up",
      distance: 25,
    };
    const mockPathways = [mockPathwayOne, mockPathwayTwo];
    pickDirection(mockPathways, mockGhost, 32);
    expect(mockGhost.velocity).toEqual({
      x: 0,
      y: -4,
    });
  });

  it("starts moving the ghost downwards if it is the direction with the shortest distance", () => {
    const mockPathwayOne = {
      direction: "right",
      distance: 50,
    };
    const mockPathwayTwo = {
      direction: "down",
      distance: 25,
    };
    const mockPathways = [mockPathwayOne, mockPathwayTwo];
    pickDirection(mockPathways, mockGhost, 32);
    expect(mockGhost.velocity).toEqual({
      x: 0,
      y: 4,
    });
  });

  it("starts moving the ghost to the right if it is the direction with the shortest distance", () => {
    const mockPathwayOne = {
      direction: "left",
      distance: 50,
    };
    const mockPathwayTwo = {
      direction: "right",
      distance: 25,
    };
    const mockPathways = [mockPathwayOne, mockPathwayTwo];
    pickDirection(mockPathways, mockGhost, 32);
    expect(mockGhost.velocity).toEqual({
      x: 4,
      y: 0,
    });
  });

  it("starts moving the ghost to the left if it is the direction with the shortest distance", () => {
    const mockPathwayOne = {
      direction: "up",
      distance: 50,
    };
    const mockPathwayTwo = {
      direction: "left",
      distance: 25,
    };
    const mockPathways = [mockPathwayOne, mockPathwayTwo];
    pickDirection(mockPathways, mockGhost, 32);
    expect(mockGhost.velocity).toEqual({
      x: -4,
      y: 0,
    });
  });
});
