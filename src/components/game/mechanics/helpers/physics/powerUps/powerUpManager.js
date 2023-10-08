export default class PowerUpManager {
  static eatPowerUp(
    powerUp,
    assets,
    variables,
    scareGhosts = PowerUpManager.scareGhosts
  ) {
    if (
      powerUp.position.x === assets.characters.pacman.position.x &&
      powerUp.position.y === assets.characters.pacman.position.y
    ) {
      powerUp.changeEatenState();
      variables.score += 50;
      variables.killCount = 0;
      scareGhosts(assets);
    }
  }

  static scareGhosts(assets) {
    if (assets.timers.cycleTimer.isRunning) {
      assets.timers.cycleTimer.pause();
    }
    assets.timers.scaredTimer.reset();
    Object.values(assets.characters.ghosts).forEach((ghost) => {
      if (!ghost.isScared && !ghost.isRetreating) {
        ghost.changeScaredState();
        ghost.assignSprite();
        ghost.checkSpeedMatchesState();
      }
    });
    assets.timers.scaredTimer.start(assets.timers.cycleTimer);
  }
}
