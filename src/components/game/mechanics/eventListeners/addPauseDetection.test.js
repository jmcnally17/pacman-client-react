import addPauseDetection from "./addPauseDetection";

let mockVariables;
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
let mockPauseAudioAndTimers;
let mockLoadPauseOverlay;
let mockResumeAudioAndTimers;
let mockResumeAnimation;
let escKeyEvent;

describe("addPauseDetection", () => {
  beforeEach(() => {
    mockVariables = {
      animationId: 3950,
      isGamePaused: false,
      pauseEventListener: null,
    };
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockRetreatingTimers = "retreatingTimers";
    mockAudioPlayer = "audioPlayer";
    mockPacman = "pacman";
    mockCtx = "ctx";
    mockBoundaries = "boundaries";
    mockPellets = "pellets";
    mockPowerUps = "powerUps";
    mockGhosts = "ghosts";
    mockPauseTextImage = "pauseTextImage";
    mockPauseAudioAndTimers = jest.fn();
    mockLoadPauseOverlay = jest.fn();
    mockResumeAudioAndTimers = jest.fn();
    mockResumeAnimation = jest.fn();
    escKeyEvent = new KeyboardEvent("keydown", { key: "Escape" });
  });

  it("adds an event listener to call cancelAnimationFrame when isGamePaused is initially false", () => {
    addPauseDetection(
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
      mockPauseTextImage,
      mockPauseAudioAndTimers,
      mockLoadPauseOverlay,
      mockResumeAudioAndTimers,
      mockResumeAnimation
    );
    jest.spyOn(global, "cancelAnimationFrame");
    window.dispatchEvent(escKeyEvent);
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(
      mockVariables.animationId
    );
  });

  it("sets pauseEventListener in the variables object to the arrow function that defines the event listener", () => {
    addPauseDetection(
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
      mockPauseTextImage,
      mockPauseAudioAndTimers,
      mockLoadPauseOverlay,
      mockResumeAudioAndTimers,
      mockResumeAnimation
    );
    expect(mockVariables.pauseEventListener).toEqual(expect.any(Function));
  });

  describe("adds an event listener to", () => {
    it("change isGamePaused to true if it is initially false", () => {
      addPauseDetection(
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
        mockPauseTextImage,
        mockPauseAudioAndTimers,
        mockLoadPauseOverlay,
        mockResumeAudioAndTimers,
        mockResumeAnimation
      );
      window.dispatchEvent(escKeyEvent);
      expect(mockVariables.isGamePaused).toBeTruthy();
    });

    it("change isGamePaused to false if it is initially true", () => {
      addPauseDetection(
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
        mockPauseTextImage,
        mockPauseAudioAndTimers,
        mockLoadPauseOverlay,
        mockResumeAudioAndTimers,
        mockResumeAnimation
      );
      mockVariables.isGamePaused = true;
      window.dispatchEvent(escKeyEvent);
      expect(mockVariables.isGamePaused).toBeFalsy();
    });

    it("calls PauseAudioAndTimers if isGamePaused is intially false", () => {
      addPauseDetection(
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
        mockPauseTextImage,
        mockPauseAudioAndTimers,
        mockLoadPauseOverlay,
        mockResumeAudioAndTimers,
        mockResumeAnimation
      );
      window.dispatchEvent(escKeyEvent);
      expect(mockPauseAudioAndTimers).toHaveBeenCalledTimes(1);
      expect(mockPauseAudioAndTimers).toHaveBeenCalledWith(
        mockAudioPlayer,
        mockCycleTimer,
        mockScaredTimer,
        mockRetreatingTimers
      );
    });

    it("calls loadPauseOverlay if isGamePaused is initially false", () => {
      addPauseDetection(
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
        mockPauseTextImage,
        mockPauseAudioAndTimers,
        mockLoadPauseOverlay,
        mockResumeAudioAndTimers,
        mockResumeAnimation
      );
      window.dispatchEvent(escKeyEvent);
      expect(mockLoadPauseOverlay).toHaveBeenCalledTimes(1);
      expect(mockLoadPauseOverlay).toHaveBeenCalledWith(
        mockCtx,
        mockPauseTextImage
      );
    });

    it("calls ResumeAudioAndTimers if isGamePaused is intially true", () => {
      addPauseDetection(
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
        mockPauseTextImage,
        mockPauseAudioAndTimers,
        mockLoadPauseOverlay,
        mockResumeAudioAndTimers,
        mockResumeAnimation
      );
      mockVariables.isGamePaused = true;
      window.dispatchEvent(escKeyEvent);
      expect(mockResumeAudioAndTimers).toHaveBeenCalledTimes(1);
      expect(mockResumeAudioAndTimers).toHaveBeenCalledWith(
        mockAudioPlayer,
        mockCycleTimer,
        mockScaredTimer,
        mockRetreatingTimers
      );
    });

    it("calls resumeAnimation if isGamePaused is initially true", () => {
      addPauseDetection(
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
        mockPauseTextImage,
        mockPauseAudioAndTimers,
        mockLoadPauseOverlay,
        mockResumeAudioAndTimers,
        mockResumeAnimation
      );
      mockVariables.isGamePaused = true;
      window.dispatchEvent(escKeyEvent);
      expect(mockResumeAnimation).toHaveBeenCalledTimes(1);
      expect(mockResumeAnimation).toHaveBeenCalledWith(
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
  });
});
