export default function hitBoundaryConditional(
  character,
  boundary,
  { velocity }
) {
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
