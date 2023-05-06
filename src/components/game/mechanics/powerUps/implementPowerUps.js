import eatPowerUp from "./eatPowerUp";

export default function implementPowerUps(
  powerUps,
  ctx,
  pacman,
  variables,
  ghosts,
  scaredTimer,
  cycleTimer,
  callback = eatPowerUp
) {
  powerUps.forEach((powerUp) => {
    if (!powerUp.hasBeenEaten) {
      powerUp.update(ctx);
      callback(powerUp, pacman, variables, ghosts, scaredTimer, cycleTimer);
    }
  });
}
