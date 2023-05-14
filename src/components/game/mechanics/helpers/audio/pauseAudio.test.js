import AudioManager from "./audioManager";

describe("pauseAudio", () => {
  it("calls pauseAll on the audioPlayer", () => {
    const mockAudioPlayer = {
      pauseAll: () => undefined,
    };
    jest.spyOn(mockAudioPlayer, "pauseAll");
    AudioManager.pauseAudio(mockAudioPlayer);
    expect(mockAudioPlayer.pauseAll).toHaveBeenCalledTimes(1);
  });
});
