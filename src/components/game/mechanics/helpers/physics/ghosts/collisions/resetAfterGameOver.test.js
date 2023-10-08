import GhostCollision from "./ghostCollision";

describe("resetAfterGameOver", () => {
  let eatenPellet;
  let eatenPellets;
  let pellet;
  let pellets;
  let eatenPowerUp;
  let eatenPowerUps;
  let powerUp;
  let powerUps;
  let ghost;
  let ghosts;
  let pacman;
  let cycleTimer;
  let scaredTimer;
  let assets;
  let variables;

  beforeEach(() => {
    eatenPellet = {
      hasBeenEaten: true,
      changeEatenState: () => undefined,
    };
    eatenPellets = [eatenPellet, eatenPellet, eatenPellet];
    pellet = { hasBeenEaten: false, changeEatenState: () => undefined };
    pellets = [pellet, pellet];
    eatenPowerUp = {
      hasBeenEaten: true,
      changeEatenState: () => undefined,
    };
    eatenPowerUps = [eatenPowerUp, eatenPowerUp];
    powerUp = { hasBeenEaten: false, changeEatenState: () => undefined };
    powerUps = [powerUp, powerUp, powerUp];
    ghost = { reset: () => undefined };
    ghosts = { red: ghost, pink: ghost, cyan: ghost, orange: ghost };
    pacman = { reset: () => undefined, lives: 0 };
    cycleTimer = { reset: () => undefined };
    scaredTimer = { reset: () => undefined, duration: 2500 };
    assets = {
      props: { pellets: pellets, powerUps: powerUps },
      characters: { ghosts: ghosts, pacman: pacman },
      timers: { cycleTimer: cycleTimer, scaredTimer: scaredTimer },
    };
    variables = {
      lastKeyPressed: "down",
      level: 5,
      directionEventListener: () => undefined,
      visibilityEventListener: () => undefined,
    };
  });

  it("calls changeEatenState on the pellets if they have been eaten", () => {
    assets.props.pellets = eatenPellets;
    jest.spyOn(eatenPellet, "changeEatenState");
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(eatenPellet.changeEatenState).toHaveBeenCalledTimes(3);
  });

  it("does not call changeEatenState on the pellets if they have not been eaten", () => {
    jest.spyOn(pellet, "changeEatenState");
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(pellet.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("calls changeEatenState on the power ups if they have been eaten", () => {
    assets.props.powerUps = eatenPowerUps;
    jest.spyOn(eatenPowerUp, "changeEatenState");
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(eatenPowerUp.changeEatenState).toHaveBeenCalledTimes(2);
  });

  it("does not call changeEatenState on the power ups if they have not been eaten", () => {
    jest.spyOn(powerUp, "changeEatenState");
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(powerUp.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("resets the cycle timer", () => {
    jest.spyOn(cycleTimer, "reset");
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(cycleTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the scared timer", () => {
    jest.spyOn(scaredTimer, "reset");
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(scaredTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("sets the duration on the scared timer back to 7000", () => {
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(scaredTimer.duration).toBe(7000);
  });

  it("resets the ghosts", () => {
    jest.spyOn(ghost, "reset");
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(ghost.reset).toHaveBeenCalledTimes(4);
  });

  it("resets Pac-Man", () => {
    jest.spyOn(pacman, "reset");
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(pacman.reset).toHaveBeenCalledTimes(1);
  });

  it("resets Pac-Man's lives back to 2", () => {
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(pacman.lives).toBe(2);
  });

  it("resets the last key pressed", () => {
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(variables.lastKeyPressed).toBe("");
  });

  it("resets the level back to 1", () => {
    GhostCollision.resetAfterGameOver(assets, variables);
    expect(variables.level).toBe(1);
  });
});
