import emptyPrevCollisions from "../emptyPrevCollisions";
import pickRandomDirection from "./pickRandomDirection";

export default function moveRandomly(
  ghost,
  collisions,
  callbackOne = pickRandomDirection,
  callbackTwo = emptyPrevCollisions
) {
  if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
  else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
  else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");
  else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");

  const pathways = ghost.prevCollisions.filter((collision) => {
    return !collisions.includes(collision);
  });
  callbackOne(ghost, pathways);
  callbackTwo(ghost);
}
