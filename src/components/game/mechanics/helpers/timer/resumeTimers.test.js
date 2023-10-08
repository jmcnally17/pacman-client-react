import Timer from "./timer";

describe("resumeTimers", () => {
  let cycleTimer;
  let scaredTimer;
  let retreatingTimer;
  let retreatingTimers;
  let timers;

  beforeEach(() => {
    cycleTimer = { resume: () => undefined };
    scaredTimer = { isRunning: false, resume: () => undefined };
    retreatingTimer = { isRunning: true, resume: () => undefined };
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
    jest.spyOn(cycleTimer, "resume");
    jest.spyOn(scaredTimer, "resume");
    jest.spyOn(retreatingTimer, "resume");
  });

  it("calls resume on the scared timer if it is running", () => {
    scaredTimer.isRunning = true;
    Timer.resumeTimers(timers);
    expect(scaredTimer.resume).toHaveBeenCalledTimes(1);
    expect(scaredTimer.resume).toHaveBeenCalledWith(cycleTimer);
  });

  it("calls resume on the cycle timer if the scared timer is not running", () => {
    Timer.resumeTimers(timers);
    expect(cycleTimer.resume).toHaveBeenCalledTimes(1);
  });

  it("calls resume on each retreating timer if they are running", () => {
    Timer.resumeTimers(timers);
    expect(retreatingTimer.resume).toHaveBeenCalledTimes(4);
  });

  it("does not call resume on each retreating timer if they are not running", () => {
    retreatingTimer.isRunning = false;
    Timer.resumeTimers(timers);
    expect(retreatingTimer.resume).toHaveBeenCalledTimes(0);
  });
});
