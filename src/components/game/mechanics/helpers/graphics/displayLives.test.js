import Graphics from "./graphics";

describe("displayLives", () => {
  let ctx;
  let drawPacmanIcon;

  beforeEach(() => {
    ctx = "ctx";
    drawPacmanIcon = jest.fn();
  });

  it("calls drawPacmanIcon for the first and second icon when the player has 2 extra lives left", () => {
    const mockPacman = {
      lives: 2,
    };
    Graphics.displayLives(ctx, mockPacman, drawPacmanIcon);
    expect(drawPacmanIcon).toHaveBeenCalledTimes(2);
    expect(drawPacmanIcon).toHaveBeenNthCalledWith(1, ctx, {
      x: 580,
      y: 15,
    });
    expect(drawPacmanIcon).toHaveBeenNthCalledWith(2, ctx, {
      x: 540,
      y: 15,
    });
  });

  it("calls drawPacmanIcon for the first icon only when the player has 1 extra life left", () => {
    const mockPacman = {
      lives: 1,
    };
    Graphics.displayLives(ctx, mockPacman, drawPacmanIcon);
    expect(drawPacmanIcon).toHaveBeenCalledTimes(1);
    expect(drawPacmanIcon).toHaveBeenCalledWith(ctx, {
      x: 580,
      y: 15,
    });
  });

  it("does not call drawPacmanIcon for either icon when the player has no extra lives left", () => {
    const mockPacman = {
      lives: 0,
    };
    Graphics.displayLives(ctx, mockPacman, drawPacmanIcon);
    expect(drawPacmanIcon).toHaveBeenCalledTimes(0);
  });
});
