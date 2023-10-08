import EventListener from "./eventListener";
import AudioManager from "../audio/audioManager";
import Timer from "../timer/timer";
import Animator from "../graphics/animator/animator";

jest.mock("../audio/audioManager");
jest.mock("../timer/timer");
jest.mock("../graphics/animator/animator");

describe("addPauseDetection", () => {
  let variables;
  let assets;
  let ctx;
  let escKeyEvent;

  beforeEach(() => {
    AudioManager.mockClear();
    Timer.mockClear();
    Animator.mockClear();
    variables = {
      animationId: 3950,
      isGamePaused: false,
      pauseEventListener: null,
    };
    assets = {
      timers: "timers",
      audioPlayer: "audioPlayer",
      pauseTextImage: "pauseTextImage",
    };
    ctx = "ctx";
    escKeyEvent = new KeyboardEvent("keydown", { key: "Escape" });
  });

  afterEach(() => {
    window.removeEventListener("keydown", variables.pauseEventListener);
  });

  it("adds an event listener to call cancelAnimationFrame when isGamePaused is initially false", () => {
    EventListener.addPauseDetection(variables, assets, ctx);
    jest.spyOn(global, "cancelAnimationFrame");
    window.dispatchEvent(escKeyEvent);
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(variables.animationId);
  });

  it("sets pauseEventListener in the variables object to the arrow function that defines the event listener", () => {
    EventListener.addPauseDetection(variables, assets, ctx);
    expect(variables.pauseEventListener).toEqual(expect.any(Function));
  });

  describe("adds an event listener to", () => {
    it("change isGamePaused to true if it is initially false", () => {
      EventListener.addPauseDetection(variables, assets, ctx);
      window.dispatchEvent(escKeyEvent);
      expect(variables.isGamePaused).toBeTruthy();
    });

    it("change isGamePaused to false if it is initially true", () => {
      EventListener.addPauseDetection(variables, assets, ctx);
      variables.isGamePaused = true;
      window.dispatchEvent(escKeyEvent);
      expect(variables.isGamePaused).toBeFalsy();
    });

    it("calls pauseAudio if isGamePaused is intially false", () => {
      EventListener.addPauseDetection(variables, assets, ctx);
      window.dispatchEvent(escKeyEvent);
      expect(AudioManager.pauseAudio).toHaveBeenCalledTimes(1);
      expect(AudioManager.pauseAudio).toHaveBeenCalledWith(assets.audioPlayer);
    });

    it("calls pauseTimers if isGamePaused is intially false", () => {
      EventListener.addPauseDetection(variables, assets, ctx);
      window.dispatchEvent(escKeyEvent);
      expect(Timer.pauseTimers).toHaveBeenCalledTimes(1);
      expect(Timer.pauseTimers).toHaveBeenCalledWith(assets.timers);
    });

    it("calls loadPauseOverlay if isGamePaused is initially false", () => {
      EventListener.addPauseDetection(variables, assets, ctx);
      window.dispatchEvent(escKeyEvent);
      expect(Animator.loadPauseOverlay).toHaveBeenCalledTimes(1);
      expect(Animator.loadPauseOverlay).toHaveBeenCalledWith(
        ctx,
        assets.pauseTextImage
      );
    });

    it("calls resumeAudio if isGamePaused is intially true", () => {
      EventListener.addPauseDetection(variables, assets, ctx);
      variables.isGamePaused = true;
      window.dispatchEvent(escKeyEvent);
      expect(AudioManager.resumeAudio).toHaveBeenCalledTimes(1);
      expect(AudioManager.resumeAudio).toHaveBeenCalledWith(assets.audioPlayer);
    });

    it("calls resumeTimers if isGamePaused is intially true", () => {
      EventListener.addPauseDetection(variables, assets, ctx);
      variables.isGamePaused = true;
      window.dispatchEvent(escKeyEvent);
      expect(Timer.resumeTimers).toHaveBeenCalledTimes(1);
      expect(Timer.resumeTimers).toHaveBeenCalledWith(assets.timers);
    });

    it("calls resumeAnimation if isGamePaused is initially true", () => {
      EventListener.addPauseDetection(variables, assets, ctx);
      variables.isGamePaused = true;
      window.dispatchEvent(escKeyEvent);
      expect(Animator.resumeAnimation).toHaveBeenCalledTimes(1);
      expect(Animator.resumeAnimation).toHaveBeenCalledWith(
        variables,
        ctx,
        assets
      );
    });
  });
});
