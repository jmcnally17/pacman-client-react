import addCoordinates from "./addCoordinates";

let mockGhost;
let mockVariables;

describe("addCoordinates", () => {
  beforeEach(() => {
    mockGhost = {
      position: {
        x: 200,
        y: 300,
      },
    };
    mockVariables = {
      tileLength: 32,
    };
  });

  it("finds the position of the tile above the ghost", () => {
    const mockPathway = {
      direction: "up",
    };
    addCoordinates(mockPathway, mockGhost, mockVariables);
    expect(mockPathway.position).toEqual({
      x: 200,
      y: 296,
    });
  });

  it("finds the position of the tile below the ghost", () => {
    const mockPathway = {
      direction: "down",
    };
    addCoordinates(mockPathway, mockGhost, mockVariables);
    expect(mockPathway.position).toEqual({
      x: 200,
      y: 304,
    });
  });

  it("finds the position of the tile to the left of the ghost", () => {
    const mockPathway = {
      direction: "left",
    };
    addCoordinates(mockPathway, mockGhost, mockVariables);
    expect(mockPathway.position).toEqual({
      x: 196,
      y: 300,
    });
  });

  it("finds the position of the tile the right of the ghost", () => {
    const mockPathway = {
      direction: "right",
    };
    addCoordinates(mockPathway, mockGhost, mockVariables);
    expect(mockPathway.position).toEqual({
      x: 204,
      y: 300,
    });
  });
});
