import runLevelUpAnimation from "./levelUpAnimation/runLevelUpAnimation";

export default function checkLevelUpCondition(
  pellets,
  pacman,
  variables,
  ghosts,
  powerUps,
  cycleTimer,
  scaredTimer,
  ctx,
  audioPlayer,
  boundaries,
  callback = runLevelUpAnimation
) {
  let eatenPellets = 0;
  pellets.forEach((pellet) => {
    if (pellet.hasBeenEaten) {
      eatenPellets++;
    }
    if (eatenPellets === pellets.length) {
      cancelAnimationFrame(variables.animationId);
      audioPlayer.stopGhostAudio();
      audioPlayer.playLevelUp();
      pacman.isLevellingUp = true;
      callback(
        variables,
        pacman,
        ghosts,
        pellets,
        powerUps,
        cycleTimer,
        scaredTimer,
        ctx,
        boundaries,
        audioPlayer
      );
    }
  });
}
