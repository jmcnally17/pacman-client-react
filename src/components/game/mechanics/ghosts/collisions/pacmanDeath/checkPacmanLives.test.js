import checkPacmanLives from "./checkPacmanLives";

let mockPacman;
let mockNoLivesPacman;
let mockVariables;
let mockGhosts;
let mockPellets;
let mockPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockCtx;
let mockAudioPlayer;
let mockEndGame;
let mockResetAfterDeath;

describe("checkPacmanLives", () => {
  beforeEach(() => {
    mockPacman = {
      lives: 2,
    };
    mockNoLivesPacman = {
      lives: 0,
    };
    mockVariables = "variables";
    mockGhosts = "ghosts";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockCtx = "ctx";
    mockAudioPlayer = "audioPlayer";
    mockEndGame = jest.fn();
    mockResetAfterDeath = jest.fn();
  });

  it("calls endGame when Pac-Man has no lives left", () => {
    checkPacmanLives(
      mockNoLivesPacman,
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockEndGame,
      mockResetAfterDeath
    );
    expect(mockEndGame).toHaveBeenCalledTimes(1);
    expect(mockEndGame).toHaveBeenCalledWith(
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockNoLivesPacman,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx
    );
  });

  it("decreases Pac-Man's lives by 1 when he has lives left", () => {
    checkPacmanLives(
      mockPacman,
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockEndGame,
      mockResetAfterDeath
    );
    expect(mockPacman.lives).toBe(1);
  });

  it("calls resetAfterDeath when Pac-Man has lives left", () => {
    checkPacmanLives(
      mockPacman,
      mockVariables,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockEndGame,
      mockResetAfterDeath
    );
    expect(mockResetAfterDeath).toHaveBeenCalledTimes(1);
    expect(mockResetAfterDeath).toHaveBeenCalledWith(
      mockPacman,
      mockVariables,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer
    );
  });
});
