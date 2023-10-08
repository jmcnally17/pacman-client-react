import PelletManager from "./pelletManager";
import Graphics from "../../graphics/graphics";

jest.mock("../../graphics/graphics");

describe("checkLevelUpCondition", () => {
  let eatenPellet;
  let eatenPellets;
  let pellet;
  let pellets;
  let pacman;
  let audioPlayer;
  let assets;
  let variables;
  let ctx;

  beforeEach(() => {
    Graphics.mockClear();
    eatenPellet = { hasBeenEaten: true };
    eatenPellets = [eatenPellet, eatenPellet, eatenPellet];
    pellet = { hasBeenEaten: false };
    pellets = [pellet, pellet];
    pacman = { isLevellingUp: false };
    audioPlayer = {
      stopGhostAudio: () => undefined,
      playLevelUp: () => undefined,
    };
    assets = {
      props: { pellets: eatenPellets },
      characters: { pacman: pacman },
      audioPlayer: audioPlayer,
    };
    variables = { animationId: 43, level: 3 };
    ctx = "ctx";
  });

  it("calls cancelAnimationFrame if all pellets have been eaten", () => {
    jest.spyOn(global, "cancelAnimationFrame");
    PelletManager.checkLevelUpCondition(assets, variables, ctx);
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(variables.animationId);
  });

  it("calls stopGhostAudio on the audioPlayer if all pellets have been eaten", () => {
    jest.spyOn(audioPlayer, "stopGhostAudio");
    PelletManager.checkLevelUpCondition(assets, variables, ctx);
    expect(audioPlayer.stopGhostAudio).toHaveBeenCalledTimes(1);
  });

  it("calls playLevelUp on the audioPlayer if all pellets have been eaten", () => {
    jest.spyOn(audioPlayer, "playLevelUp");
    PelletManager.checkLevelUpCondition(assets, variables, ctx);
    expect(audioPlayer.playLevelUp).toHaveBeenCalledTimes(1);
  });

  it("changes isLevellingUp in Pac-Man to true if all pellets have been eaten", () => {
    PelletManager.checkLevelUpCondition(assets, variables, ctx);
    expect(pacman.isLevellingUp).toBeTruthy();
  });

  it("calls runLevelUpAnimation if all pellets have been eaten", () => {
    PelletManager.checkLevelUpCondition(assets, variables, ctx);
    expect(Graphics.runLevelUpAnimation).toHaveBeenCalledTimes(1);
    expect(Graphics.runLevelUpAnimation).toHaveBeenCalledWith(
      variables,
      assets,
      ctx
    );
  });

  it("does not call runLevelUpAnimation if all pellets have not been eaten", () => {
    assets.props.pellets = pellets;
    PelletManager.checkLevelUpCondition(assets, variables, ctx);
    expect(Graphics.runLevelUpAnimation).toHaveBeenCalledTimes(0);
  });
});
