import Animator from "./animator/animator";
import PelletManager from "../physics/pellets/pelletManager";
import GhostCollision from "../physics/ghosts/collisions/ghostCollision";

export default class Graphics {
  static displayScore(ctx, variables) {
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${variables.score}`, 10, 15);
  }

  static displayLevel(ctx, variables) {
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Level ${variables.level}`, 300, 15);
  }

  static displayLives(ctx, pacman, drawPacmanIcon = Graphics.drawPacmanIcon) {
    if (pacman.lives >= 1)
      drawPacmanIcon(ctx, {
        x: 580,
        y: 15,
      });
    if (pacman.lives >= 2)
      drawPacmanIcon(ctx, {
        x: 540,
        y: 15,
      });
  }

  static drawPacmanIcon(ctx, position) {
    ctx.beginPath();
    ctx.arc(position.x, position.y, 15, Math.PI / 4, (Math.PI * 7) / 4);
    ctx.lineTo(position.x - 5, position.y);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }

  static runLevelUpAnimation(
    variables,
    assets,
    ctx,
    runLevelUpAnimation = Graphics.runLevelUpAnimation
  ) {
    variables.animationId = requestAnimationFrame(() =>
      runLevelUpAnimation(variables, assets, ctx)
    );
    if (performance.now() - variables.startTime >= variables.frameLifetime) {
      Animator.drawLevelUpBoard(ctx, assets.props.boundaries);
      if (variables.levelUpCount % 10 === 0 && variables.levelUpCount !== 0)
        assets.props.boundaries.forEach((boundary) => boundary.flash());
      variables.levelUpCount++;
      if (variables.levelUpCount >= 350) {
        assets.characters.pacman.isLevellingUp = false;
        cancelAnimationFrame(variables.animationId);
        variables.level++;
        PelletManager.resetAfterLevelUp(assets, variables);
      }
      variables.startTime = performance.now();
    }
  }

  static runDeathAnimation(
    variables,
    ctx,
    assets,
    runDeathAnimation = Graphics.runDeathAnimation
  ) {
    variables.animationId = requestAnimationFrame(() =>
      runDeathAnimation(variables, ctx, assets)
    );
    if (performance.now() - variables.startTime >= variables.frameLifetime) {
      Animator.drawBoard(ctx, assets);
      const pacman = assets.characters.pacman;
      if (pacman.radians < Math.PI) {
        pacman.shrink(ctx);
      } else {
        pacman.isShrinking = false;
        cancelAnimationFrame(variables.animationId);
        GhostCollision.checkPacmanLives(assets, variables, ctx);
      }
      variables.startTime = performance.now();
    }
  }
}
