import checkPacmanGhostCollision from "./collisions/checkPacmanGhostCollision";
import updateCollisions from "./movement/updateCollisions";
import implementTunnel from "../boundaries/implementTunnel";
import checkSpeedMatchesState from "./movement/checkSpeedMatchesState";
import chooseMovement from "./movement/chooseMovement";

export default function implementGhosts(
  ghosts,
  boundaries,
  ctx,
  variables,
  pacman,
  pellets,
  powerUps,
  cycleTimer,
  scaredTimer,
  audioPlayer,
  callbackOne = checkSpeedMatchesState,
  callbackTwo = implementTunnel,
  callbackThree = updateCollisions,
  callbackFour = chooseMovement,
  callbackFive = checkPacmanGhostCollision
) {
  ghosts.forEach((ghost) => {
    callbackOne(ghost, variables);
    const collisions = [];
    ghost.update(ctx);
    callbackTwo(ghost, variables);
    callbackThree(boundaries, collisions, ghost);
    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      callbackFour(ghost, pacman, collisions, variables, ghosts[0]);
    }
    callbackFive(
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
  });
}
