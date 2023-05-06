import displayLevel from "./displayLevel";

let mockCtx;
let mockVariables;

describe("displayLevel", () => {
  beforeEach(() => {
    mockCtx = {
      fillStyle: null,
      textAlign: null,
      fillText: () => undefined,
    };
    mockVariables = {
      level: 7,
    };
  });

  it("changes the ctx fillStyle to white", () => {
    displayLevel(mockCtx, mockVariables);
    expect(mockCtx.fillStyle).toBe("white");
  });

  it("changes the ctx textAlign to center", () => {
    displayLevel(mockCtx, mockVariables);
    expect(mockCtx.textAlign).toBe("center");
  });

  it("calls fillText on ctx to render the score text", () => {
    jest.spyOn(mockCtx, "fillText");
    displayLevel(mockCtx, mockVariables);
    expect(mockCtx.fillText).toHaveBeenCalledTimes(1);
    expect(mockCtx.fillText).toHaveBeenCalledWith(
      `Level ${mockVariables.level}`,
      300,
      15
    );
  });
});
