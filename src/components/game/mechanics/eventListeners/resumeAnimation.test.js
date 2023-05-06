import resumeAnimation from "./resumeAnimation";

let mockShrinkingPacman;
let mockLevellingUpPacman;
let mockPacman;
let mockVariables;
let mockCtx;
let mockBoundaries;
let mockPellets;
let mockPowerUps;
let mockGhosts;
let mockCycleTimer;
let mockScaredTimer;
let mockAudioPlayer;
let mockRunDeathAnimation;
let mockRunLevelUpAnimation;
let mockPlayGame;

describe("resumeAnimation", () => {
  beforeEach(() => {
    mockShrinkingPacman = {
      isShrinking: true,
      isLevellingUp: false,
    };
    mockLevellingUpPacman = {
      isShrinking: false,
      isLevellingUp: true,
    };
    mockPacman = {
      isShrinking: false,
      isLevellingUp: false,
    };
    mockVariables = {
      player: {
        username: "John",
      },
      reactRoot: "reactRoot",
    };
    mockCtx = "ctx";
    mockBoundaries = "boundaries";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockGhosts = "ghosts";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockAudioPlayer = "audioPlayer";
    mockRunDeathAnimation = jest.fn();
    mockRunLevelUpAnimation = jest.fn();
    mockPlayGame = jest.fn();
  });

  it("calls runDeathAnimation if isShrinking in PacMan is true", () => {
    resumeAnimation(
      mockVariables,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockShrinkingPacman,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockRunDeathAnimation,
      mockRunLevelUpAnimation,
      mockPlayGame
    );
    expect(mockRunDeathAnimation).toHaveBeenCalledTimes(1);
    expect(mockRunDeathAnimation).toHaveBeenCalledWith(
      mockVariables,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockShrinkingPacman,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer
    );
  });

  it("calls runLevelUpAnimation if isLevellingUp in PacMan is true", () => {
    resumeAnimation(
      mockVariables,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockLevellingUpPacman,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockRunDeathAnimation,
      mockRunLevelUpAnimation,
      mockPlayGame
    );
    expect(mockRunLevelUpAnimation).toHaveBeenCalledTimes(1);
    expect(mockRunLevelUpAnimation).toHaveBeenCalledWith(
      mockVariables,
      mockLevellingUpPacman,
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

  it("calls playGame if isShrinking and isLevellingUp in PacMan are both false", () => {
    resumeAnimation(
      mockVariables,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockPacman,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockRunDeathAnimation,
      mockRunLevelUpAnimation,
      mockPlayGame
    );
    expect(mockPlayGame).toHaveBeenCalledTimes(1);
    expect(mockPlayGame).toHaveBeenCalledWith(
      mockVariables.player,
      mockVariables.reactRoot
    );
  });
});
