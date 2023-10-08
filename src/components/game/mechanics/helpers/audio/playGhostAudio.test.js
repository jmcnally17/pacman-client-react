import AudioManager from "./audioManager";

describe("playGhostAudio", () => {
  let assets;
  let siren;
  let playingSiren;
  let scared;
  let playingScared;
  let retreating;
  let playingRetreating;
  let audioPlayer;
  let scaredTimer;
  let runningScaredTimer;
  let retreatingTimer;
  let runningRetreatingTimer;
  let retreatingTimers;
  let runningRetreatingTimers;

  beforeEach(() => {
    siren = { playing: () => false };
    playingSiren = { playing: () => true };
    scared = { playing: () => false };
    playingScared = { playing: () => true };
    retreating = { playing: () => false };
    playingRetreating = { playing: () => true };
    audioPlayer = {
      ghostSiren: siren,
      ghostScared: scared,
      ghostRetreating: retreating,
      playGhostSiren: () => undefined,
      playGhostScared: () => undefined,
      playGhostRetreating: () => undefined,
    };
    scaredTimer = { isRunning: false };
    runningScaredTimer = { isRunning: true };
    retreatingTimer = { isRunning: false };
    runningRetreatingTimer = { isRunning: true };
    retreatingTimers = [
      retreatingTimer,
      retreatingTimer,
      retreatingTimer,
      retreatingTimer,
    ];
    runningRetreatingTimers = [
      runningRetreatingTimer,
      runningRetreatingTimer,
      runningRetreatingTimer,
      runningRetreatingTimer,
    ];
    jest.spyOn(siren, "playing");
    jest.spyOn(playingSiren, "playing");
    jest.spyOn(scared, "playing");
    jest.spyOn(playingScared, "playing");
    jest.spyOn(retreating, "playing");
    jest.spyOn(playingRetreating, "playing");
    jest.spyOn(audioPlayer, "playGhostSiren");
    jest.spyOn(audioPlayer, "playGhostScared");
    jest.spyOn(audioPlayer, "playGhostRetreating");
    assets = {
      timers: {
        scaredTimer: scaredTimer,
        retreatingTimers: retreatingTimers,
      },
      audioPlayer: audioPlayer,
    };
  });

  it("calls playGhostRetreating on the audioPlayer if the retreating audio is not playing and any of the retreating timers are running", () => {
    assets.timers.retreatingTimers = runningRetreatingTimers;
    AudioManager.playGhostAudio(assets);
    expect(retreating.playing).toHaveBeenCalledTimes(1);
    expect(audioPlayer.playGhostRetreating).toHaveBeenCalledTimes(1);
  });

  it("leaves the retreating audio playing if any of the retreating timers are running", () => {
    audioPlayer.ghostRetreating = playingRetreating;
    assets.timers.retreatingTimers = runningRetreatingTimers;
    AudioManager.playGhostAudio(assets);
    expect(playingRetreating.playing).toHaveBeenCalledTimes(1);
    expect(audioPlayer.playGhostSiren).toHaveBeenCalledTimes(0);
    expect(audioPlayer.playGhostScared).toHaveBeenCalledTimes(0);
    expect(audioPlayer.playGhostRetreating).toHaveBeenCalledTimes(0);
  });

  it("calls playGhostScared on the audioPlayer if the scared audio is not playing and the scared timer is running", () => {
    assets.timers.scaredTimer = runningScaredTimer;
    AudioManager.playGhostAudio(assets);
    expect(scared.playing).toHaveBeenCalledTimes(1);
    expect(audioPlayer.playGhostScared).toHaveBeenCalledTimes(1);
  });

  it("leaves the scared audio playing if the scared timer is running", () => {
    audioPlayer.ghostScared = playingScared;
    assets.timers.scaredTimer = runningScaredTimer;
    AudioManager.playGhostAudio(assets);
    expect(playingScared.playing).toHaveBeenCalledTimes(1);
    expect(audioPlayer.playGhostSiren).toHaveBeenCalledTimes(0);
    expect(audioPlayer.playGhostScared).toHaveBeenCalledTimes(0);
    expect(audioPlayer.playGhostRetreating).toHaveBeenCalledTimes(0);
  });

  it("calls playGhostSiren on the audioPlayer if the siren audio is not playing and the scared timer is not running", () => {
    AudioManager.playGhostAudio(assets);
    expect(siren.playing).toHaveBeenCalledTimes(1);
    expect(audioPlayer.playGhostSiren).toHaveBeenCalledTimes(1);
  });

  it("leaves the siren audio playing if the scared timer is not running", () => {
    audioPlayer.ghostSiren = playingSiren;
    AudioManager.playGhostAudio(assets);
    expect(playingSiren.playing).toHaveBeenCalledTimes(1);
    expect(audioPlayer.playGhostSiren).toHaveBeenCalledTimes(0);
    expect(audioPlayer.playGhostScared).toHaveBeenCalledTimes(0);
    expect(audioPlayer.playGhostRetreating).toHaveBeenCalledTimes(0);
  });
});
