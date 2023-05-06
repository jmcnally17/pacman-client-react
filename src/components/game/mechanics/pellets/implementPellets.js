import checkLevelUpCondition from "./checkLevelUpCondition";
import eatPellet from "./eatPellet";

export default function implementPellets(
  pellets,
  ctx,
  pacman,
  variables,
  ghosts,
  powerUps,
  cycleTimer,
  scaredTimer,
  audioPlayer,
  boundaries,
  callbackOne = eatPellet,
  callbackTwo = checkLevelUpCondition
) {
  pellets.forEach((pellet) => {
    if (!pellet.hasBeenEaten) {
      pellet.draw(ctx);
      callbackOne(pellet, pacman, variables);
    }
  });
  callbackTwo(
    pellets,
    pacman,
    variables,
    ghosts,
    powerUps,
    cycleTimer,
    scaredTimer,
    ctx,
    audioPlayer,
    boundaries
  );
}
