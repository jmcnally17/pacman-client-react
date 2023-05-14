import Graphics from "./graphics";
import Animator from "./animator/animator";
import GhostCollision from "../physics/ghosts/collisions/ghostCollision";

jest.mock("./animator/animator");
jest.mock("../physics/ghosts/collisions/ghostCollision");

jest.useFakeTimers();

let variables;
let ctx;
let assets;
let shrunkPacman;
let runDeathAnimation;

describe("runDeathAnimation", () => {
  beforeEach(() => {
    Animator.mockClear();
    GhostCollision.mockClear();
    variables = {
      animationId: 98,
    };
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
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(Animator.drawBoard).toHaveBeenCalledTimes(1);
    expect(Animator.drawBoard).toHaveBeenCalledWith(ctx, assets);
  });

  it("calls shrink on Pac-Man if its radians is less than PI", () => {
    const pacman = assets["characters"]["pacman"];
    jest.spyOn(pacman, "shrink");
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(pacman.shrink).toHaveBeenCalledTimes(1);
    expect(pacman.shrink).toHaveBeenCalledWith(ctx);
  });

  it("changes isShrinking in Pac-Man to false when the death animation has finished", () => {
    assets.characters.pacman = shrunkPacman;
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(shrunkPacman.isShrinking).toBeFalsy();
  });

  it("calls cancelAnimationFrame when Pac-Man's death animation has finished", () => {
    jest.spyOn(global, "cancelAnimationFrame");
    assets.characters.pacman = shrunkPacman;
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(variables.animationId);
  });

  it("calls checkPacmanLives when Pac-Man's death animation has finished", () => {
    assets.characters.pacman = shrunkPacman;
    Graphics.runDeathAnimation(variables, ctx, assets, runDeathAnimation);
    expect(GhostCollision.checkPacmanLives).toHaveBeenCalledTimes(1);
    expect(GhostCollision.checkPacmanLives).toHaveBeenCalledWith(
      assets,
      variables,
      ctx
    );
  });
});
