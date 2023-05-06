export default function isOrangeFarFromPacman(orangeGhost, pacman, variables) {
  const x = pacman.position.x - orangeGhost.position.x;
  const y = pacman.position.y - orangeGhost.position.y;
  const distance = Math.hypot(x, y);
  if (distance > variables.tileLength * 8) return true;
  return false;
}
