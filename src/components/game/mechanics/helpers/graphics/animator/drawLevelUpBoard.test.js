import Animator from "./animator";

describe("drawLevelUpBoard", () => {
  let ctx;
  let boundary;
  let boundaries;

  beforeEach(() => {
    ctx = {
      clearRect: () => undefined,
      font: undefined,
      fillStyle: undefined,
      textAlign: undefined,
      textBaseline: undefined,
      fillText: () => undefined,
    };
    boundary = {
      draw: () => undefined,
    };
    boundaries = [boundary, boundary, boundary];
  });

  it("calls clearRect on ctx with the board dimensions", () => {
    jest.spyOn(ctx, "clearRect");
    Animator.drawLevelUpBoard(ctx, boundaries);
    expect(ctx.clearRect).toHaveBeenCalledTimes(1);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 896, 992);
  });

  it("calls draw on all the boundaries", () => {
    jest.spyOn(boundary, "draw");
    Animator.drawLevelUpBoard(ctx, boundaries);
    expect(boundary.draw).toHaveBeenCalledTimes(3);
    expect(boundary.draw).toHaveBeenNthCalledWith(1, ctx);
    expect(boundary.draw).toHaveBeenNthCalledWith(2, ctx);
    expect(boundary.draw).toHaveBeenNthCalledWith(3, ctx);
  });

  it("uses ctx to display the level up text on the board", () => {
    jest.spyOn(ctx, "fillText");
    Animator.drawLevelUpBoard(ctx, boundaries);
    expect(ctx.font).toBe("40px Arial");
    expect(ctx.fillStyle).toBe("yellow");
    expect(ctx.textAlign).toBe("center");
    expect(ctx.textBaseline).toBe("middle");
    expect(ctx.fillText).toHaveBeenCalledTimes(1);
    expect(ctx.fillText).toHaveBeenCalledWith("Level Up!", 448, 560);
  });
});
