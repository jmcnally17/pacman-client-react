import Graphics from "./graphics";

describe("displayLevel", () => {
  let ctx;
  let variables;

  beforeEach(() => {
    ctx = {
      fillStyle: null,
      textAlign: null,
      fillText: () => undefined,
    };
    variables = {
      level: 7,
    };
  });

  it("changes the ctx fillStyle to white", () => {
    Graphics.displayLevel(ctx, variables);
    expect(ctx.fillStyle).toBe("white");
  });

  it("changes the ctx textAlign to center", () => {
    Graphics.displayLevel(ctx, variables);
    expect(ctx.textAlign).toBe("center");
  });

  it("calls fillText on ctx to render the score text", () => {
    jest.spyOn(ctx, "fillText");
    Graphics.displayLevel(ctx, variables);
    expect(ctx.fillText).toHaveBeenCalledTimes(1);
    expect(ctx.fillText).toHaveBeenCalledWith(
      `Level ${variables.level}`,
      300,
      15
    );
  });
});
