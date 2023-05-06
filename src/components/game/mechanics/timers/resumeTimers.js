export default function resumeTimers(
  cycleTimer,
  scaredTimer,
  retreatingTimers
) {
  if (scaredTimer.isRunning) scaredTimer.resume(cycleTimer);
  else cycleTimer.resume();
  retreatingTimers.forEach((timer) => {
    if (timer.isRunning) timer.resume();
  });
}
