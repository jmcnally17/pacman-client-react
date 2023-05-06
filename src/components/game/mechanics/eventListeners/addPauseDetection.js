import pauseAudioAndTimers from "./pauseAudioAndTimers";
import loadPauseOverlay from "./loadPauseOverlay";
import resumeAudioAndTimers from "./resumeAudioAndTimers";
import resumeAnimation from "./resumeAnimation";

export default function addPauseDetection(
  variables,
  cycleTimer,
  scaredTimer,
  retreatingTimers,
  audioPlayer,
  pacman,
  ctx,
  boundaries,
  pellets,
  powerUps,
  ghosts,
  pauseTextImage,
  callbackOne = pauseAudioAndTimers,
  callbackTwo = loadPauseOverlay,
  callbackThree = resumeAudioAndTimers,
  callbackFour = resumeAnimation
) {
  window.addEventListener(
    "keydown",
    (variables.pauseEventListener = ({ key }) => {
      if (key === "Escape") {
        if (!variables.isGamePaused) {
          variables.isGamePaused = true;
          cancelAnimationFrame(variables.animationId);
          callbackOne(audioPlayer, cycleTimer, scaredTimer, retreatingTimers);
          callbackTwo(ctx, pauseTextImage);
        } else {
          variables.isGamePaused = false;
          callbackThree(audioPlayer, cycleTimer, scaredTimer, retreatingTimers);
          callbackFour(
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
        }
      }
    })
  );
}
