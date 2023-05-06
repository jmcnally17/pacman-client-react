export default function collisionConditional(ghost, pacman) {
  if (
    ghost.position.y - ghost.radius <= pacman.position.y + pacman.radius &&
    ghost.position.y + ghost.radius >= pacman.position.y - pacman.radius &&
    ghost.position.x + ghost.radius >= pacman.position.x - pacman.radius &&
    ghost.position.x - ghost.radius <= pacman.position.x + pacman.radius
  ) {
    return true;
  }
  return false;
}
