import PowerUpManager from "./powerUpManager";

let ghost;
let ghosts;
let cycleTimer;
let scaredTimer;
let assets;

describe("scareGhosts", () => {
  beforeEach(() => {
    ghost = {
      isScared: false,
      isRetreating: false,
      changeScaredState: () => undefined,
    };
    ghosts = [ghost, ghost, ghost, ghost];
    cycleTimer = { isRunning: true, pause: () => undefined };
    scaredTimer = { reset: () => undefined, start: () => undefined };
    assets = {
      characters: { ghosts: ghosts },
      timers: { cycleTimer: cycleTimer, scaredTimer: scaredTimer },
    };
    jest.spyOn(cycleTimer, "pause");
    jest.spyOn(scaredTimer, "reset");
    jest.spyOn(scaredTimer, "start");
  });

  it("pauses the cycleTimer if it is running", () => {
    PowerUpManager.scareGhosts(assets);
    expect(cycleTimer.pause).toHaveBeenCalledTimes(1);
  });

  it("does not pause the cycleTimer if it is not running", () => {
    cycleTimer.isRunning = false;
    PowerUpManager.scareGhosts(assets);
    expect(cycleTimer.pause).toHaveBeenCalledTimes(0);
  });

  it("resets the scaredTimer", () => {
    PowerUpManager.scareGhosts(assets);
    expect(scaredTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("calls changeScaredState if the ghosts are not scared or retreating", () => {
    jest.spyOn(ghost, "changeScaredState");
    PowerUpManager.scareGhosts(assets);
    expect(ghost.changeScaredState).toHaveBeenCalledTimes(4);
  });

  it("does not call changeScaredState if the ghosts are scared", () => {
    const scaredGhost = {
      isScared: true,
      isRetreating: false,
      changeScaredState: () => undefined,
    };
    assets["characters"]["ghosts"] = [
      scaredGhost,
      scaredGhost,
      scaredGhost,
      scaredGhost,
    ];
    jest.spyOn(scaredGhost, "changeScaredState");
    PowerUpManager.scareGhosts(assets);
    expect(scaredGhost.changeScaredState).toHaveBeenCalledTimes(0);
  });

  it("does not call changeScaredState if the ghosts are retreating", () => {
    const mockRetreatingGhost = {
      isScared: false,
      isRetreating: true,
      changeScaredState: () => undefined,
    };
    assets["characters"]["ghosts"] = [
      mockRetreatingGhost,
      mockRetreatingGhost,
      mockRetreatingGhost,
      mockRetreatingGhost,
    ];
    jest.spyOn(mockRetreatingGhost, "changeScaredState");
    PowerUpManager.scareGhosts(assets);
    expect(mockRetreatingGhost.changeScaredState).toHaveBeenCalledTimes(0);
  });

  it("starts the scaredTimer", () => {
    PowerUpManager.scareGhosts(assets);
    expect(scaredTimer.start).toHaveBeenCalledTimes(1);
    expect(scaredTimer.start).toHaveBeenCalledWith(cycleTimer);
  });
});
