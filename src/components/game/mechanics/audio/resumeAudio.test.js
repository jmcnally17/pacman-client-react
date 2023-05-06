import resumeAudio from "./resumeAudio";

describe("resumeAudio", () => {
  it("calls playPacmanDeathAndLevelUpIfWantTo on the audioPlayer", () => {
    const mockAudioPlayer = {
      playPacmanDeathAndLevelUpIfWantTo: () => undefined,
    };
    jest.spyOn(mockAudioPlayer, "playPacmanDeathAndLevelUpIfWantTo");
    resumeAudio(mockAudioPlayer);
    expect(
      mockAudioPlayer.playPacmanDeathAndLevelUpIfWantTo
    ).toHaveBeenCalledTimes(1);
  });
});
