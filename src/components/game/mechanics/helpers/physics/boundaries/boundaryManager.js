export default class BoundaryManager {
  static hitBoundaryConditional(character, boundary, { velocity }) {
    const padding = boundary.width / 2 - character.radius - 1;
    if (
      character.position.y - character.radius + velocity.y <=
        boundary.position.y + boundary.height + padding &&
      character.position.y + character.radius + velocity.y >=
        boundary.position.y - padding &&
      character.position.x + character.radius + velocity.x >=
        boundary.position.x - padding &&
      character.position.x - character.radius + velocity.x <=
        boundary.position.x + boundary.width + padding
    ) {
      return true;
    }
    return false;
  }

  static implementTunnel(character, variables) {
    if (character.position.x === (variables.tileLength * 57) / 2)
      character.position.x = -variables.tileLength / 2;
    else if (character.position.x === -variables.tileLength / 2)
      character.position.x = (variables.tileLength * 57) / 2;
  }

  static stopPacmanCollision(
    boundary,
    pacman,
    hitBoundaryConditional = BoundaryManager.hitBoundaryConditional
  ) {
    if (
      hitBoundaryConditional(pacman, boundary, {
        velocity: {
          x: pacman.velocity.x,
          y: pacman.velocity.y,
        },
      })
    ) {
      pacman.velocity.x = 0;
      pacman.velocity.y = 0;
    }
  }
}
