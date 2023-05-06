import chaseAndScatter from "./chaseAndScatter/chaseAndScatter";
import moveRandomly from "./random/moveRandomly";

export default function chooseMovement(
  ghost,
  pacman,
  collisions,
  variables,
  redGhost,
  callbackOne = chaseAndScatter,
  callbackTwo = moveRandomly
) {
  if (!ghost.isScared && !ghost.isRetreating) {
    callbackOne(ghost, pacman, collisions, variables, redGhost);
  } else {
    callbackTwo(ghost, collisions);
  }
}
