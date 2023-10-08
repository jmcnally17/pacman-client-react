import Timer from "./timer";

describe("pauseTimers", () => {
  let cycleTimer;
  let scaredTimer;
  let retreatingTimer;
  let retreatingTimers;
  let timers;

  beforeEach(() => {
    cycleTimer = { pause: () => undefined };
    scaredTimer = { isRunning: false, pause: () => undefined };
    retreatingTimer = { isRunning: true, pause: () => undefined };
    retreatingTimers = [
      retreatingTimer,
      retreatingTimer,
      retreatingTimer,
      retreatingTimer,
    ];
    timers = {
      cycleTimer: cycleTimer,
      scaredTimer: scaredTimer,
      retreatingTimers: retreatingTimers,
    };
    jest.spyOn(cycleTimer, "pause");
    jest.spyOn(scaredTimer, "pause");
    jest.spyOn(retreatingTimer, "pause");
  });

  it("calls pause on the scared timer if it is running", () => {
    scaredTimer.isRunning = true;
    Timer.pauseTimers(timers);
    expect(scaredTimer.pause).toHaveBeenCalledTimes(1);
  });

  it("calls pause on the cycle timer if the scared timer is not running", () => {
    Timer.pauseTimers(timers);
    expect(cycleTimer.pause).toHaveBeenCalledTimes(1);
  });

  it("calls pause on each retreating timer if they are running", () => {
    Timer.pauseTimers(timers);
    expect(retreatingTimer.pause).toHaveBeenCalledTimes(4);
  });

  it("does not call pause on each retreating timer if they are not running", () => {
    retreatingTimer.isRunning = false;
    Timer.pauseTimers(timers);
    expect(retreatingTimer.pause).toHaveBeenCalledTimes(0);
  });
});
