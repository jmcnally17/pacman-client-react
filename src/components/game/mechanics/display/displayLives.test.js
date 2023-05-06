import displayLives from "./displayLives";

let mockCtx;
let mockDrawPacmanIcon;

describe("displayLives", () => {
  beforeEach(() => {
    mockCtx = "ctx";
    mockDrawPacmanIcon = jest.fn();
  });

  it("calls drawPacmanIcon for the first and second icon when the player has 2 extra lives left", () => {
    const mockPacman = {
      lives: 2,
    };
    displayLives(mockCtx, mockPacman, mockDrawPacmanIcon);
    expect(mockDrawPacmanIcon).toHaveBeenCalledTimes(2);
    expect(mockDrawPacmanIcon).toHaveBeenNthCalledWith(1, mockCtx, {
      x: 580,
      y: 15,
    });
    expect(mockDrawPacmanIcon).toHaveBeenNthCalledWith(2, mockCtx, {
      x: 540,
      y: 15,
    });
  });

  it("calls drawPacmanIcon for the first icon only when the player has 1 extra life left", () => {
    const mockPacman = {
      lives: 1,
    };
    displayLives(mockCtx, mockPacman, mockDrawPacmanIcon);
    expect(mockDrawPacmanIcon).toHaveBeenCalledTimes(1);
    expect(mockDrawPacmanIcon).toHaveBeenCalledWith(mockCtx, {
      x: 580,
      y: 15,
    });
  });

  it("does not call drawPacmanIcon for either icon when the player has no extra lives left", () => {
    const mockPacman = {
      lives: 0,
    };
    displayLives(mockCtx, mockPacman, mockDrawPacmanIcon);
    expect(mockDrawPacmanIcon).toHaveBeenCalledTimes(0);
  });
});
