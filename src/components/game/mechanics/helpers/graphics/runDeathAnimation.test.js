import Graphics from "./graphics";
import Animator from "./animator/animator";
import GhostCollision from "../physics/ghosts/collisions/ghostCollision";

jest.mock("./animator/animator");
jest.mock("../physics/ghosts/collisions/ghostCollision");

jest.useFakeTimers();

describe("runDeathAnimation", () => {
  let variables;
  let ctx;
  let assets;
  let shrunkPacman;
  let runDeathAnimation;

  beforeEach(() => {
    Animator.mockClear();
    GhostCollision.mockClear();
    variables = { animationId: 98, frameLifetime: 10, startTime: 100 };
    ctx = "ctx";
    assets = {
      characters: { pacman: { radians: 0, shrink: () => undefined } },
    };
    shrunkPacman = {
      radians: Math.PI,
      isShrinking: true,
      shrink: () => undefined,
    };
    runDeathAnimation = jest.fn();
    jest.spyOn(performance, "now");
  });

  it("calls requestAnimationFrame on itself to begin the death animation", () => {
    jest.spyOn(global, "requestAnimationFrame");
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(requestAnimationFrame).toHaveBeenCalledWith(expect.any(Function));
    jest.runOnlyPendingTimers();
    expect(runDeathAnimation).toHaveBeenCalledTimes(1);
    expect(runDeathAnimation).toHaveBeenCalledWith(variables, ctx, assets);
  });

  it("calls drawBoard", () => {
    performance.now.mockReturnValue(110);
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(Animator.drawBoard).toHaveBeenCalledTimes(1);
    expect(Animator.drawBoard).toHaveBeenCalledWith(ctx, assets);
  });

  it("calls shrink on Pac-Man if its radians is less than PI", () => {
    performance.now.mockReturnValue(110);
    const pacman = assets.characters.pacman;
    jest.spyOn(pacman, "shrink");
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(pacman.shrink).toHaveBeenCalledTimes(1);
    expect(pacman.shrink).toHaveBeenCalledWith(ctx);
  });

  it("changes isShrinking in Pac-Man to false when the death animation has finished", () => {
    performance.now.mockReturnValue(110);
    assets.characters.pacman = shrunkPacman;
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(shrunkPacman.isShrinking).toBeFalsy();
  });

  it("calls cancelAnimationFrame when Pac-Man's death animation has finished", () => {
    performance.now.mockReturnValue(110);
    jest.spyOn(global, "cancelAnimationFrame");
    assets.characters.pacman = shrunkPacman;
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(variables.animationId);
  });

  it("calls checkPacmanLives when Pac-Man's death animation has finished", () => {
    performance.now.mockReturnValue(110);
    assets.characters.pacman = shrunkPacman;
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(GhostCollision.checkPacmanLives).toHaveBeenCalledTimes(1);
    expect(GhostCollision.checkPacmanLives).toHaveBeenCalledWith(
      assets,
      variables,
      ctx
    );
  });

  it("sets the startTime to the updated time from performance.now()", () => {
    performance.now.mockReturnValue(110);
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(variables.startTime).toBe(110);
  });
});
