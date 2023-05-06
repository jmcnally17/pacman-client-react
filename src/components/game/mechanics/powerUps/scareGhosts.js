export default function scareGhosts(ghosts, cycleTimer, scaredTimer) {
  if (cycleTimer.isRunning) cycleTimer.pause();
  scaredTimer.reset();
  ghosts.forEach((ghost) => {
    if (!ghost.isScared && !ghost.isRetreating) ghost.changeScaredState();
  });
  scaredTimer.start(cycleTimer);
}
