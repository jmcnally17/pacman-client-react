import implementBoundaries from "./boundaries/implementBoundaries";
import implementPellets from "./pellets/implementPellets";
import implementPowerUps from "./powerUps/implementPowerUps";
import implementGhosts from "./ghosts/implementGhosts";
import implementPacman from "./pacman/implementPacman";

export default function implementObjects(
  boundaries,
  ghosts,
  pacman,
  pellets,
  powerUps,
  cycleTimer,
  scaredTimer,
  ctx,
  variables,
  audioPlayer,
  callbackOne = implementBoundaries,
  callbackTwo = implementPellets,
  callbackThree = implementPowerUps,
  callbackFour = implementGhosts,
  callbackFive = implementPacman
) {
  callbackOne(boundaries, ctx, pacman);
  callbackTwo(
    pellets,
    ctx,
    pacman,
    variables,
    ghosts,
    powerUps,
    cycleTimer,
    scaredTimer,
    audioPlayer,
    boundaries
  );
  callbackThree(
    powerUps,
    ctx,
    pacman,
    variables,
    ghosts,
    scaredTimer,
    cycleTimer
  );
  callbackFour(
    ghosts,
    boundaries,
    ctx,
    variables,
    pacman,
    pellets,
    powerUps,
    cycleTimer,
    scaredTimer,
    audioPlayer
  );
  callbackFive(variables, pacman, boundaries, ctx, pellets);
}
