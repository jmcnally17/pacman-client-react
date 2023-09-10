import BoundaryManager from "../boundaries/boundaryManager";

export default class PacmanManager {
  static changeDirection(
    variables,
    assets,
    checkDirectionChange = PacmanManager.checkDirectionChange
  ) {
    const pacman = assets.characters.pacman;
    const boundaries = assets.props.boundaries;
    if (variables.lastKeyPressed === "up") {
      checkDirectionChange(pacman, boundaries, {
        velocity: { x: 0, y: -pacman.speed },
      });
    } else if (variables.lastKeyPressed === "down") {
      checkDirectionChange(pacman, boundaries, {
        velocity: { x: 0, y: pacman.speed },
      });
    } else if (variables.lastKeyPressed === "right") {
      checkDirectionChange(pacman, boundaries, {
        velocity: { x: pacman.speed, y: 0 },
      });
    } else if (variables.lastKeyPressed === "left") {
      checkDirectionChange(pacman, boundaries, {
        velocity: { x: -pacman.speed, y: 0 },
      });
    }
  }

  static checkDirectionChange(pacman, boundaries, { velocity }) {
    let count = 0;
    for (let i = 0; i < boundaries.length; i++) {
      if (
        BoundaryManager.hitBoundaryConditional(pacman, boundaries[i], {
          velocity,
        })
      )
        count++;
    }
    if (count === 0) {
      pacman.velocity.x = velocity.x;
      pacman.velocity.y = velocity.y;
    }
  }

  static checkIfPacmanIsEating(assets) {
    let count = 0;
    const pacman = assets.characters.pacman;
    assets.props.pellets.forEach((pellet) => {
      if (
        pellet.position.y - pellet.radius <=
          pacman.position.y + pacman.radius * 2 + pacman.velocity.y * 2 &&
        pellet.position.y + pellet.radius >=
          pacman.position.y - pacman.radius * 2 + pacman.velocity.y * 2 &&
        pellet.position.x + pellet.radius >=
          pacman.position.x - pacman.radius * 2 + pacman.velocity.x * 2 &&
        pellet.position.x - pellet.radius <=
          pacman.position.x + pacman.radius * 2 + pacman.velocity.x * 2 &&
        !pellet.hasBeenEaten
      ) {
        count++;
      }
    });
    if (count > 0) {
      pacman.isEating = true;
    } else {
      pacman.isEating = false;
    }
  }
}
