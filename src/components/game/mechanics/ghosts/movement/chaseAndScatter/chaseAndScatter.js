import emptyPrevCollisions from "../emptyPrevCollisions";
import calculateDistance from "./calculateDistance";
import pickDirection from "./pickDirection";

export default function chaseAndScatter(
  ghost,
  pacman,
  collisions,
  variables,
  redGhost,
  callbackOne = calculateDistance,
  callbackTwo = pickDirection,
  callbackthree = emptyPrevCollisions
) {
  if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
  else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
  else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");
  else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");

  const pathways = [];
  ghost.prevCollisions.forEach((collision) => {
    if (!collisions.includes(collision)) {
      pathways.push({
        direction: collision,
      });
    }
  });
  callbackOne(pacman, ghost, pathways, variables, redGhost);
  callbackTwo(pathways, ghost);
  callbackthree(ghost);
}
