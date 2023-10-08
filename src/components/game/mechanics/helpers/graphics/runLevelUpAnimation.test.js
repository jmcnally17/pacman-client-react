import Graphics from "./graphics";
import Animator from "./animator/animator";
import PelletManager from "../physics/pellets/pelletManager";

jest.mock("./animator/animator");
jest.mock("../physics/pellets/pelletManager");

jest.useFakeTimers();

describe("runLevelUpAnimation", () => {
  let variables;
  let assets;
  let ctx;
  let boundary;
  let runLevelUpAnimation;

  beforeEach(() => {
    Animator.mockClear();
    PelletManager.mockClear();
    variables = {
      animationId: 54,
      levelUpCount: 0,
      level: 4,
      frameLifetime: 10,
      startTime: 100,
    };
    boundary = { flash: () => undefined };
    assets = {
      props: { boundaries: [boundary, boundary] },
      characters: { pacman: { isLevellingUp: true } },
    };
    ctx = {
      font: undefined,
      fillStyle: undefined,
      textAlign: undefined,
      fillText: () => undefined,
    };
    runLevelUpAnimation = jest.fn();
    jest.spyOn(performance, "now");
  });

  it("calls requestAnimationFrame on itself to begin the level up animation", () => {
    jest.spyOn(global, "requestAnimationFrame");
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(requestAnimationFrame).toHaveBeenCalledWith(expect.any(Function));
    jest.runOnlyPendingTimers();
    expect(runLevelUpAnimation).toHaveBeenCalledTimes(1);
    expect(runLevelUpAnimation).toHaveBeenCalledWith(variables, assets, ctx);
  });

  it("calls drawLevelUpBoard", () => {
    performance.now.mockReturnValue(110);
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(Animator.drawLevelUpBoard).toHaveBeenCalledTimes(1);
    expect(Animator.drawLevelUpBoard).toHaveBeenCalledWith(
      ctx,
      assets.props.boundaries
    );
  });

  it("calls flash on each boundary if levelUpCount is a multiple of 10", () => {
    performance.now.mockReturnValue(110);
    variables.levelUpCount = 150;
    jest.spyOn(boundary, "flash");
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(boundary.flash).toHaveBeenCalledTimes(2);
  });

  it("does not call flash on each boundary if levelUpCount is not a multiple of 10", () => {
    performance.now.mockReturnValue(110);
    variables.levelUpCount = 286;
    jest.spyOn(boundary, "flash");
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(boundary.flash).toHaveBeenCalledTimes(0);
  });

  it("increases levelUpCount by 1", () => {
    performance.now.mockReturnValue(110);
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(variables.levelUpCount).toBe(1);
  });

  it("changes isLevellingUp in Pac-Man back to false when the level up count reaches 350", () => {
    performance.now.mockReturnValue(110);
    variables.levelUpCount = 350;
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(assets.characters.pacman.isLevellingUp).toBeFalsy();
  });

  it("calls cancelAnimationFrame when the level up count reaches 350", () => {
    performance.now.mockReturnValue(110);
    variables.levelUpCount = 350;
    jest.spyOn(global, "cancelAnimationFrame");
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(variables.animationId);
  });

  it("increases the level by 1 when the level up count reaches 350", () => {
    performance.now.mockReturnValue(110);
    variables.levelUpCount = 350;
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(variables.level).toBe(5);
  });

  it("calls resetAfterLevelUp when the level up count reaches 350", () => {
    performance.now.mockReturnValue(110);
    variables.levelUpCount = 350;
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(PelletManager.resetAfterLevelUp).toHaveBeenCalledTimes(1);
    expect(PelletManager.resetAfterLevelUp).toHaveBeenCalledWith(
      assets,
      variables
    );
  });

  it("sets the startTime to the updated time from performance.now()", () => {
    performance.now.mockReturnValue(110);
    Graphics.runLevelUpAnimation(variables, assets, ctx, runLevelUpAnimation);
    expect(variables.startTime).toBe(110);
  });
});
