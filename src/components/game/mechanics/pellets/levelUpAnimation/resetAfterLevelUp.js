import playGame from "../../playGame";

export default function resetAfterLevelUp(
  pacman,
  variables,
  ghosts,
  pellets,
  powerUps,
  cycleTimer,
  scaredTimer,
  audioPlayer,
  callback = playGame
) {
  pacman.reset();
  variables.lastKeyPressed = "";
  variables.levelUpCount = 0;
  cycleTimer.reset();
  scaredTimer.reset();
  if (scaredTimer.duration > 0) scaredTimer.duration -= 500;
  ghosts.forEach((ghost) => {
    ghost.reset();
  });
  pellets.forEach((pellet) => {
    pellet.changeEatenState();
  });
  powerUps.forEach((powerUp) => {
    if (powerUp.hasBeenEaten) powerUp.changeEatenState();
  });
  audioPlayer.ghostAudioWantsToPlay = true;
  cycleTimer.start();
  callback();
}
