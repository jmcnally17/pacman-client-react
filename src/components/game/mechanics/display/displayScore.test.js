import displayScore from "./displayScore";

let mockCtx;
let mockVariables;

describe("displayScore", () => {
  beforeEach(() => {
    mockCtx = {
      fillStyle: null,
      textAlign: null,
      fillText: () => undefined,
    };
    mockVariables = {
      score: 3590,
    };
  });

  it("changes the ctx fillStyle to white", () => {
    displayScore(mockCtx, mockVariables);
    expect(mockCtx.fillStyle).toBe("white");
  });

  it("changes the ctx textAlign to left", () => {
    displayScore(mockCtx, mockVariables);
    expect(mockCtx.textAlign).toBe("left");
  });

  it("calls fillText on ctx to render the score text", () => {
    jest.spyOn(mockCtx, "fillText");
    displayScore(mockCtx, mockVariables);
    expect(mockCtx.fillText).toHaveBeenCalledTimes(1);
    expect(mockCtx.fillText).toHaveBeenCalledWith(
      `Score: ${mockVariables.score}`,
      10,
      15
    );
  });
});
