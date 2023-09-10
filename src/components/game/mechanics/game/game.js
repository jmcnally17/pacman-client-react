import EventListener from "../helpers/eventListener/eventListener";
import Physics from "../helpers/physics/physics";
import Graphics from "../helpers/graphics/graphics";
import AudioManager from "../helpers/audio/audioManager";

export default class Game {
  static finishSetup(variables, player, reactRoot, assets, ctx) {
    variables.player = player;
    variables.reactRoot = reactRoot;
    assets.timers.cycleTimer.start();
    EventListener.addDirectionDetection(variables);
    EventListener.addVisibilityDetection(variables, assets);
    EventListener.addPauseDetection(variables, assets, ctx);
    variables.start = false;
    assets.audioPlayer.ghostAudioWantsToPlay = true;
    variables.startTime = performance.now();
  }

  static implementPhysics(assets, ctx, variables) {
    Physics.implementBoundaries(assets, ctx);
    Physics.implementPellets(assets, ctx, variables);
    Physics.implementPowerUps(assets, ctx, variables);
    Physics.implementGhosts(assets, ctx, variables);
    Physics.implementPacman(variables, assets, ctx);
  }

  static implementGraphics(variables, pacman) {
    const info = document.querySelector("#info");
    const ctx = info.getContext("2d");
    ctx.clearRect(0, 0, info.width, info.height);
    ctx.font = "20px microN56";
    ctx.textBaseline = "middle";
    Graphics.displayScore(ctx, variables);
    Graphics.displayLevel(ctx, variables);
    Graphics.displayLives(ctx, pacman);
  }

  static manageGhostAudio(assets) {
    if (assets.audioPlayer.ghostAudioWantsToPlay)
      AudioManager.playGhostAudio(assets);
  }
}
