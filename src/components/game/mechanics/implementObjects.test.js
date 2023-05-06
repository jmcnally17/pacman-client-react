import implementObjects from "./implementObjects";

let mockBoundaries;
let mockGhosts;
let mockPacman;
let mockPellets;
let mockPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockCtx;
let mockVariables;
let mockAudioPlayer;
let mockImplementBoundaries;
let mockImplementPellets;
let mockImplementPowerUps;
let mockImplementGhosts;
let mockImplementPacman;

describe("implementObjects", () => {
  beforeEach(() => {
    mockBoundaries = "boundaries";
    mockGhosts = "ghosts";
    mockPacman = "pacman";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockCtx = "ctx";
    mockVariables = "variables";
    mockAudioPlayer = "audioPlayer";
    mockImplementBoundaries = jest.fn();
    mockImplementPellets = jest.fn();
    mockImplementPowerUps = jest.fn();
    mockImplementGhosts = jest.fn();
    mockImplementPacman = jest.fn();
  });

  it("calls implementBoundaries", () => {
    implementObjects(
      mockBoundaries,
      mockGhosts,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockVariables,
      mockAudioPlayer,
      mockImplementBoundaries,
      mockImplementPellets,
      mockImplementPowerUps,
      mockImplementGhosts,
      mockImplementPacman
    );
    expect(mockImplementBoundaries).toHaveBeenCalledTimes(1);
    expect(mockImplementBoundaries).toHaveBeenCalledWith(
      mockBoundaries,
      mockCtx,
      mockPacman
    );
  });

  it("calls implementPellets", () => {
    implementObjects(
      mockBoundaries,
      mockGhosts,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockVariables,
      mockAudioPlayer,
      mockImplementBoundaries,
      mockImplementPellets,
      mockImplementPowerUps,
      mockImplementGhosts,
      mockImplementPacman
    );

    expect(mockImplementPellets).toHaveBeenCalledTimes(1);
    expect(mockImplementPellets).toHaveBeenCalledWith(
      mockPellets,
      mockCtx,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockBoundaries
    );
  });

  it("calls implementPowerUps", () => {
    implementObjects(
      mockBoundaries,
      mockGhosts,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockVariables,
      mockAudioPlayer,
      mockImplementBoundaries,
      mockImplementPellets,
      mockImplementPowerUps,
      mockImplementGhosts,
      mockImplementPacman
    );
    expect(mockImplementPowerUps).toHaveBeenCalledTimes(1);
    expect(mockImplementPowerUps).toHaveBeenCalledWith(
      mockPowerUps,
      mockCtx,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockScaredTimer,
      mockCycleTimer
    );
  });

  it("calls implementGhosts", () => {
    implementObjects(
      mockBoundaries,
      mockGhosts,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockVariables,
      mockAudioPlayer,
      mockImplementBoundaries,
      mockImplementPellets,
      mockImplementPowerUps,
      mockImplementGhosts,
      mockImplementPacman
    );
    expect(mockImplementGhosts).toHaveBeenCalledTimes(1);
    expect(mockImplementGhosts).toHaveBeenCalledWith(
      mockGhosts,
      mockBoundaries,
      mockCtx,
      mockVariables,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer
    );
  });

  it("calls implementPacman", () => {
    implementObjects(
      mockBoundaries,
      mockGhosts,
      mockPacman,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockVariables,
      mockAudioPlayer,
      mockImplementBoundaries,
      mockImplementPellets,
      mockImplementPowerUps,
      mockImplementGhosts,
      mockImplementPacman
    );
    expect(mockImplementPacman).toHaveBeenCalledTimes(1);
    expect(mockImplementPacman).toHaveBeenCalledWith(
      mockVariables,
      mockPacman,
      mockBoundaries,
      mockCtx,
      mockPellets
    );
  });
});
