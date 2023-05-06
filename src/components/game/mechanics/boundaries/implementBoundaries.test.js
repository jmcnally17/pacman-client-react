import implementBoundaries from "./implementBoundaries";

describe("implementBoundaries", () => {
  it("calls the two necessary functions to implement the boundary functionality", () => {
    const mockBoundary = {
      draw: () => undefined,
    };
    const mockBoundaries = [mockBoundary, mockBoundary, mockBoundary];
    const mockCtx = "ctx";
    const mockPacman = {};
    jest.spyOn(mockBoundary, "draw");
    const mockStopPacmanCollision = jest.fn();
    implementBoundaries(
      mockBoundaries,
      mockCtx,
      mockPacman,
      mockStopPacmanCollision
    );
    expect(mockBoundary.draw).toHaveBeenCalledTimes(3);
    expect(mockBoundary.draw).toHaveBeenNthCalledWith(1, mockCtx);
    expect(mockBoundary.draw).toHaveBeenNthCalledWith(2, mockCtx);
    expect(mockBoundary.draw).toHaveBeenNthCalledWith(3, mockCtx);
    expect(mockStopPacmanCollision).toHaveBeenCalledTimes(3);
  });
});
