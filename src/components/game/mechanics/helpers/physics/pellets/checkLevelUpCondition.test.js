import checkLevelUpCondition from "./checkLevelUpCondition";

let mockEatenPellet;
let mockEatenPellets;
let mockUneatenPellet;
let mockUneatenPellets;
let mockPacman;
let mockVariables;
let mockGhosts;
let mockPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockCtx;
let mockAudioPlayer;
let mockBoundaries;
let mockRunLevelUpAnimation;

describe("checkLevelUpCondition", () => {
  beforeEach(() => {
    mockEatenPellet = {
      hasBeenEaten: true,
    };
    mockEatenPellets = [mockEatenPellet, mockEatenPellet, mockEatenPellet];
    mockUneatenPellet = {
      hasBeenEaten: false,
    };
    mockUneatenPellets = [mockUneatenPellet, mockUneatenPellet];
    mockPacman = {
      isLevellingUp: false,
    };
    mockVariables = {
      animationId: 43,
      level: 3,
    };
    mockGhosts = "ghosts";
    mockPowerUps = "powerUps";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockCtx = "ctx";
    mockAudioPlayer = {
      stopGhostAudio: () => undefined,
      playLevelUp: () => undefined,
    };
    mockBoundaries = "boundaries";
    mockRunLevelUpAnimation = jest.fn();
  });

  it("calls cancelAnimationFrame if all pellets have been eaten", () => {
    jest.spyOn(global, "cancelAnimationFrame");
    checkLevelUpCondition(
      mockEatenPellets,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockBoundaries,
      mockRunLevelUpAnimation
    );
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(
      mockVariables.animationId
    );
  });

  it("calls stopGhostAudio on the audioPlayer if all pellets have been eaten", () => {
    jest.spyOn(mockAudioPlayer, "stopGhostAudio");
    checkLevelUpCondition(
      mockEatenPellets,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockBoundaries,
      mockRunLevelUpAnimation
    );
    expect(mockAudioPlayer.stopGhostAudio).toHaveBeenCalledTimes(1);
  });

  it("calls playLevelUp on the audioPlayer if all pellets have been eaten", () => {
    jest.spyOn(mockAudioPlayer, "playLevelUp");
    checkLevelUpCondition(
      mockEatenPellets,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockBoundaries,
      mockRunLevelUpAnimation
    );
    expect(mockAudioPlayer.playLevelUp).toHaveBeenCalledTimes(1);
  });

  it("changes isLevellingUp in Pac-Man to true if all pellets have been eaten", () => {
    checkLevelUpCondition(
      mockEatenPellets,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockBoundaries,
      mockRunLevelUpAnimation
    );
    expect(mockPacman.isLevellingUp).toBeTruthy();
  });

  it("calls runLevelUpAnimation if all pellets have been eaten", () => {
    checkLevelUpCondition(
      mockEatenPellets,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockBoundaries,
      mockRunLevelUpAnimation
    );
    expect(mockRunLevelUpAnimation).toHaveBeenCalledTimes(1);
    expect(mockRunLevelUpAnimation).toHaveBeenCalledWith(
      mockVariables,
      mockPacman,
      mockGhosts,
      mockEatenPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockBoundaries,
      mockAudioPlayer
    );
  });

  it("does not call runLevelUpAnimation if all pellets have not been eaten", () => {
    checkLevelUpCondition(
      mockUneatenPellets,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockBoundaries,
      mockRunLevelUpAnimation
    );
    expect(mockRunLevelUpAnimation).toHaveBeenCalledTimes(0);
  });
});
