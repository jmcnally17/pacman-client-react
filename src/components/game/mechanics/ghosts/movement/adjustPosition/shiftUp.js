export default function shiftUp(ghost) {
  if (ghost.position.y % 8 === 2) ghost.position.y -= 2;
  else if (ghost.position.y % 8 === 4) ghost.position.y -= 4;
  else if (ghost.position.y % 8 === 6) ghost.position.y -= 6;
}
