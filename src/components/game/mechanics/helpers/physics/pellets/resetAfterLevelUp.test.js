import PelletManager from "./pelletManager";

describe("resetAfterLevelUp", () => {
  let pacman;
  let ghost;
  let ghosts;
  let pellet;
  let pellets;
  let eatenPowerUp;
  let eatenPowerUps;
  let powerUp;
  let powerUps;
  let cycleTimer;
  let scaredTimer;
  let audioPlayer;
  let assets;
  let variables;
  let playGame;

  beforeEach(() => {
    pacman = { reset: () => undefined };
    ghost = { reset: () => undefined };
    pellet = { changeEatenState: () => undefined };
    eatenPowerUp = { hasBeenEaten: true, changeEatenState: () => undefined };
    powerUp = { hasBeenEaten: false, changeEatenState: () => undefined };
    ghosts = { red: ghost, pink: ghost, cyan: ghost, orange: ghost };
    pellets = [pellet, pellet];
    eatenPowerUps = [eatenPowerUp];
    powerUps = [powerUp];
    cycleTimer = { reset: () => undefined, start: () => undefined };
    scaredTimer = { reset: () => undefined, duration: 5000 };
    audioPlayer = { ghostAudioWantsToPlay: false };
    assets = {
      props: { pellets: pellets, powerUps: powerUps },
      characters: { ghosts: ghosts, pacman: pacman },
      timers: { cycleTimer: cycleTimer, scaredTimer: scaredTimer },
      audioPlayer: audioPlayer,
    };
    variables = { lastKeyPressed: "up", levelUpCount: 1000 };
    playGame = jest.fn();
  });

  it("calls reset on Pac-Man", () => {
    jest.spyOn(pacman, "reset");
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(pacman.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the last key pressed", () => {
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(variables.lastKeyPressed).toBe("");
  });

  it("resets the level up count back to 0", () => {
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(variables.levelUpCount).toBe(0);
  });

  it("calls reset on the cycle timer", () => {
    jest.spyOn(cycleTimer, "reset");
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(cycleTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("calls reset on the scared timer", () => {
    jest.spyOn(scaredTimer, "reset");
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(scaredTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("decreases the duration on the scared timer by 500 if it is greater than 0", () => {
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(scaredTimer.duration).toBe(4500);
  });

  it("leaves the duration on the scared timer the same if it is equal to 0", () => {
    const scaredTimerZero = { reset: () => undefined, duration: 0 };
    assets.timers.scaredTimer = scaredTimerZero;
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(scaredTimerZero.duration).toBe(0);
  });

  it("calls reset on each ghost", () => {
    jest.spyOn(ghost, "reset");
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(ghost.reset).toHaveBeenCalledTimes(4);
  });

  it("calls changeEatenState on each pellet", () => {
    jest.spyOn(pellet, "changeEatenState");
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(pellet.changeEatenState).toHaveBeenCalledTimes(2);
  });

  it("calls changeEatenState on each power up if they have been eaten", () => {
    assets.props.powerUps = eatenPowerUps;
    jest.spyOn(eatenPowerUp, "changeEatenState");
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(eatenPowerUp.changeEatenState).toHaveBeenCalledTimes(1);
  });

  it("does not call changeEatenState on each power up if they have not been eaten", () => {
    jest.spyOn(powerUp, "changeEatenState");
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(powerUp.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("sets ghostAudioWantsToPlay to true", () => {
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(audioPlayer.ghostAudioWantsToPlay).toBe(true);
  });

  it("calls start on the cycle timer to restart it", () => {
    jest.spyOn(cycleTimer, "start");
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(cycleTimer.start).toHaveBeenCalledTimes(1);
  });

  it("calls playGame to restart the animation frames", () => {
    PelletManager.resetAfterLevelUp(assets, variables, playGame);
    expect(playGame).toHaveBeenCalledTimes(1);
  });
});
