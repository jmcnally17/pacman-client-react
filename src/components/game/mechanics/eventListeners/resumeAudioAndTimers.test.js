import resumeAudioAndTimers from "./resumeAudioAndTimers";

let mockAudioPlayer;
let mockCycleTimer;
let mockScaredTimer;
let mockRetreatingTimers;
let mockResumeAudio;
let mockResumeTimers;

describe("resumeAudioAndTimers", () => {
  beforeEach(() => {
    mockAudioPlayer = "audioPlayer";
    mockCycleTimer = "cycleTimer";
    mockScaredTimer = "scaredTimer";
    mockRetreatingTimers = "retreatingTimers";
    mockResumeAudio = jest.fn();
    mockResumeTimers = jest.fn();
  });

  it("calls resumeAudio", () => {
    resumeAudioAndTimers(
      mockAudioPlayer,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockResumeAudio,
      mockResumeTimers
    );
    expect(mockResumeAudio).toHaveBeenCalledTimes(1);
    expect(mockResumeAudio).toHaveBeenCalledWith(mockAudioPlayer);
  });

  it("calls resumeTimers", () => {
    resumeAudioAndTimers(
      mockAudioPlayer,
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers,
      mockResumeAudio,
      mockResumeTimers
    );
    expect(mockResumeTimers).toHaveBeenCalledTimes(1);
    expect(mockResumeTimers).toHaveBeenCalledWith(
      mockCycleTimer,
      mockScaredTimer,
      mockRetreatingTimers
    );
  });
});
