import pauseAudio from "../audio/pauseAudio";
import pauseTimers from "../timers/pauseTimers";

export default function pauseAudioAndTimers(
  audioPlayer,
  cycleTimer,
  scaredTimer,
  retreatingTimers,
  callbackOne = pauseAudio,
  callbackTwo = pauseTimers
) {
  callbackOne(audioPlayer);
  callbackTwo(cycleTimer, scaredTimer, retreatingTimers);
}
