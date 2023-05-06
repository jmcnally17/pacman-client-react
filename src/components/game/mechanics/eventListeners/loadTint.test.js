import loadTint from "./loadTint";

describe("loadTint", () => {
  it("adds a dark black tint onto the screen", () => {
    const mockCtx = {
      globalAlpha: undefined,
      fillStyle: undefined,
      fillRect: () => undefined,
    };
    jest.spyOn(mockCtx, "fillRect");
    loadTint(mockCtx);
    expect(mockCtx.globalAlpha).toBe(0.7);
    expect(mockCtx.fillStyle).toBe("black");
    expect(mockCtx.fillRect).toHaveBeenCalledTimes(1);
    expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, 896, 992);
  });
});
