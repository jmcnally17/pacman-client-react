import GhostCollision from "./ghostCollision";
import Graphics from "../../../graphics/graphics";

jest.mock("../../../graphics/graphics");

let ghost;
let scaredGhost;
let pacman;
let audioPlayer;
let assets;
let variables;
let ctx;

describe("GhostCollision.dealWithCollision", () => {
  beforeEach(() => {
    Graphics.mockClear();
    ghost = {
      isScared: false,
      isRetreating: false,
      reset: () => undefined,
    };
    scaredGhost = {
      isScared: true,
      changeScaredState: () => undefined,
      isRetreating: false,
      changeRetreatingState: () => undefined,
      retreatingTimer: { start: () => undefined },
    };
    pacman = { radians: Math.PI / 24, isShrinking: false };
    audioPlayer = {
      stopGhostAudio: () => undefined,
      playPacmanDeath: () => undefined,
    };
    assets = { characters: { pacman: pacman }, audioPlayer: audioPlayer };
    variables = { score: 100, killCount: 2, animationId: 97 };
    ctx = "ctx";
    jest.spyOn(scaredGhost, "changeRetreatingState");
    jest.spyOn(scaredGhost.retreatingTimer, "start");
    jest.spyOn(scaredGhost, "changeScaredState");
  });

  it("sets the radians in Pac-Man to PI / 4 if the ghost is not scared or retreating", () => {
    GhostCollision.dealWithCollision(ghost, assets, variables, ctx);
    expect(pacman.radians).toBe(Math.PI / 4);
  });

  it("calls cancelAnimationFrame if the ghost is not scared or retreating", () => {
    jest.spyOn(global, "cancelAnimationFrame");
    GhostCollision.dealWithCollision(ghost, assets, variables, ctx);
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(variables.animationId);
  });

  it("calls stopGhostAudio on the audioPlayer if the ghost is not scared or retreating", () => {
    jest.spyOn(audioPlayer, "stopGhostAudio");
    GhostCollision.dealWithCollision(ghost, assets, variables, ctx);
    expect(audioPlayer.stopGhostAudio).toHaveBeenCalledTimes(1);
  });

  it("calls playPacmanDeath on the audioPlayer if the ghost is not scared or retreating", () => {
    jest.spyOn(audioPlayer, "playPacmanDeath");
    GhostCollision.dealWithCollision(ghost, assets, variables, ctx);
    expect(audioPlayer.playPacmanDeath).toHaveBeenCalledTimes(1);
  });

  it("changes isShrinking in Pac-Man to true if the ghost is not scared or retreating", () => {
    GhostCollision.dealWithCollision(ghost, assets, variables, ctx);
    expect(pacman.isShrinking).toBeTruthy();
  });

  it("calls runDeathAnimation if the ghost is not scared or retreating", () => {
    GhostCollision.dealWithCollision(ghost, assets, variables, ctx);
    expect(Graphics.runDeathAnimation).toHaveBeenCalledTimes(1);
    expect(Graphics.runDeathAnimation).toHaveBeenCalledWith(
      variables,
      ctx,
      assets
    );
  });

  it("increases the score and kill count if the ghost is scared", () => {
    GhostCollision.dealWithCollision(scaredGhost, assets, variables, ctx);
    expect(variables.score).toBe(900);
    expect(variables.killCount).toBe(3);
  });

  it("sends the ghost into retreating mode if the ghost is scared", () => {
    GhostCollision.dealWithCollision(scaredGhost, assets, variables, ctx);
    expect(scaredGhost.changeRetreatingState).toHaveBeenCalledTimes(1);
    expect(scaredGhost.retreatingTimer.start).toHaveBeenCalledTimes(1);
    expect(scaredGhost.changeScaredState).toHaveBeenCalledTimes(1);
  });

  it("has no effect when the ghost is retreating", () => {
    const mockRetreatingGhost = { isScared: false, isRetreating: true };
    GhostCollision.dealWithCollision(
      mockRetreatingGhost,
      assets,
      variables,
      ctx
    );
    expect(Graphics.runDeathAnimation).toHaveBeenCalledTimes(0);
    expect(variables.score).toBe(100);
    expect(variables.killCount).toBe(2);
    expect(scaredGhost.changeRetreatingState).toHaveBeenCalledTimes(0);
    expect(scaredGhost.retreatingTimer.start).toHaveBeenCalledTimes(0);
    expect(scaredGhost.changeScaredState).toHaveBeenCalledTimes(0);
  });
});
