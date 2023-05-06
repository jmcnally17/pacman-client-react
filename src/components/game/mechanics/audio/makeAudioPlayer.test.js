import AudioPlayer from "../../models/audioPlayer";
import makeAudioPlayer from "./makeAudioPlayer";

describe("makeAudioPlayer", () => {
  it("returns the audioPlayer object", () => {
    expect(makeAudioPlayer()).toBeInstanceOf(AudioPlayer);
  });
});
