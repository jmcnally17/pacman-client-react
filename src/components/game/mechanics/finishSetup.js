import addDirectionDetection from "./eventListeners/addDirectionDetection";
import addVisibilityDetection from "./eventListeners/addVisibilityDetection";
import addPauseDetection from "./eventListeners/addPauseDetection";

export default function finishSetup(
  variables,
  player,
  reactRoot,
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
  callbackOne = addDirectionDetection,
  callbackTwo = addVisibilityDetection,
  callbackThree = addPauseDetection
) {
  variables.player = player;
  variables.reactRoot = reactRoot;
  cycleTimer.start();
  callbackOne(variables);
  callbackTwo(
    variables,
    cycleTimer,
    scaredTimer,
    retreatingTimers,
    audioPlayer
  );
  callbackThree(
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
    pauseTextImage
  );
  variables.start = false;
  audioPlayer.ghostAudioWantsToPlay = true;
}
