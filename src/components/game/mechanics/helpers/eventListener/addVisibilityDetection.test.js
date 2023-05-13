import addVisibilityDetection from "./addVisibilityDetection";

let mockVariables;
let mockCycleTimer;
let mockScaredTimer;
let mockRetreatingTimers;
let mockAudioPlayer;
let mockPauseAudioAndTimers;
let mockResumeAudioAndTimers;
let visibilityChange;

describe("addVisibilityDetection", () => {
  beforeEach(() => {
    mockVariables = {
      isWindowVisible: true,
      isGamePaused: false,
      visibilityEventListener: null,
    };
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockRetreatingTimers = "retreatingTimers";
    mockAudioPlayer = "audioPlayer";
    mockPauseAudioAndTimers = jest.fn();
    mockResumeAudioAndTimers = jest.fn();
    visibilityChange = new Event("visibilitychange");
  });

  it("sets visibilityEventListener in the variables object to the arrow function that defines the event listener", () => {
    addVisibilityDetection(
      mockVariables,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockAudioPlayer,
      mockPauseAudioAndTimers,
      mockResumeAudioAndTimers
    );
    expect(mockVariables.visibilityEventListener).toEqual(expect.any(Function));
  });

  describe("adds an event listener to", () => {
    it("change isWindowVisible to false if it is initially true and if isGamePaused is false", () => {
      addVisibilityDetection(
        mockVariables,
        mockCycleTimer,
        mockScaredTimer,
        mockRetreatingTimers,
        mockAudioPlayer,
        mockPauseAudioAndTimers,
        mockResumeAudioAndTimers
      );
      window.dispatchEvent(visibilityChange);
      expect(mockVariables.isWindowVisible).toBeFalsy();
    });

    it("change isWindowVisible to true if it is intially false and if isGamePaused is false", () => {
      addVisibilityDetection(
        mockVariables,
        mockCycleTimer,
        mockScaredTimer,
        mockRetreatingTimers,
        mockAudioPlayer,
        mockPauseAudioAndTimers,
        mockResumeAudioAndTimers
      );
      mockVariables.isWindowVisible = false;
      window.dispatchEvent(visibilityChange);
      expect(mockVariables.isWindowVisible).toBeTruthy();
    });

    it("call pauseAudioAndTimers if isWindowVisible is intially true and isGamePaused is false", () => {
      addVisibilityDetection(
        mockVariables,
        mockCycleTimer,
        mockScaredTimer,
        mockRetreatingTimers,
        mockAudioPlayer,
        mockPauseAudioAndTimers,
        mockResumeAudioAndTimers
      );
      window.dispatchEvent(visibilityChange);
      expect(mockPauseAudioAndTimers).toHaveBeenCalledTimes(1);
      expect(mockPauseAudioAndTimers).toHaveBeenCalledWith(
        mockAudioPlayer,
        mockCycleTimer,
        mockScaredTimer,
        mockRetreatingTimers
      );
    });

    it("call resumeAudioAndTimers if isWindowVisible is intially false and isGamePaused is false", () => {
      addVisibilityDetection(
        mockVariables,
        mockCycleTimer,
        mockScaredTimer,
        mockRetreatingTimers,
        mockAudioPlayer,
        mockPauseAudioAndTimers,
        mockResumeAudioAndTimers
      );
      mockVariables.isWindowVisible = false;
      window.dispatchEvent(visibilityChange);
      expect(mockResumeAudioAndTimers).toHaveBeenCalledTimes(1);
      expect(mockResumeAudioAndTimers).toHaveBeenCalledWith(
        mockAudioPlayer,
        mockCycleTimer,
        mockScaredTimer,
        mockRetreatingTimers
      );
    });
  });
});
