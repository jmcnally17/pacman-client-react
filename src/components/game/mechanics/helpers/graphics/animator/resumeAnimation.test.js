import Animator from "./animator";
import Graphics from "../graphics";

jest.mock("../graphics");

describe("resumeAnimation", () => {
  let shrinkingPacman;
  let levellingUpPacman;
  let pacman;
  let variables;
  let ctx;
  let assets;
  let playGame;

  beforeEach(() => {
    Graphics.mockClear();
    shrinkingPacman = { isShrinking: true, isLevellingUp: false };
    levellingUpPacman = { isShrinking: false, isLevellingUp: true };
    pacman = { isShrinking: false, isLevellingUp: false };
    variables = { player: { username: "John" }, reactRoot: "reactRoot" };
    ctx = "ctx";
    assets = { characters: { pacman: pacman } };
    playGame = jest.fn();
  });

  it("calls runDeathAnimation if isShrinking in PacMan is true", () => {
    assets.characters.pacman = shrinkingPacman;
    Animator.resumeAnimation(variables, ctx, assets, playGame);
    expect(Graphics.runDeathAnimation).toHaveBeenCalledTimes(1);
    expect(Graphics.runDeathAnimation).toHaveBeenCalledWith(
      variables,
      ctx,
      assets
    );
  });

  it("calls runLevelUpAnimation if isLevellingUp in PacMan is true", () => {
    assets.characters.pacman = levellingUpPacman;
    Animator.resumeAnimation(variables, ctx, assets, playGame);
    expect(Graphics.runLevelUpAnimation).toHaveBeenCalledTimes(1);
    expect(Graphics.runLevelUpAnimation).toHaveBeenCalledWith(
      variables,
      assets,
      ctx
    );
  });

  it("calls playGame if isShrinking and isLevellingUp in PacMan are both false", () => {
    Animator.resumeAnimation(variables, ctx, assets, playGame);
    expect(playGame).toHaveBeenCalledTimes(1);
    expect(playGame).toHaveBeenCalledWith(
      variables.player,
      variables.reactRoot
    );
  });
});
