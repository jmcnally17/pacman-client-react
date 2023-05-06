export default function shiftRight(ghost) {
  if (ghost.position.x % 8 === 2) ghost.position.x += 6;
  else if (ghost.position.x % 8 === 4) ghost.position.x += 4;
  else if (ghost.position.x % 8 === 6) ghost.position.x += 2;
}
