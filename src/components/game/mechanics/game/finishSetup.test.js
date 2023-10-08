import Game from "./game";
import EventListener from "../helpers/eventListener/eventListener";

jest.mock("../helpers/eventListener/eventListener");

describe("finishSetup", () => {
  let variables;
  let player;
  let reactRoot;
  let assets;
  let ctx;

  beforeEach(() => {
    EventListener.mockClear();
    variables = {
      player: undefined,
      reactRoot: "",
      start: true,
      directionEventListener: null,
      visibilityEventListener: null,
      startTime: null,
    };
    player = { username: "John" };
    reactRoot = "reactRoot";
    assets = {
      timers: { cycleTimer: { start: () => undefined } },
      audioPlayer: { ghostAudioWantsToPlay: false },
    };
    jest.spyOn(assets.timers.cycleTimer, "start");
    ctx = "ctx";
    jest.spyOn(performance, "now");
  });

  it("sets the player and reactRoot", () => {
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    expect(variables.player).toBe(player);
    expect(variables.reactRoot).toBe(reactRoot);
  });

  it("starts the cycle timer", () => {
    const cycleTimer = assets.timers.cycleTimer;
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    expect(cycleTimer.start).toHaveBeenCalledTimes(1);
  });

  it("calls addDirectionDetection to add the event listener", () => {
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    expect(EventListener.addDirectionDetection).toHaveBeenCalledTimes(1);
    expect(EventListener.addDirectionDetection).toHaveBeenCalledWith(variables);
  });

  it("calls addVisibilityDetection to add the event listener", () => {
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    expect(EventListener.addVisibilityDetection).toHaveBeenCalledTimes(1);
    expect(EventListener.addVisibilityDetection).toHaveBeenCalledWith(
      variables,
      assets
    );
  });

  it("calls addPauseDetection to add the event listener", () => {
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    expect(EventListener.addPauseDetection).toHaveBeenCalledTimes(1);
    expect(EventListener.addPauseDetection).toHaveBeenCalledWith(
      variables,
      assets,
      ctx
    );
  });

  it("sets the start variable to false", () => {
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    expect(variables.start).toBeFalsy();
  });

  it("sets ghostAudioWantsToPlay in the audioPlayer to true", () => {
    const audioPlayer = assets.audioPlayer;
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    expect(audioPlayer.ghostAudioWantsToPlay).toBe(true);
  });

  it("sets the startTime to current time from performance.now()", () => {
    performance.now.mockReturnValue(110);
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    expect(performance.now).toHaveBeenCalledTimes(1);
    expect(variables.startTime).toBe(110);
  });
});
