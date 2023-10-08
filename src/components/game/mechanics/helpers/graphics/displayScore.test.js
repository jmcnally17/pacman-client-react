import Graphics from "./graphics";

describe("displayScore", () => {
  let ctx;
  let variables;

  beforeEach(() => {
    ctx = {
      fillStyle: null,
      textAlign: null,
      fillText: () => undefined,
    };
    variables = {
      score: 3590,
    };
  });

  it("changes the ctx fillStyle to white", () => {
    Graphics.displayScore(ctx, variables);
    expect(ctx.fillStyle).toBe("white");
  });

  it("changes the ctx textAlign to left", () => {
    Graphics.displayScore(ctx, variables);
    expect(ctx.textAlign).toBe("left");
  });

  it("calls fillText on ctx to render the score text", () => {
    jest.spyOn(ctx, "fillText");
    Graphics.displayScore(ctx, variables);
    expect(ctx.fillText).toHaveBeenCalledTimes(1);
    expect(ctx.fillText).toHaveBeenCalledWith(
      `Score: ${variables.score}`,
      10,
      15
    );
  });
});
