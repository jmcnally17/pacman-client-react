import AudioManager from "./audioManager";

describe("resumeAudio", () => {
  it("calls playPacmanDeathAndLevelUpIfWantTo on the audioPlayer", () => {
    const mockAudioPlayer = {
      playPacmanDeathAndLevelUpIfWantTo: () => undefined,
    };
    jest.spyOn(mockAudioPlayer, "playPacmanDeathAndLevelUpIfWantTo");
    AudioManager.resumeAudio(mockAudioPlayer);
    expect(
      mockAudioPlayer.playPacmanDeathAndLevelUpIfWantTo
    ).toHaveBeenCalledTimes(1);
  });
});
