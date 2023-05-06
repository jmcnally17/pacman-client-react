import playGame from "../../../playGame";

export default function resetAfterDeath(
  pacman,
  variables,
  ghosts,
  cycleTimer,
  scaredTimer,
  audioPlayer,
  callbackOne = playGame
) {
  pacman.reset();
  variables.lastKeyPressed = "";
  cycleTimer.reset();
  scaredTimer.reset();
  ghosts.forEach((ghost) => {
    ghost.reset();
  });
  cycleTimer.start();
  audioPlayer.ghostAudioWantsToPlay = true;
  callbackOne(variables.player, variables.reactRoot);
}
