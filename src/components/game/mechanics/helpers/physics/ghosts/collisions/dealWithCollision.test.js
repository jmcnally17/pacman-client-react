import GhostCollision from "./ghostCollision";
import Graphics from "../../../graphics/graphics";

jest.mock("../../../graphics/graphics");

describe("GhostCollision.dealWithCollision", () => {
  let ghost;
  let retreatingTimer;
  let scaredGhost;
  let pacman;
  let audioPlayer;
  let assets;
  let variables;
  let ctx;

  beforeEach(() => {
    Graphics.mockClear();
    ghost = {
      isScared: false,
      isRetreating: false,
      reset: () => undefined,
      checkSpeedMatchesState: () => undefined,
    };
    retreatingTimer = { start: () => undefined };
    scaredGhost = {
      isScared: true,
      changeScaredState: () => undefined,
      isRetreating: false,
      changeRetreatingState: () => undefined,
      retreatingTimer: retreatingTimer,
      assignSprite: () => undefined,
      checkSpeedMatchesState: () => undefined,
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
    jest.spyOn(retreatingTimer, "start");
    jest.spyOn(scaredGhost, "changeScaredState");
    jest.spyOn(scaredGhost, "assignSprite");
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
    jest.spyOn(scaredGhost, "checkSpeedMatchesState");
    GhostCollision.dealWithCollision(scaredGhost, assets, variables, ctx);
    expect(scaredGhost.changeRetreatingState).toHaveBeenCalledTimes(1);
    expect(scaredGhost.retreatingTimer.start).toHaveBeenCalledTimes(1);
    expect(scaredGhost.changeScaredState).toHaveBeenCalledTimes(1);
    expect(scaredGhost.assignSprite).toHaveBeenCalledTimes(1);
    expect(scaredGhost.checkSpeedMatchesState).toHaveBeenCalledTimes(1);
  });

  it("has no effect when the ghost is retreating", () => {
    const mockRetreatingGhost = {
      isScared: false,
      isRetreating: true,
      changeRetreatingState: () => undefined,
      changeScaredState: () => undefined,
      assignSprite: () => undefined,
      checkSpeedMatchesState: () => undefined,
      retreatingTimer: retreatingTimer,
    };
    jest.spyOn(mockRetreatingGhost, "changeRetreatingState");
    jest.spyOn(mockRetreatingGhost, "changeScaredState");
    jest.spyOn(mockRetreatingGhost, "assignSprite");
    jest.spyOn(mockRetreatingGhost, "checkSpeedMatchesState");
    GhostCollision.dealWithCollision(
      mockRetreatingGhost,
      assets,
      variables,
      ctx
    );
    expect(Graphics.runDeathAnimation).toHaveBeenCalledTimes(0);
    expect(variables.score).toBe(100);
    expect(variables.killCount).toBe(2);
    expect(mockRetreatingGhost.changeRetreatingState).toHaveBeenCalledTimes(0);
    expect(mockRetreatingGhost.retreatingTimer.start).toHaveBeenCalledTimes(0);
    expect(mockRetreatingGhost.changeScaredState).toHaveBeenCalledTimes(0);
    expect(mockRetreatingGhost.assignSprite).toHaveBeenCalledTimes(0);
    expect(mockRetreatingGhost.checkSpeedMatchesState).toHaveBeenCalledTimes(0);
  });
});
