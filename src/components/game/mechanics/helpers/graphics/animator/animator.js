import playGame from "../../../playGame";
import Graphics from "../graphics";

export default class Animator {
  static loadPauseOverlay(
    ctx,
    pauseTextImage,
    loadTint = Animator.loadTint,
    loadPauseText = Animator.loadPauseText
  ) {
    loadTint(ctx);
    loadPauseText(ctx, pauseTextImage);
  }

  static loadTint(ctx) {
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 896, 992);
  }

  static loadPauseText(ctx, pauseTextImage) {
    ctx.globalAlpha = 1;
    ctx.drawImage(pauseTextImage, 98, 394, 700, 140);
  }

  static resumeAnimation(variables, ctx, assets, callback = playGame) {
    if (assets.characters.pacman.isShrinking) {
      Graphics.runDeathAnimation(variables, ctx, assets);
    } else if (assets.characters.pacman.isLevellingUp) {
      Graphics.runLevelUpAnimation(variables, assets, ctx);
    } else {
      callback(variables.player, variables.reactRoot);
    }
  }

  static drawLevelUpBoard(ctx, boundaries) {
    ctx.clearRect(0, 0, 896, 992);
    boundaries.forEach((boundary) => boundary.draw(ctx));
    ctx.font = "40px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Level Up!", 448, 560);
  }

  static drawBoard(ctx, assets) {
    ctx.clearRect(0, 0, 896, 992);
    assets.props.boundaries.forEach((boundary) => boundary.draw(ctx));
    assets.props.pellets.forEach((pellet) => {
      if (!pellet.hasBeenEaten) pellet.draw(ctx);
    });
    assets.props.powerUps.forEach((powerUp) => {
      if (!powerUp.hasBeenEaten) powerUp.update(ctx);
    });
  }

  static displayPleaseWait(ctx, loadTint = Animator.loadTint) {
    loadTint(ctx);
    ctx.globalAlpha = 1;
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Please wait...", 448, 496);
  }
}
