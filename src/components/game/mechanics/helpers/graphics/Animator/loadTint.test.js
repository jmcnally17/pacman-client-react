import Animator from "./animator";

describe("loadTint", () => {
  it("adds a dark black tint onto the screen", () => {
    const ctx = {
      globalAlpha: undefined,
      fillStyle: undefined,
      fillRect: () => undefined,
    };
    jest.spyOn(ctx, "fillRect");
    Animator.loadTint(ctx);
    expect(ctx.globalAlpha).toBe(0.7);
    expect(ctx.fillStyle).toBe("black");
    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 896, 992);
  });
});
