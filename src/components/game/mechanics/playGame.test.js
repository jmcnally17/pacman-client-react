import playGame from "./playGame";
import Game from "./game/game";

jest.mock("./game/game");

let player;
let reactRoot;
let ctx;
let board;

describe("playGame", () => {
  beforeEach(() => {
    Game.mockClear();
    player = {
      username: "John",
    };
    reactRoot = "reactRoot";
    jest.spyOn(global, "requestAnimationFrame");
    ctx = {
      clearRect: () => undefined,
    };
    jest.spyOn(ctx, "clearRect");
    board = {
      getContext: () => undefined,
      width: 896,
      height: 992,
    };
    jest.spyOn(board, "getContext");
    jest.spyOn(document, "querySelector");
    document.querySelector.mockReturnValue(board);
    board.getContext.mockReturnValue(ctx);
  });

  it("calls finishSetup", () => {
    playGame(player, reactRoot);
    expect(Game.finishSetup).toHaveBeenCalledTimes(1);
  });

  it("calls requestAnimationFrame", () => {
    playGame(player, reactRoot);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(requestAnimationFrame).toHaveBeenCalledWith(playGame);
  });

  it("finds the board element and calls getContext and clearRect on it", () => {
    playGame(player, reactRoot);
    expect(document.querySelector).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenCalledWith("#board");
    expect(board.getContext).toHaveBeenCalledTimes(1);
    expect(board.getContext).toHaveBeenCalledWith("2d");
    expect(ctx.clearRect).toHaveBeenCalledTimes(1);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, board.width, board.height);
  });

  it("calls implementObjects", () => {
    playGame(player, reactRoot);
    expect(Game.implementPhysics).toHaveBeenCalledTimes(1);
  });

  it("calls updateDisplay", () => {
    playGame(player, reactRoot);
    expect(Game.implementGraphics).toHaveBeenCalledTimes(1);
  });

  it("calls manageGhostAudio", () => {
    playGame(player, reactRoot);
    expect(Game.manageGhostAudio).toHaveBeenCalledTimes(1);
  });
});
