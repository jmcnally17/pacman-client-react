import BoundaryManager from "./boundaries/boundaryManager";
import PelletManager from "./pellets/pelletManager";
import PowerUpManager from "./powerUps/powerUpManager";
import GhostManager from "./ghosts/ghostManager";
import PacmanManager from "./pacman/pacmanManager";

export default class Physics {
  static implementBoundaries(assets, ctx) {
    assets.props.boundaries.forEach((boundary) => {
      boundary.draw(ctx);
      BoundaryManager.stopPacmanCollision(boundary, assets.characters.pacman);
    });
  }

  static implementPellets(assets, ctx, variables) {
    assets.props.pellets.forEach((pellet) => {
      if (!pellet.hasBeenEaten) {
        pellet.draw(ctx);
        PelletManager.eatPellet(pellet, assets.characters.pacman, variables);
      }
    });
    PelletManager.checkLevelUpCondition(assets, variables, ctx);
  }

  static implementPowerUps(assets, ctx, variables) {
    assets.props.powerUps.forEach((powerUp) => {
      if (!powerUp.hasBeenEaten) {
        powerUp.update(ctx);
        PowerUpManager.eatPowerUp(powerUp, assets, variables);
      }
    });
  }

  static implementGhosts(assets, ctx, variables) {
    Object.values(assets.characters.ghosts).forEach((ghost) => {
      const collisions = [];
      ghost.update(ctx);
      BoundaryManager.implementTunnel(ghost, variables);
      GhostManager.updateCollisions(assets.props.boundaries, collisions, ghost);
      if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
        GhostManager.chooseMovement(ghost, assets, collisions, variables);
      }
      GhostManager.checkPacmanGhostCollision(ghost, assets, variables, ctx);
    });
  }

  static implementPacman(variables, assets, ctx) {
    PacmanManager.changeDirection(variables, assets);
    PacmanManager.checkIfPacmanIsEating(assets);
    assets.characters.pacman.update(ctx);
    BoundaryManager.implementTunnel(assets.characters.pacman, variables);
  }
}
