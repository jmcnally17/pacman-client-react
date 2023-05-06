export default function shiftRegular(ghost) {
  if (ghost.position.x % 4 !== 0) ghost.position.x += 2;
  if (ghost.position.y % 4 !== 0) ghost.position.y += 2;
}
