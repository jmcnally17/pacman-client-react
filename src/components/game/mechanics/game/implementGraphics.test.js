import Game from "./game";
import Graphics from "../helpers/graphics/graphics";

jest.mock("../helpers/graphics/graphics");

describe("implementGraphics", () => {
  let variables;
  let pacman;
  let info;
  let ctx;

  beforeEach(() => {
    Graphics.mockClear();
    variables = "variables";
    pacman = "pacman";
    ctx = {
      clearRect: () => undefined,
      font: null,
      textBaseline: null,
    };
    info = {
      getContext: () => ctx,
      width: "500",
      height: "25",
    };
    jest.spyOn(document, "querySelector");
    jest.spyOn(info, "getContext");
    document.querySelector.mockReturnValue(info);
    info.getContext.mockReturnValue(ctx);
  });

  it("calls querySelector on the document to find the game info canvas element", () => {
    Game.implementGraphics(variables, pacman);
    expect(document.querySelector).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenCalledWith("#info");
  });

  it("calls getContext of the game info object to get ctx", () => {
    Game.implementGraphics(variables, pacman);
    expect(info.getContext).toHaveBeenCalledTimes(1);
    expect(info.getContext).toHaveBeenCalledWith("2d");
  });

  it("calls clearRect on the game info", () => {
    jest.spyOn(ctx, "clearRect");
    Game.implementGraphics(variables, pacman);
    expect(ctx.clearRect).toHaveBeenCalledTimes(1);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, info.width, info.height);
  });

  it("changes the ctx font to 20px microN56", () => {
    Game.implementGraphics(variables, pacman);
    expect(ctx.font).toBe("20px microN56");
  });

  it("changes the ctx textBaseline to middle", () => {
    Game.implementGraphics(variables, pacman);
    expect(ctx.textBaseline).toBe("middle");
  });

  it("calls displayScore to show the player's score", () => {
    Game.implementGraphics(variables, pacman);
    expect(Graphics.displayScore).toHaveBeenCalledTimes(1);
    expect(Graphics.displayScore).toHaveBeenCalledWith(ctx, variables);
  });

  it("calls displayLevel to show the player's current level", () => {
    Game.implementGraphics(variables, pacman);
    expect(Graphics.displayLevel).toHaveBeenCalledTimes(1);
    expect(Graphics.displayLevel).toHaveBeenCalledWith(ctx, variables);
  });

  it("calls displayLives to show the number of lives left", () => {
    Game.implementGraphics(variables, pacman);
    expect(Graphics.displayLives).toHaveBeenCalledTimes(1);
    expect(Graphics.displayLives).toHaveBeenCalledWith(ctx, pacman);
  });
});
