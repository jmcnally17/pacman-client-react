import resumeAudio from "../audio/resumeAudio";
import resumeTimers from "../timers/resumeTimers";

export default function resumeAudioAndTimers(
  audioPlayer,
  cycleTimer,
  scaredTimer,
  retreatingTimers,
  callbackOne = resumeAudio,
  callbackTwo = resumeTimers
) {
  callbackOne(audioPlayer);
  callbackTwo(cycleTimer, scaredTimer, retreatingTimers);
}
