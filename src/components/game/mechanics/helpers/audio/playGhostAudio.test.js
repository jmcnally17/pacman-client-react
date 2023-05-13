import playGhostAudio from "./playGhostAudio";

let mockSiren;
let mockPlayingSiren;
let mockScared;
let mockPlayingScared;
let mockRetreating;
let mockPlayingRetreating;
let mockAudioPlayer;
let mockScaredTimer;
let mockRunningScaredTimer;
let mockRetreatingTimer;
let mockRunningRetreatingTimer;
let mockRetreatingTimers;
let mockRunningRetreatingTimers;

describe("playGhostAudio", () => {
  beforeEach(() => {
    mockSiren = {
      playing: () => false,
    };
    mockPlayingSiren = {
      playing: () => true,
    };
    mockScared = {
      playing: () => false,
    };
    mockPlayingScared = {
      playing: () => true,
    };
    mockRetreating = {
      playing: () => false,
    };
    mockPlayingRetreating = {
      playing: () => true,
    };
    mockAudioPlayer = {
      ghostSiren: mockSiren,
      ghostScared: mockScared,
      ghostRetreating: mockRetreating,
      playGhostSiren: () => undefined,
      playGhostScared: () => undefined,
      playGhostRetreating: () => undefined,
    };
    mockScaredTimer = {
      isRunning: false,
    };
    mockRunningScaredTimer = {
      isRunning: true,
    };
    mockRetreatingTimer = {
      isRunning: false,
    };
    mockRunningRetreatingTimer = {
      isRunning: true,
    };
    mockRetreatingTimers = [
      mockRetreatingTimer,
      mockRetreatingTimer,
      mockRetreatingTimer,
      mockRetreatingTimer,
    ];
    mockRunningRetreatingTimers = [
      mockRunningRetreatingTimer,
      mockRunningRetreatingTimer,
      mockRunningRetreatingTimer,
      mockRunningRetreatingTimer,
    ];
    jest.spyOn(mockSiren, "playing");
    jest.spyOn(mockPlayingSiren, "playing");
    jest.spyOn(mockScared, "playing");
    jest.spyOn(mockPlayingScared, "playing");
    jest.spyOn(mockRetreating, "playing");
    jest.spyOn(mockPlayingRetreating, "playing");
    jest.spyOn(mockAudioPlayer, "playGhostSiren");
    jest.spyOn(mockAudioPlayer, "playGhostScared");
    jest.spyOn(mockAudioPlayer, "playGhostRetreating");
  });

  it("calls playGhostRetreating on the audioPlayer if the retreating audio is not playing and any of the retreating timers are running", () => {
    playGhostAudio(
      mockAudioPlayer,
      mockRunningScaredTimer,
      mockRunningRetreatingTimers
    );
    expect(mockRetreating.playing).toHaveBeenCalledTimes(1);
    expect(mockAudioPlayer.playGhostRetreating).toHaveBeenCalledTimes(1);
  });

  it("leaves the retreating audio playing if any of the retreating timers are running", () => {
    mockAudioPlayer.ghostRetreating = mockPlayingRetreating;
    playGhostAudio(
      mockAudioPlayer,
      mockRunningScaredTimer,
      mockRunningRetreatingTimers
    );
    expect(mockPlayingRetreating.playing).toHaveBeenCalledTimes(1);
    expect(mockAudioPlayer.playGhostSiren).toHaveBeenCalledTimes(0);
    expect(mockAudioPlayer.playGhostScared).toHaveBeenCalledTimes(0);
    expect(mockAudioPlayer.playGhostRetreating).toHaveBeenCalledTimes(0);
  });

  it("calls playGhostScared on the audioPlayer if the scared audio is not playing and the scared timer is running", () => {
    playGhostAudio(
      mockAudioPlayer,
      mockRunningScaredTimer,
      mockRetreatingTimers
    );
    expect(mockScared.playing).toHaveBeenCalledTimes(1);
    expect(mockAudioPlayer.playGhostScared).toHaveBeenCalledTimes(1);
  });

  it("leaves the scared audio playing if the scared timer is running", () => {
    mockAudioPlayer.ghostScared = mockPlayingScared;
    playGhostAudio(
      mockAudioPlayer,
      mockRunningScaredTimer,
      mockRetreatingTimers
    );
    expect(mockPlayingScared.playing).toHaveBeenCalledTimes(1);
    expect(mockAudioPlayer.playGhostSiren).toHaveBeenCalledTimes(0);
    expect(mockAudioPlayer.playGhostScared).toHaveBeenCalledTimes(0);
    expect(mockAudioPlayer.playGhostRetreating).toHaveBeenCalledTimes(0);
  });

  it("calls playGhostSiren on the audioPlayer if the siren audio is not playing and the scared timer is not running", () => {
    playGhostAudio(mockAudioPlayer, mockScaredTimer, mockRetreatingTimers);
    expect(mockSiren.playing).toHaveBeenCalledTimes(1);
    expect(mockAudioPlayer.playGhostSiren).toHaveBeenCalledTimes(1);
  });

  it("leaves the siren audio playing if the scared timer is not running", () => {
    mockAudioPlayer.ghostSiren = mockPlayingSiren;
    playGhostAudio(mockAudioPlayer, mockScaredTimer, mockRetreatingTimers);
    expect(mockPlayingSiren.playing).toHaveBeenCalledTimes(1);
    expect(mockAudioPlayer.playGhostSiren).toHaveBeenCalledTimes(0);
    expect(mockAudioPlayer.playGhostScared).toHaveBeenCalledTimes(0);
    expect(mockAudioPlayer.playGhostRetreating).toHaveBeenCalledTimes(0);
  });
});
