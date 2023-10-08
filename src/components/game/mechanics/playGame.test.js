import playGame, { variables, assets } from "./playGame";
import Game from "./game/game";

jest.mock("./game/game");

describe("playGame", () => {
  let player;
  let reactRoot;
  let ctx;
  let board;

  beforeEach(() => {
    Game.mockClear();
    player = { username: "John" };
    reactRoot = "reactRoot";
    jest.spyOn(global, "requestAnimationFrame");
    ctx = { clearRect: () => undefined };
    jest.spyOn(ctx, "clearRect");
    board = { getContext: () => undefined, width: 896, height: 992 };
    jest.spyOn(board, "getContext");
    jest.spyOn(document, "querySelector");
    document.querySelector.mockReturnValue(board);
    board.getContext.mockReturnValue(ctx);
    variables.startTime = 0;
    jest.spyOn(performance, "now");
  });

  it("calls finishSetup", () => {
    playGame(player, reactRoot);
    expect(Game.finishSetup).toHaveBeenCalledTimes(1);
    expect(Game.finishSetup).toHaveBeenCalledWith(
      variables,
      player,
      reactRoot,
      assets,
      ctx
    );
  });

  it("calls requestAnimationFrame", () => {
    playGame(player, reactRoot);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(requestAnimationFrame).toHaveBeenCalledWith(playGame);
  });

  it("finds the board element and calls getContext and clearRect on it", () => {
    performance.now.mockReturnValue(110);
    playGame(player, reactRoot);
    expect(document.querySelector).toHaveBeenCalledTimes(1);
    expect(document.querySelector).toHaveBeenCalledWith("#board");
    expect(board.getContext).toHaveBeenCalledTimes(1);
    expect(board.getContext).toHaveBeenCalledWith("2d");
    expect(ctx.clearRect).toHaveBeenCalledTimes(1);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, board.width, board.height);
  });

  it("calls implementObjects", () => {
    performance.now.mockReturnValue(110);
    playGame(player, reactRoot);
    expect(Game.implementPhysics).toHaveBeenCalledTimes(1);
    expect(Game.implementPhysics).toHaveBeenCalledWith(assets, ctx, variables);
  });

  it("calls implementGraphics", () => {
    performance.now.mockReturnValue(110);
    playGame(player, reactRoot);
    expect(Game.implementGraphics).toHaveBeenCalledTimes(1);
    expect(Game.implementGraphics).toHaveBeenCalledWith(
      variables,
      assets.characters.pacman
    );
  });

  it("calls manageGhostAudio", () => {
    performance.now.mockReturnValue(110);
    playGame(player, reactRoot);
    expect(Game.manageGhostAudio).toHaveBeenCalledTimes(1);
    expect(Game.manageGhostAudio).toHaveBeenCalledWith(assets);
  });
});
