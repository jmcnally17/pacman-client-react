import resetAfterGameOver from "./resetAfterGameOver";

let mockEatenPellet;
let mockEatenPellets;
let mockUneatenPellet;
let mockUneatenPellets;
let mockEatenPowerUp;
let mockEatenPowerUps;
let mockUneatenPowerUp;
let mockUneatenPowerUps;
let mockGhost;
let mockGhosts;
let mockPacman;
let mockVariables;
let mockCycleTimer;
let mockScaredTimer;

describe("resetAfterGameOver", () => {
  beforeEach(() => {
    mockEatenPellet = {
      hasBeenEaten: true,
      changeEatenState: () => undefined,
    };
    mockEatenPellets = [mockEatenPellet, mockEatenPellet, mockEatenPellet];
    mockUneatenPellet = {
      hasBeenEaten: false,
      changeEatenState: () => undefined,
    };
    mockUneatenPellets = [mockUneatenPellet, mockUneatenPellet];
    mockEatenPowerUp = {
      hasBeenEaten: true,
      changeEatenState: () => undefined,
    };
    mockEatenPowerUps = [mockEatenPowerUp, mockEatenPowerUp];
    mockUneatenPowerUp = {
      hasBeenEaten: false,
      changeEatenState: () => undefined,
    };
    mockUneatenPowerUps = [
      mockUneatenPowerUp,
      mockUneatenPowerUp,
      mockUneatenPowerUp,
    ];
    mockGhost = {
      reset: () => undefined,
    };
    mockGhosts = [mockGhost, mockGhost];
    mockPacman = {
      reset: () => undefined,
      lives: 0,
    };
    mockVariables = {
      lastKeyPressed: "down",
      level: 5,
      directionEventListener: () => undefined,
      visibilityEventListener: () => undefined,
    };
    mockCycleTimer = {
      reset: () => undefined,
    };
    mockScaredTimer = {
      reset: () => undefined,
      duration: 2500,
    };
  });

  it("calls changeEatenState on the pellets if they have been eaten", () => {
    jest.spyOn(mockEatenPellet, "changeEatenState");
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockEatenPellet.changeEatenState).toHaveBeenCalledTimes(3);
  });

  it("does not call changeEatenState on the pellets if they have not been eaten", () => {
    jest.spyOn(mockUneatenPellet, "changeEatenState");
    resetAfterGameOver(
      mockUneatenPellets,
      mockUneatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockUneatenPellet.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("calls changeEatenState on the power ups if they have been eaten", () => {
    jest.spyOn(mockEatenPowerUp, "changeEatenState");
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockEatenPowerUp.changeEatenState).toHaveBeenCalledTimes(2);
  });

  it("does not call changeEatenState on the power ups if they have not been eaten", () => {
    jest.spyOn(mockUneatenPowerUp, "changeEatenState");
    resetAfterGameOver(
      mockUneatenPellets,
      mockUneatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockUneatenPowerUp.changeEatenState).toHaveBeenCalledTimes(0);
  });

  it("resets the cycle timer", () => {
    jest.spyOn(mockCycleTimer, "reset");
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockCycleTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("resets the scared timer", () => {
    jest.spyOn(mockScaredTimer, "reset");
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockScaredTimer.reset).toHaveBeenCalledTimes(1);
  });

  it("sets the duration on the scared timer back to 7000", () => {
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockScaredTimer.duration).toBe(7000);
  });

  it("resets the ghosts", () => {
    jest.spyOn(mockGhost, "reset");
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockGhost.reset).toHaveBeenCalledTimes(2);
  });

  it("resets Pac-Man", () => {
    jest.spyOn(mockPacman, "reset");
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockPacman.reset).toHaveBeenCalledTimes(1);
  });

  it("resets Pac-Man's lives back to 2", () => {
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockPacman.lives).toBe(2);
  });

  it("resets the last key pressed", () => {
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockVariables.lastKeyPressed).toBe("");
  });

  it("resets the level back to 1", () => {
    resetAfterGameOver(
      mockEatenPellets,
      mockEatenPowerUps,
      mockGhosts,
      mockPacman,
      mockVariables,
      mockCycleTimer,
      mockScaredTimer
    );
    expect(mockVariables.level).toBe(1);
  });
});
