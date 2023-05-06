import scareGhosts from "./scareGhosts";

export default function eatPowerUp(
  powerUp,
  pacman,
  variables,
  ghosts,
  scaredTimer,
  cycleTimer,
  callback = scareGhosts
) {
  if (
    powerUp.position.x === pacman.position.x &&
    powerUp.position.y === pacman.position.y
  ) {
    powerUp.changeEatenState();
    variables.score += 50;
    variables.killCount = 0;
    callback(ghosts, cycleTimer, scaredTimer);
  }
}
