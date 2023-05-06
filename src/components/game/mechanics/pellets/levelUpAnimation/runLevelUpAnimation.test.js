import runLevelUpAnimation from "./runLevelUpAnimation";

jest.useFakeTimers();

let mockVariables;
let mockPacman;
let mockGhosts;
let mockPellets;
let mockPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockCtx;
let mockBoundary;
let mockBoundaries;
let mockAudioPlayer;
let mockRunLevelUpAnimation;
let mockDrawLevelUpBoard;
let mockResetAfterLevelUp;

describe("runLevelUpAnimation", () => {
  beforeEach(() => {
    mockVariables = {
      animationId: 54,
      levelUpCount: 0,
      level: 4,
    };
    mockPacman = {
      isLevellingUp: true,
    };
    mockGhosts = "ghosts";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockCtx = {
      font: undefined,
      fillStyle: undefined,
      textAlign: undefined,
      fillText: () => undefined,
    };
    mockBoundary = {
      flash: () => undefined,
    };
    mockBoundaries = [mockBoundary, mockBoundary];
    mockAudioPlayer = "audioPlayer";
    mockRunLevelUpAnimation = jest.fn();
    mockDrawLevelUpBoard = jest.fn();
    mockResetAfterLevelUp = jest.fn();
  });

  it("calls requestAnimationFrame on itself to begin the level up animation", () => {
    jest.spyOn(global, "requestAnimationFrame");
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(requestAnimationFrame).toHaveBeenCalledWith(expect.any(Function));
    jest.runOnlyPendingTimers();
    expect(mockRunLevelUpAnimation).toHaveBeenCalledTimes(1);
    expect(mockRunLevelUpAnimation).toHaveBeenCalledWith(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer
    );
  });

  it("calls drawLevelUpBoard", () => {
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(mockDrawLevelUpBoard).toHaveBeenCalledTimes(1);
    expect(mockDrawLevelUpBoard).toHaveBeenCalledWith(mockCtx, mockBoundaries);
  });

  it("calls flash on each boundary if levelUpCount is a multiple of 10", () => {
    mockVariables.levelUpCount = 150;
    jest.spyOn(mockBoundary, "flash");
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(mockBoundary.flash).toHaveBeenCalledTimes(2);
  });

  it("does not call flash on each boundary if levelUpCount is not a multiple of 10", () => {
    mockVariables.levelUpCount = 286;
    jest.spyOn(mockBoundary, "flash");
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(mockBoundary.flash).toHaveBeenCalledTimes(0);
  });

  it("increases levelUpCount by 1", () => {
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(mockVariables.levelUpCount).toBe(1);
  });

  it("changes isLevellingUp in Pac-Man back to false when the level up count reaches 350", () => {
    mockVariables.levelUpCount = 350;
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(mockPacman.isLevellingUp).toBeFalsy();
  });

  it("calls cancelAnimationFrame when the level up count reaches 350", () => {
    mockVariables.levelUpCount = 350;
    jest.spyOn(global, "cancelAnimationFrame");
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(
      mockVariables.animationId
    );
  });

  it("increases the level by 1 when the level up count reaches 350", () => {
    mockVariables.levelUpCount = 350;
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(mockVariables.level).toBe(5);
  });

  it("calls resetAfterLevelUp when the level up count reaches 350", () => {
    mockVariables.levelUpCount = 350;
    runLevelUpAnimation(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer,
      mockRunLevelUpAnimation,
      mockDrawLevelUpBoard,
      mockResetAfterLevelUp
    );
    expect(mockResetAfterLevelUp).toHaveBeenCalledTimes(1);
    expect(mockResetAfterLevelUp).toHaveBeenCalledWith(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer
    );
  });
});
