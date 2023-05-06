import manageGhostAudio from "./manageGhostAudio";

let mockScaredTimer;
let mockRetreatingTimer;
let mockPlayGhostAudio;

describe("manageGhostAudio", () => {
  beforeEach(() => {
    mockScaredTimer = "scaredTimer";
    mockRetreatingTimer = "retreatingTimer";
    mockPlayGhostAudio = jest.fn();
  });

  it("calls playGhostAudio if ghostAudioWantsToPlay in the audioPlayer is true", () => {
    const mockAudioPlayer = {
      ghostAudioWantsToPlay: true,
    };
    manageGhostAudio(
      mockAudioPlayer,
      mockScaredTimer,
      mockRetreatingTimer,
      mockPlayGhostAudio
    );
    expect(mockPlayGhostAudio).toHaveBeenCalledTimes(1);
    expect(mockPlayGhostAudio).toHaveBeenCalledWith(
      mockAudioPlayer,
      mockScaredTimer,
      mockRetreatingTimer
    );
  });

  it("does not call playGhostAudio if ghostAudioWantsToPlay in the audioPlayer is false", () => {
    const mockAudioPlayer = {
      ghostAudioWantsToPlay: false,
    };
    manageGhostAudio(
      mockAudioPlayer,
      mockScaredTimer,
      mockRetreatingTimer,
      mockPlayGhostAudio
    );
    expect(mockPlayGhostAudio).toHaveBeenCalledTimes(0);
  });
});
