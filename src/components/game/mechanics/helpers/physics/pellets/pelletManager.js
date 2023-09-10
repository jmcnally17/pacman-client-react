import Graphics from "../../graphics/graphics";
import playGame from "../../../playGame";

export default class PelletManager {
  static eatPellet(pellet, pacman, variables) {
    if (
      pellet.position.x === pacman.position.x &&
      pellet.position.y === pacman.position.y
    ) {
      pellet.changeEatenState();
      variables.score += 10;
    }
  }

  static checkLevelUpCondition(assets, variables, ctx) {
    let eatenPellets = 0;
    assets.props.pellets.forEach((pellet) => {
      if (pellet.hasBeenEaten) {
        eatenPellets++;
      }
      if (eatenPellets === assets.props.pellets.length) {
        cancelAnimationFrame(variables.animationId);
        assets.audioPlayer.stopGhostAudio();
        assets.audioPlayer.playLevelUp();
        assets.characters.pacman.isLevellingUp = true;
        Graphics.runLevelUpAnimation(variables, assets, ctx);
      }
    });
  }

  static resetAfterLevelUp(assets, variables, callback = playGame) {
    assets.characters.pacman.reset();
    variables.lastKeyPressed = "";
    variables.levelUpCount = 0;
    assets.timers.cycleTimer.reset();
    assets.timers.scaredTimer.reset();
    if (assets.timers.scaredTimer.duration > 0)
      assets.timers.scaredTimer.duration -= 500;
    Object.values(assets.characters.ghosts).forEach((ghost) => {
      ghost.reset();
    });
    assets.props.pellets.forEach((pellet) => {
      pellet.changeEatenState();
    });
    assets.props.powerUps.forEach((powerUp) => {
      if (powerUp.hasBeenEaten) powerUp.changeEatenState();
    });
    assets.audioPlayer.ghostAudioWantsToPlay = true;
    assets.timers.cycleTimer.start();
    callback();
  }
}
