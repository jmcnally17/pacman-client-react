export default function checkIfPacmanIsEating(pellets, pacman) {
  let count = 0;
  pellets.forEach((pellet) => {
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
