import dealWithCollision from "./dealWithCollision";

let mockGhost;
let mockScaredGhost;
let mockPacman;
let mockVariables;
let mockGhosts;
let mockPellets;
let mockPowerUps;
let mockCycleTimer;
let mockScaredTimer;
let mockAudioPlayer;
let mockCtx;
let mockBoundaries;
let mockRunDeathAnimation;

describe("dealWithCollision", () => {
  beforeEach(() => {
    mockGhost = {
      isScared: false,
      isRetreating: false,
      reset: () => undefined,
    };
    mockScaredGhost = {
      isScared: true,
      changeScaredState: () => undefined,
      isRetreating: false,
      changeRetreatingState: () => undefined,
      retreatingTimer: {
        start: () => undefined,
      },
    };
    mockPacman = {
      radians: Math.PI / 24,
      isShrinking: false,
    };
    mockVariables = {
      score: 100,
      killCount: 2,
      animationId: 97,
    };
    mockGhosts = "ghosts";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockAudioPlayer = {
      stopGhostAudio: () => undefined,
      playPacmanDeath: () => undefined,
    };
    mockCtx = "ctx";
    mockBoundaries = "boundaries";
    mockRunDeathAnimation = jest.fn();
    jest.spyOn(mockScaredGhost, "changeRetreatingState");
    jest.spyOn(mockScaredGhost.retreatingTimer, "start");
    jest.spyOn(mockScaredGhost, "changeScaredState");
  });

  it("sets the radians in Pac-Man to PI / 4 if the ghost is not scared or retreating", () => {
    dealWithCollision(
      mockGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(mockPacman.radians).toBe(Math.PI / 4);
  });

  it("calls cancelAnimationFrame if the ghost is not scared or retreating", () => {
    jest.spyOn(global, "cancelAnimationFrame");
    dealWithCollision(
      mockGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(
      mockVariables.animationId
    );
  });

  it("calls stopGhostAudio on the audioPlayer if the ghost is not scared or retreating", () => {
    jest.spyOn(mockAudioPlayer, "stopGhostAudio");
    dealWithCollision(
      mockGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(mockAudioPlayer.stopGhostAudio).toHaveBeenCalledTimes(1);
  });

  it("calls playPacmanDeath on the audioPlayer if the ghost is not scared or retreating", () => {
    jest.spyOn(mockAudioPlayer, "playPacmanDeath");
    dealWithCollision(
      mockGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(mockAudioPlayer.playPacmanDeath).toHaveBeenCalledTimes(1);
  });

  it("changes isShrinking in Pac-Man to true if the ghost is not scared or retreating", () => {
    dealWithCollision(
      mockGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(mockPacman.isShrinking).toBeTruthy();
  });

  it("calls runDeathAnimation if the ghost is not scared or retreating", () => {
    dealWithCollision(
      mockGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(mockRunDeathAnimation).toHaveBeenCalledTimes(1);
    expect(mockRunDeathAnimation).toHaveBeenCalledWith(
      mockVariables,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockPacman,
      mockGhosts,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer
    );
  });

  it("increases the score and kill count if the ghost is scared", () => {
    dealWithCollision(
      mockScaredGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(mockVariables.score).toBe(900);
    expect(mockVariables.killCount).toBe(3);
  });

  it("sends the ghost into retreating mode if the ghost is scared", () => {
    dealWithCollision(
      mockScaredGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(mockScaredGhost.changeRetreatingState).toHaveBeenCalledTimes(1);
    expect(mockScaredGhost.retreatingTimer.start).toHaveBeenCalledTimes(1);
    expect(mockScaredGhost.changeScaredState).toHaveBeenCalledTimes(1);
  });

  it("has no effect when the ghost is retreating", () => {
    const mockRetreatingGhost = {
      isScared: false,
      isRetreating: true,
    };
    dealWithCollision(
      mockRetreatingGhost,
      mockPacman,
      mockVariables,
      mockGhosts,
      mockPellets,
      mockPowerUps,
      mockCycleTimer,
      mockScaredTimer,
      mockAudioPlayer,
      mockCtx,
      mockBoundaries,
      mockRunDeathAnimation
    );
    expect(mockRunDeathAnimation).toHaveBeenCalledTimes(0);
    expect(mockVariables.score).toBe(100);
    expect(mockVariables.killCount).toBe(2);
    expect(mockScaredGhost.changeRetreatingState).toHaveBeenCalledTimes(0);
    expect(mockScaredGhost.retreatingTimer.start).toHaveBeenCalledTimes(0);
    expect(mockScaredGhost.changeScaredState).toHaveBeenCalledTimes(0);
  });
});
