import collisionConditional from "./collisionConditional";
import dealWithCollision from "./dealWithCollision";

export default function checkPacmanGhostCollision(
  ghost,
  pacman,
  variables,
  ghosts,
  pellets,
  powerUps,
  cycleTimer,
  scaredTimer,
  audioPlayer,
  ctx,
  boundaries,
  callbackOne = collisionConditional,
  callbackTwo = dealWithCollision
) {
  if (callbackOne(ghost, pacman)) {
    callbackTwo(
      ghost,
      pacman,
      variables,
      ghosts,
      pellets,
      powerUps,
      cycleTimer,
      scaredTimer,
      audioPlayer,
      ctx,
      boundaries
    );
  }
}
