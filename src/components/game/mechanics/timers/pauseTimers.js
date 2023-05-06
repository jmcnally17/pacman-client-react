export default function pauseTimers(cycleTimer, scaredTimer, retreatingTimers) {
  if (scaredTimer.isRunning) scaredTimer.pause();
  else cycleTimer.pause();
  retreatingTimers.forEach((timer) => {
    if (timer.isRunning) timer.pause();
  });
}
