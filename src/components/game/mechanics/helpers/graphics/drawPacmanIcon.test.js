import Graphics from "./graphics";

describe("drawPacmanIcon", () => {
  let ctx;
  let position;

  beforeEach(() => {
    ctx = {
      beginPath: () => undefined,
      arc: () => undefined,
      lineTo: () => undefined,
      fillStyle: undefined,
      fill: () => undefined,
      closePath: () => undefined,
    };
    position = {
      x: 580,
      y: 15,
    };
    jest.spyOn(ctx, "beginPath");
    jest.spyOn(ctx, "arc");
    jest.spyOn(ctx, "lineTo");
    jest.spyOn(ctx, "fill");
    jest.spyOn(ctx, "closePath");
  });

  it("calls beginPath on ctx to begin drawing Pac-Man", () => {
    Graphics.drawPacmanIcon(ctx, position);
    expect(ctx.beginPath).toHaveBeenCalledTimes(1);
  });

  it("calls arc on ctx to begin drawing Pac-Man", () => {
    Graphics.drawPacmanIcon(ctx, position);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenCalledWith(
      580,
      15,
      15,
      Math.PI / 4,
      (Math.PI * 7) / 4
    );
  });

  it("calls lineTo on ctx to draw Pac-Man's mouth", () => {
    Graphics.drawPacmanIcon(ctx, position);
    expect(ctx.lineTo).toHaveBeenCalledTimes(1);
    expect(ctx.lineTo).toHaveBeenCalledWith(575, 15);
  });

  it("sets ctx fillStyle to yellow", () => {
    Graphics.drawPacmanIcon(ctx, position);
    expect(ctx.fillStyle).toBe("yellow");
  });

  it("calls fill in order to colour the icon in", () => {
    Graphics.drawPacmanIcon(ctx, position);
    expect(ctx.fill).toHaveBeenCalledTimes(1);
  });

  it("calls closePath on ctx to finish the drawing", () => {
    Graphics.drawPacmanIcon(ctx, position);
    expect(ctx.closePath).toHaveBeenCalledTimes(1);
  });
});
