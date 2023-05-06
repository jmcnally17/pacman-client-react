export default function resetAfterGameOver(
  pellets,
  powerUps,
  ghosts,
  pacman,
  variables,
  cycleTimer,
  scaredTimer
) {
  pellets.forEach((pellet) => {
    if (pellet.hasBeenEaten) pellet.changeEatenState();
  });
  powerUps.forEach((powerUp) => {
    if (powerUp.hasBeenEaten) powerUp.changeEatenState();
  });
  cycleTimer.reset();
  scaredTimer.reset();
  scaredTimer.duration = 7000;
  ghosts.forEach((ghost) => {
    ghost.reset();
  });
  pacman.reset();
  pacman.lives = 2;
  variables.lastKeyPressed = "";
  variables.level = 1;
  window.removeEventListener("keydown", variables.directionEventListener);
  window.removeEventListener(
    "visibilitychange",
    variables.visibilityEventListener
  );
  window.removeEventListener("keydown", variables.pauseEventListener);
}
