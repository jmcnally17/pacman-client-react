import Animator from "./animator";

describe("displayPleaseWait", () => {
  let ctx;
  let loadTint;

  beforeEach(() => {
    ctx = {
      globalAlpha: null,
      font: null,
      fillStyle: null,
      textAlign: null,
      textBaseline: null,
      fillText: () => undefined,
    };
    loadTint = jest.fn();
  });

  it("calls loadTint to darken the board", () => {
    Animator.displayPleaseWait(ctx, loadTint);
    expect(loadTint).toHaveBeenCalledTimes(1);
    expect(loadTint).toHaveBeenCalledWith(ctx);
  });

  it("renders 'Please wait...' text on the screen", () => {
    jest.spyOn(ctx, "fillText");
    Animator.displayPleaseWait(ctx, loadTint);
    expect(ctx.globalAlpha).toBe(1);
    expect(ctx.font).toBe("100px Arial");
    expect(ctx.fillStyle).toBe("white");
    expect(ctx.textAlign).toBe("center");
    expect(ctx.textBaseline).toBe("middle");
    expect(ctx.fillText).toHaveBeenCalledTimes(1);
    expect(ctx.fillText).toHaveBeenCalledWith("Please wait...", 448, 496);
  });
});
