import runDeathAnimation from "./pacmanDeath/animation/runDeathAnimation";

export default function dealWithCollision(
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
  callback = runDeathAnimation
) {
  if (!ghost.isScared && !ghost.isRetreating) {
    pacman.radians = Math.PI / 4;
    cancelAnimationFrame(variables.animationId);
    audioPlayer.stopGhostAudio();
    audioPlayer.playPacmanDeath();
    pacman.isShrinking = true;
    callback(
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
    );
  } else if (ghost.isScared) {
    variables.score += 200 * Math.pow(2, variables.killCount);
    variables.killCount++;
    ghost.changeRetreatingState();
    ghost.retreatingTimer.start();
    ghost.changeScaredState();
  }
}
