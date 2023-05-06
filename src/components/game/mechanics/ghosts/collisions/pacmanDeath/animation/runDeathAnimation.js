import checkPacmanLives from "../checkPacmanLives";
import drawBoard from "./drawBoard";

export default function runDeathAnimation(
  variables,
  ctx,
  boundaries,
  pellets,
  powerUps,
  pacman,
  ghosts,
  cycleTimer,
  scaredTimer,
  audioPlayer,
  callbackOne = runDeathAnimation,
  callbackTwo = drawBoard,
  callbackThree = checkPacmanLives
) {
  variables.animationId = requestAnimationFrame(() =>
    callbackOne(
      variables,
      ctx,
      boundaries,
      pellets,
      powerUps,
      pacman,
      ghosts,
      cycleTimer,
      scaredTimer,
      audioPlayer
    )
  );
  callbackTwo(ctx, boundaries, pellets, powerUps);
  if (pacman.radians < Math.PI) {
    pacman.shrink(ctx);
  } else {
    pacman.isShrinking = false;
    cancelAnimationFrame(variables.animationId);
    callbackThree(
      pacman,
      variables,
      pellets,
      powerUps,
      ghosts,
      cycleTimer,
      scaredTimer,
      ctx,
      audioPlayer
    );
  }
}
