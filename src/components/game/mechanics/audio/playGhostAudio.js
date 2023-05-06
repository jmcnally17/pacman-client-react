export default function playGhostAudio(
  audioPlayer,
  scaredTimer,
  retreatingTimers
) {
  let count = 0;
  retreatingTimers.forEach((timer) => {
    if (timer.isRunning) count++;
  });
  if (count > 0) {
    if (!audioPlayer.ghostRetreating.playing()) {
      audioPlayer.playGhostRetreating();
    }
  } else if (scaredTimer.isRunning && !audioPlayer.ghostScared.playing()) {
    audioPlayer.playGhostScared();
  } else if (!scaredTimer.isRunning && !audioPlayer.ghostSiren.playing()) {
    audioPlayer.playGhostSiren();
  }
}
