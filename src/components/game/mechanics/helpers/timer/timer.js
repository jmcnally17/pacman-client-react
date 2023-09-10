export default class Timer {
  static pauseTimers(timers) {
    if (timers.scaredTimer.isRunning) timers.scaredTimer.pause();
    else timers.cycleTimer.pause();
    timers.retreatingTimers.forEach((timer) => {
      if (timer.isRunning) timer.pause();
    });
  }

  static resumeTimers(timers) {
    if (timers.scaredTimer.isRunning)
      timers.scaredTimer.resume(timers.cycleTimer);
    else timers.cycleTimer.resume();
    timers.retreatingTimers.forEach((timer) => {
      if (timer.isRunning) timer.resume();
    });
  }
}
