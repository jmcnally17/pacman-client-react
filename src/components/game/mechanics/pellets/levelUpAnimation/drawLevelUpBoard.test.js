import drawLevelUpBoard from "./drawLevelUpBoard";

let mockCtx;
let mockBoundary;
let mockBoundaries;

describe("drawLevelUpBoard", () => {
  beforeEach(() => {
    mockCtx = {
      clearRect: () => undefined,
      font: undefined,
      fillStyle: undefined,
      textAlign: undefined,
      textBaseline: undefined,
      fillText: () => undefined,
    };
    mockBoundary = {
      draw: () => undefined,
    };
    mockBoundaries = [mockBoundary, mockBoundary, mockBoundary];
  });

  it("calls clearRect on ctx with the board dimensions", () => {
    jest.spyOn(mockCtx, "clearRect");
    drawLevelUpBoard(mockCtx, mockBoundaries);
    expect(mockCtx.clearRect).toHaveBeenCalledTimes(1);
    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 896, 992);
  });

  it("calls draw on all the boundaries", () => {
    jest.spyOn(mockBoundary, "draw");
    drawLevelUpBoard(mockCtx, mockBoundaries);
    expect(mockBoundary.draw).toHaveBeenCalledTimes(3);
    expect(mockBoundary.draw).toHaveBeenNthCalledWith(1, mockCtx);
    expect(mockBoundary.draw).toHaveBeenNthCalledWith(2, mockCtx);
    expect(mockBoundary.draw).toHaveBeenNthCalledWith(3, mockCtx);
  });

  it("uses ctx to display the level up text on the board", () => {
    jest.spyOn(mockCtx, "fillText");
    drawLevelUpBoard(mockCtx, mockBoundaries);
    expect(mockCtx.font).toBe("40px Arial");
    expect(mockCtx.fillStyle).toBe("yellow");
    expect(mockCtx.textAlign).toBe("center");
    expect(mockCtx.textBaseline).toBe("middle");
    expect(mockCtx.fillText).toHaveBeenCalledTimes(1);
    expect(mockCtx.fillText).toHaveBeenCalledWith("Level Up!", 448, 560);
  });
});
