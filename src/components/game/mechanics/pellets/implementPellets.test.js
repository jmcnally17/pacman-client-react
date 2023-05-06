import implementPellets from "./implementPellets";

let mockUneatenPellet;
let mockUneatenPellets;
let mockEatenPellet;
let mockEatenPellets;
let mockCtx;
let mockPacman;
let mockVariables;
let mockGhosts;
let mockPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockAudioPlayer;
let mockBoundaries;
let mockEatPellet;
let mockCheckLevelUpCondition;

describe("implementPellets", () => {
  beforeEach(() => {
    mockUneatenPellet = {
      hasBeenEaten: false,
      draw: () => undefined,
    };
    mockUneatenPellets = [
      mockUneatenPellet,
      mockUneatenPellet,
      mockUneatenPellet,
    ];
    mockEatenPellet = {
      hasBeenEaten: true,
      draw: () => undefined,
    };
    mockEatenPellets = [mockEatenPellet, mockEatenPellet];
    jest.spyOn(mockUneatenPellet, "draw");
    jest.spyOn(mockEatenPellet, "draw");
    mockCtx = "ctx";
    mockPacman = "pacman";
    mockVariables = "variables";
    mockGhosts = "ghosts";
    mockPowerUps = "powerUps";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockAudioPlayer = "audioPlayer";
    mockBoundaries = "boundaries";
    mockEatPellet = jest.fn();
    mockCheckLevelUpCondition = jest.fn();
  });

  it("calls draw on each pellet if they have not been eaten", () => {
    implementPellets(
      mockUneatenPellets,
      mockCtx,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockBoundaries,
      mockEatPellet,
      mockCheckLevelUpCondition
    );
    expect(mockUneatenPellet.draw).toHaveBeenCalledTimes(3);
    expect(mockUneatenPellet.draw).toHaveBeenNthCalledWith(1, mockCtx);
    expect(mockUneatenPellet.draw).toHaveBeenNthCalledWith(2, mockCtx);
    expect(mockUneatenPellet.draw).toHaveBeenNthCalledWith(3, mockCtx);
  });

  it("does not call draw on each pellet if they have been eaten", () => {
    implementPellets(
      mockEatenPellets,
      mockCtx,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockBoundaries,
      mockEatPellet,
      mockCheckLevelUpCondition
    );
    expect(mockUneatenPellet.draw).toHaveBeenCalledTimes(0);
  });

  it("calls eatPellet on each pellet if they have not been eaten", () => {
    implementPellets(
      mockUneatenPellets,
      mockCtx,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockBoundaries,
      mockEatPellet,
      mockCheckLevelUpCondition
    );
    expect(mockEatPellet).toHaveBeenCalledTimes(3);
    expect(mockEatPellet).toHaveBeenNthCalledWith(
      1,
      mockUneatenPellet,
      mockPacman,
      mockVariables
    );
    expect(mockEatPellet).toHaveBeenNthCalledWith(
      2,
      mockUneatenPellet,
      mockPacman,
      mockVariables
    );
    expect(mockEatPellet).toHaveBeenNthCalledWith(
      3,
      mockUneatenPellet,
      mockPacman,
      mockVariables
    );
  });

  it("does not call eatPellet on each pellet if they have been eaten", () => {
    implementPellets(
      mockEatenPellets,
      mockCtx,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockBoundaries,
      mockEatPellet,
      mockCheckLevelUpCondition
    );
    expect(mockEatPellet).toHaveBeenCalledTimes(0);
  });

  it("calls checkLevelUpCondition", () => {
    implementPellets(
      mockUneatenPellets,
      mockCtx,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockBoundaries,
      mockEatPellet,
      mockCheckLevelUpCondition
    );
    expect(mockCheckLevelUpCondition).toHaveBeenCalledTimes(1);
    expect(mockCheckLevelUpCondition).toHaveBeenCalledWith(
      mockUneatenPellets,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockCtx,
      mockAudioPlayer,
      mockBoundaries
    );
  });
});
