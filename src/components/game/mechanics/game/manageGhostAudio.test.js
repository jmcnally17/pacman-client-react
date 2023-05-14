import Game from "./game";
import AudioManager from "../helpers/audio/audioManager";

jest.mock("../helpers/audio/audioManager");

describe("manageGhostAudio", () => {
  beforeEach(() => {
    AudioManager.mockClear();
  });

  it("calls playGhostAudio if ghostAudioWantsToPlay in the audioPlayer is true", () => {
    const assets = { audioPlayer: { ghostAudioWantsToPlay: true } };
    Game.manageGhostAudio(assets);
    expect(AudioManager.playGhostAudio).toHaveBeenCalledTimes(1);
    expect(AudioManager.playGhostAudio).toHaveBeenCalledWith(assets);
  });

  it("does not call playGhostAudio if ghostAudioWantsToPlay in the audioPlayer is false", () => {
    const assets = { audioPlayer: { ghostAudioWantsToPlay: false } };
    Game.manageGhostAudio(assets);
    expect(AudioManager.playGhostAudio).toHaveBeenCalledTimes(0);
  });
});
