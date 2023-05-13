import pauseAudio from "./pauseAudio";

describe("pauseAudio", () => {
  it("calls pauseAll on the audioPlayer", () => {
    const mockAudioPlayer = {
      pauseAll: () => undefined,
    };
    jest.spyOn(mockAudioPlayer, "pauseAll");
    pauseAudio(mockAudioPlayer);
    expect(mockAudioPlayer.pauseAll).toHaveBeenCalledTimes(1);
  });
});
