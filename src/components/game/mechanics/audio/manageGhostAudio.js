import playGhostAudio from "./playGhostAudio";

export default function manageGhostAudio(
  audioPlayer,
  scaredTimer,
  retreatingTimers,
  callback = playGhostAudio
) {
  if (audioPlayer.ghostAudioWantsToPlay)
    callback(audioPlayer, scaredTimer, retreatingTimers);
}
