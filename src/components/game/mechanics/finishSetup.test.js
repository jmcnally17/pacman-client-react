import finishSetup from "./finishSetup";

let mockVariables;
let mockPlayer;
let mockReactRoot;
let mockCycleTimer;
let mockScaredTimer;
let mockRetreatingTimers;
let mockAudioPlayer;
let mockPacman;
let mockCtx;
let mockBoundaries;
let mockPellets;
let mockPowerUps;
let mockGhosts;
let mockPauseTextImage;
let mockAddDirectionDetection;
let mockAddVisibilityDetection;
let mockAddPauseDetection;

describe("finishSetup", () => {
  beforeEach(() => {
    mockVariables = {
      player: undefined,
      reactRoot: "",
      start: true,
      directionEventListener: null,
      visibilityEventListener: null,
    };
    mockPlayer = {
      username: "John",
    };
    mockReactRoot = "reactRoot";
    mockCycleTimer = {
      start: () => undefined,
    };
    jest.spyOn(mockCycleTimer, "start");
    mockScaredTimer = "scaredTimer";
    mockRetreatingTimers = "retreatingTimers";
    mockAudioPlayer = {
      ghostAudioWantsToPlay: false,
    };
    mockPacman = "pacman";
    mockCtx = "ctx";
    mockBoundaries = "boundaries";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockGhosts = "ghosts";
    mockPauseTextImage = "pauseTextImage";
    mockAddDirectionDetection = jest.fn();
    mockAddVisibilityDetection = jest.fn();
    mockAddPauseDetection = jest.fn();
  });

  it("sets the player and reactRoot", () => {
    finishSetup(
      mockVariables,
      mockPlayer,
      mockReactRoot,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPacman,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPauseTextImage,
      mockAddDirectionDetection,
      mockAddVisibilityDetection,
      mockAddPauseDetection
    );
    expect(mockVariables.player).toBe(mockPlayer);
    expect(mockVariables.reactRoot).toBe(mockReactRoot);
  });

  it("starts the cycle timer", () => {
    finishSetup(
      mockVariables,
      mockPlayer,
      mockReactRoot,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPacman,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPauseTextImage,
      mockAddDirectionDetection,
      mockAddVisibilityDetection,
      mockAddPauseDetection
    );
    expect(mockCycleTimer.start).toHaveBeenCalledTimes(1);
  });

  it("calls addDirectionDetection to add the event listener", () => {
    finishSetup(
      mockVariables,
      mockPlayer,
      mockReactRoot,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPacman,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPauseTextImage,
      mockAddDirectionDetection,
      mockAddVisibilityDetection,
      mockAddPauseDetection
    );
    expect(mockAddDirectionDetection).toHaveBeenCalledTimes(1);
    expect(mockAddDirectionDetection).toHaveBeenCalledWith(mockVariables);
  });

  it("calls addVisibilityDetection to add the event listener", () => {
    finishSetup(
      mockVariables,
      mockPlayer,
      mockReactRoot,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPacman,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPauseTextImage,
      mockAddDirectionDetection,
      mockAddVisibilityDetection,
      mockAddPauseDetection
    );
    expect(mockAddVisibilityDetection).toHaveBeenCalledTimes(1);
    expect(mockAddVisibilityDetection).toHaveBeenCalledWith(
      mockVariables,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer
    );
  });

  it("calls addPauseDetection to add the event listener", () => {
    finishSetup(
      mockVariables,
      mockPlayer,
      mockReactRoot,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPacman,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPauseTextImage,
      mockAddDirectionDetection,
      mockAddVisibilityDetection,
      mockAddPauseDetection
    );
    expect(mockAddPauseDetection).toHaveBeenCalledTimes(1);
    expect(mockAddPauseDetection).toHaveBeenCalledWith(
      mockVariables,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPacman,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPauseTextImage
    );
  });

  it("sets the start variable to false", () => {
    finishSetup(
      mockVariables,
      mockPlayer,
      mockReactRoot,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPacman,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPauseTextImage,
      mockAddDirectionDetection,
      mockAddVisibilityDetection,
      mockAddPauseDetection
    );
    expect(mockVariables.start).toBeFalsy();
  });

  it("sets ghostAudioWantsToPlay in the audioPlayer to true", () => {
    finishSetup(
      mockVariables,
      mockPlayer,
      mockReactRoot,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPacman,
      mockCtx,
      mockBoundaries,
      mockPellets,
      mockPowerUps,
      mockGhosts,
      mockPauseTextImage,
      mockAddDirectionDetection,
      mockAddVisibilityDetection,
      mockAddPauseDetection
    );
    expect(mockAudioPlayer.ghostAudioWantsToPlay).toBe(true);
  });
});
