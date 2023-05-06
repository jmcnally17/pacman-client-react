import displayPleaseWaitText from "./displayPleaseWaitText";

describe("displayPleaseWaitText", () => {
  it("renders 'Please wait...' text on the screen", () => {
    const mockCtx = {
      globalAlpha: 0.7,
      font: null,
      fillStyle: null,
      textAlign: null,
      textBaseline: null,
      fillText: () => undefined,
    };
    jest.spyOn(mockCtx, "fillText");
    displayPleaseWaitText(mockCtx);
    expect(mockCtx.globalAlpha).toBe(1);
    expect(mockCtx.font).toBe("100px Arial");
    expect(mockCtx.fillStyle).toBe("white");
    expect(mockCtx.textAlign).toBe("center");
    expect(mockCtx.textBaseline).toBe("middle");
    expect(mockCtx.fillText).toHaveBeenCalledTimes(1);
    expect(mockCtx.fillText).toHaveBeenCalledWith("Please wait...", 448, 496);
  });
});
