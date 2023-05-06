import pauseAudioAndTimers from "./pauseAudioAndTimers";

let mockAudioPlayer;
let mockCycleTimer;
let mockScaredTimer;
let mockRetreatingTimers;
let mockPauseAudio;
let mockPauseTimers;

describe("pauseAudioAndTimers", () => {
  beforeEach(() => {
    mockAudioPlayer = "audioPlayer";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockRetreatingTimers = "retreatingTimers";
    mockPauseAudio = jest.fn();
    mockPauseTimers = jest.fn();
  });

  it("calls pauseAudio", () => {
    pauseAudioAndTimers(
      mockAudioPlayer,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockPauseAudio,
      mockPauseTimers
    );
    expect(mockPauseAudio).toHaveBeenCalledTimes(1);
    expect(mockPauseAudio).toHaveBeenCalledWith(mockAudioPlayer);
  });

  it("calls pauseTimers", () => {
    pauseAudioAndTimers(
      mockAudioPlayer,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockPauseAudio,
      mockPauseTimers
    );
    expect(mockPauseTimers).toHaveBeenCalledTimes(1);
    expect(mockPauseTimers).toHaveBeenCalledWith(
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers
    );
  });
});
