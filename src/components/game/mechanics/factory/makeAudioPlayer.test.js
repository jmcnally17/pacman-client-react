import Factory from "./factory";
import AudioPlayer from "../../models/audioPlayer";

jest.mock("../../models/audioPlayer");

describe("makeAudioPlayer", () => {
  it("returns the audioPlayer object", () => {
    expect(Factory.makeAudioPlayer()).toBeInstanceOf(AudioPlayer);
  });
});
