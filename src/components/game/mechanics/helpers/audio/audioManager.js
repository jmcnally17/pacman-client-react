export default class AudioManager {
  static playGhostAudio(assets) {
    let count = 0;
    const timers = assets.timers;
    const audioPlayer = assets.audioPlayer;
    timers.retreatingTimers.forEach((timer) => {
      if (timer.isRunning) count++;
    });
    if (count > 0) {
      if (!audioPlayer.ghostRetreating.playing()) {
        audioPlayer.playGhostRetreating();
      }
    } else if (
      timers.scaredTimer.isRunning &&
      !audioPlayer.ghostScared.playing()
    ) {
      audioPlayer.playGhostScared();
    } else if (
      !timers.scaredTimer.isRunning &&
      !audioPlayer.ghostSiren.playing()
    ) {
      audioPlayer.playGhostSiren();
    }
  }

  static pauseAudio(audioPlayer) {
    audioPlayer.pauseAll();
  }

  static resumeAudio(audioPlayer) {
    audioPlayer.playPacmanDeathAndLevelUpIfWantTo();
  }
}
