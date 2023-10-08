import EventListener from "./eventListener";
import AudioManager from "../audio/audioManager";
import Timer from "../timer/timer";

jest.mock("../audio/audioManager");
jest.mock("../timer/timer");

describe("addVisibilityDetection", () => {
  let variables;
  let assets;
  let visibilityChange;

  beforeEach(() => {
    AudioManager.mockClear();
    Timer.mockClear();
    variables = {
      isWindowVisible: true,
      isGamePaused: false,
      visibilityEventListener: null,
    };
    assets = { timers: "timers", audioPlayer: "audioPlayer" };
    visibilityChange = new Event("visibilitychange");
  });

  afterEach(() => {
    window.removeEventListener(
      "visibilitychange",
      variables.visibilityEventListener
    );
  });

  it("sets visibilityEventListener in the variables object to the arrow function that defines the event listener", () => {
    EventListener.addVisibilityDetection(variables, assets);
    expect(variables.visibilityEventListener).toEqual(expect.any(Function));
  });

  describe("adds an event listener to", () => {
    it("change isWindowVisible to false if it is initially true and if isGamePaused is false", () => {
      EventListener.addVisibilityDetection(variables, assets);
      window.dispatchEvent(visibilityChange);
      expect(variables.isWindowVisible).toBeFalsy();
    });

    it("change isWindowVisible to true if it is intially false and if isGamePaused is false", () => {
      EventListener.addVisibilityDetection(variables, assets);
      variables.isWindowVisible = false;
      window.dispatchEvent(visibilityChange);
      expect(variables.isWindowVisible).toBeTruthy();
    });

    it("call pauseAudio if isWindowVisible is intially true and isGamePaused is false", () => {
      EventListener.addVisibilityDetection(variables, assets);
      window.dispatchEvent(visibilityChange);
      expect(AudioManager.pauseAudio).toHaveBeenCalledTimes(1);
      expect(AudioManager.pauseAudio).toHaveBeenCalledWith(assets.audioPlayer);
    });

    it("call pauseTimers if isWindowVisible is intially true and isGamePaused is false", () => {
      EventListener.addVisibilityDetection(variables, assets);
      window.dispatchEvent(visibilityChange);
      expect(Timer.pauseTimers).toHaveBeenCalledTimes(1);
      expect(Timer.pauseTimers).toHaveBeenCalledWith(assets.timers);
    });

    it("call resumeAudio if isWindowVisible is intially false and isGamePaused is false", () => {
      EventListener.addVisibilityDetection(variables, assets);
      variables.isWindowVisible = false;
      window.dispatchEvent(visibilityChange);
      expect(AudioManager.resumeAudio).toHaveBeenCalledTimes(1);
      expect(AudioManager.resumeAudio).toHaveBeenCalledWith(assets.audioPlayer);
    });

    it("call resumeTimers if isWindowVisible is intially false and isGamePaused is false", () => {
      EventListener.addVisibilityDetection(variables, assets);
      variables.isWindowVisible = false;
      window.dispatchEvent(visibilityChange);
      expect(Timer.resumeTimers).toHaveBeenCalledTimes(1);
      expect(Timer.resumeTimers).toHaveBeenCalledWith(assets.timers);
    });
  });
});
