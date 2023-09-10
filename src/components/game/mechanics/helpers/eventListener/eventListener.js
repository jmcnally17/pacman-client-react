import AudioManager from "../audio/audioManager";
import Timer from "../timer/timer";
import Animator from "../graphics/animator/animator";

export default class EventListener {
  static addDirectionDetection(variables) {
    window.addEventListener(
      "keydown",
      (variables.directionEventListener = ({ key }) => {
        if (key === "ArrowUp") {
          variables.lastKeyPressed = "up";
        } else if (key === "ArrowLeft") {
          variables.lastKeyPressed = "left";
        } else if (key === "ArrowRight") {
          variables.lastKeyPressed = "right";
        } else if (key === "ArrowDown") {
          variables.lastKeyPressed = "down";
        }
      })
    );
  }

  static addVisibilityDetection(variables, assets) {
    window.addEventListener(
      "visibilitychange",
      (variables.visibilityEventListener = () => {
        if (!variables.isGamePaused && variables.isWindowVisible) {
          variables.isWindowVisible = false;
          AudioManager.pauseAudio(assets.audioPlayer);
          Timer.pauseTimers(assets.timers);
        } else if (!variables.isGamePaused && !variables.isWindowVisible) {
          variables.isWindowVisible = true;
          AudioManager.resumeAudio(assets.audioPlayer);
          Timer.resumeTimers(assets.timers);
        }
      })
    );
  }

  static addPauseDetection(variables, assets, ctx) {
    window.addEventListener(
      "keydown",
      (variables.pauseEventListener = ({ key }) => {
        if (key === "Escape") {
          if (!variables.isGamePaused) {
            variables.isGamePaused = true;
            cancelAnimationFrame(variables.animationId);
            AudioManager.pauseAudio(assets.audioPlayer);
            Timer.pauseTimers(assets.timers);
            Animator.loadPauseOverlay(ctx, assets.pauseTextImage);
          } else {
            variables.isGamePaused = false;
            AudioManager.resumeAudio(assets.audioPlayer);
            Timer.resumeTimers(assets.timers);
            Animator.resumeAnimation(variables, ctx, assets);
          }
        }
      })
    );
  }
}
