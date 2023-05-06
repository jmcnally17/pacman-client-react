import resetAfterLevelUp from "./resetAfterLevelUp";

let mockPacman;
let mockVariables;
let mockGhost;
let mockGhosts;
let mockPellet;
let mockPellets;
let mockEatenPowerUp;
let mockEatenPowerUps;
let mockUneatenPowerUp;
let mockUneatenPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockAudioPlayer;
let mockPlayGame;

describe("resetAfterLevelUp", () => {
  beforeEach(() => {
    mockPacman = {
      reset: () => undefined,
    };
    mockVariables = {
      lastKeyPressed: "up",
      levelUpCount: 1000,
    };
    mockGhost = {
      reset: () => undefined,
    };
    mockPellet = {
      changeEatenState: () => undefined,
    };
    mockEatenPowerUp = {
      hasBeenEaten: true,
      changeEatenState: () => undefined,
    };
    mockUneatenPowerUp = {
      hasBeenEaten: false,
      changeEatenState: () => undefined,
    };
    mockGhosts = [mockGhost, mockGhost, mockGhost];
    mockPellets = [mockPellet, mockPellet];
    mockEatenPowerUps = [mockEatenPowerUp];
    mockUneatenPowerUps = [mockUneatenPowerUp];
    mockCycleTimer = {
      reset: () => undefined,
      start: () => undefined,
    };
    mockScaredTimer = {
      reset: () => undefined,
      duration: 5000,
    };
    mockAudioPlayer = {
      ghostAudioWantsToPlay: false,
    };
    mockPlayGame = jest.fn();
  });

  it("calls reset on Pac-Man", () => {
    jest.spyOn(mockPacman, "reset");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockPacman.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the last key pressed", () => {
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockVariables.lastKeyPressed).toBe("");
  });

  it("resets the level up count back to 0", () => {
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockVariables.levelUpCount).toBe(0);
  });

  it("calls reset on the cycle timer", () => {
    jest.spyOn(mockCycleTimer, "reset");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockCycleTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("calls reset on the scared timer", () => {
    jest.spyOn(mockScaredTimer, "reset");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockScaredTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("decreases the duration on the scared timer by 500 if it is greater than 0", () => {
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockScaredTimer.duration).toBe(4500);
  });

  it("leaves the duration on the scared timer the same if it is equal to 0", () => {
    const mockScaredTimerZero = {
      reset: () => undefined,
      duration: 0,
    };
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimerZero,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockScaredTimerZero.duration).toBe(0);
  });

  it("calls reset on each ghost", () => {
    jest.spyOn(mockGhost, "reset");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockGhost.reset).toHaveBeenCalledTimes(3);
  });

  it("calls changeEatenState on each pellet", () => {
    jest.spyOn(mockPellet, "changeEatenState");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockPellet.changeEatenState).toHaveBeenCalledTimes(2);
  });

  it("calls changeEatenState on each power up if they have been eaten", () => {
    jest.spyOn(mockEatenPowerUp, "changeEatenState");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockEatenPowerUp.changeEatenState).toHaveBeenCalledTimes(1);
  });

  it("does not call changeEatenState on each power up if they have not been eaten", () => {
    jest.spyOn(mockUneatenPowerUp, "changeEatenState");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockUneatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockUneatenPowerUp.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("sets ghostAudioWantsToPlay to true", () => {
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockAudioPlayer.ghostAudioWantsToPlay).toBe(true);
  });

  it("calls start on the cycle timer to restart it", () => {
    jest.spyOn(mockCycleTimer, "start");
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockCycleTimer.start).toHaveBeenCalledTimes(1);
  });

  it("calls playGame to restart the animation frames", () => {
    resetAfterLevelUp(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockEatenPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockPlayGame
    );
    expect(mockPlayGame).toHaveBeenCalledTimes(1);
  });
});
