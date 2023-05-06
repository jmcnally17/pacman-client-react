import endGame from "./gameOver/endGame";
import resetAfterDeath from "./resetAfterDeath";

export default function checkPacmanLives(
  pacman,
  variables,
  pellets,
  powerUps,
  ghosts,
  cycleTimer,
  scaredTimer,
  ctx,
  audioPlayer,
  callbackOne = endGame,
  callbackTwo = resetAfterDeath
) {
  if (pacman.lives <= 0) {
    callbackOne(
      variables,
      pellets,
      powerUps,
      ghosts,
      pacman,
      cycleTimer,
      scaredTimer,
      ctx
    );
  } else {
    pacman.lives--;
    callbackTwo(
      pacman,
      variables,
      ghosts,
      cycleTimer,
      scaredTimer,
      audioPlayer
    );
  }
}
