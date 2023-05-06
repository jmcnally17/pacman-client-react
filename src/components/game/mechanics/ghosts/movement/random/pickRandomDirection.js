export default function pickRandomDirection(ghost, pathways) {
  const direction = pathways[Math.floor(Math.random() * pathways.length)];
  if (direction === "up") {
    ghost.velocity.x = 0;
    ghost.velocity.y = -ghost.speed;
  } else if (direction === "down") {
    ghost.velocity.x = 0;
    ghost.velocity.y = ghost.speed;
  } else if (direction === "right") {
    ghost.velocity.x = ghost.speed;
    ghost.velocity.y = 0;
  } else if (direction === "left") {
    ghost.velocity.x = -ghost.speed;
    ghost.velocity.y = 0;
  }
}
