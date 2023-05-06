import hitBoundaryConditional from "./hitBoundaryConditional";

export default function stopPacmanCollision(boundary, pacman) {
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
