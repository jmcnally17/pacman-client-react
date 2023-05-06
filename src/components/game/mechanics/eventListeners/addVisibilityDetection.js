import pauseAudioAndTimers from "./pauseAudioAndTimers";
import resumeAudioAndTimers from "./resumeAudioAndTimers";

export default function addVisibilityDetection(
  variables,
  cycleTimer,
  scaredTimer,
  retreatingTimers,
  audioPlayer,
  callbackOne = pauseAudioAndTimers,
  callbackTwo = resumeAudioAndTimers
) {
  window.addEventListener(
    "visibilitychange",
    (variables.visibilityEventListener = () => {
      if (!variables.isGamePaused && variables.isWindowVisible) {
        variables.isWindowVisible = false;
        callbackOne(audioPlayer, cycleTimer, scaredTimer, retreatingTimers);
      } else if (!variables.isGamePaused && !variables.isWindowVisible) {
        variables.isWindowVisible = true;
        callbackTwo(audioPlayer, cycleTimer, scaredTimer, retreatingTimers);
      }
    })
  );
}
