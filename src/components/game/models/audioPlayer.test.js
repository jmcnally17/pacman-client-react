import AudioPlayer from "./audioPlayer";

describe("AudioPlayer", () => {
  let mockGhostSiren;
  let mockGhostScared;
  let mockGhostRetreating;
  let mockPacmanDeath;
  let mockLevelUp;
  let audioPlayer;

  beforeEach(() => {
    mockGhostSiren = {
      name: "siren",
      load: () => undefined,
      unload: () => undefined,
      pause: () => undefined,
      play: () => undefined,
    };
    mockGhostScared = {
      name: "scared",
      load: () => undefined,
      unload: () => undefined,
      pause: () => undefined,
      play: () => undefined,
    };
    mockGhostRetreating = {
      name: "retreating",
      load: () => undefined,
      unload: () => undefined,
      pause: () => undefined,
      play: () => undefined,
    };
    mockPacmanDeath = {
      name: "pacmanDeath",
      load: () => undefined,
      unload: () => undefined,
      pause: () => undefined,
      play: () => undefined,
      wantsToPlay: false,
      onend: () => {
        mockPacmanDeath.wantsToPlay = false;
      },
    };
    mockLevelUp = {
      name: "levelUp",
      load: () => undefined,
      unload: () => undefined,
      pause: () => undefined,
      play: () => undefined,
      wantsToPlay: false,
      onend: () => {
        mockLevelUp.wantsToPlay = false;
      },
    };
    audioPlayer = new AudioPlayer(
      mockGhostSiren,
      mockGhostScared,
      mockGhostRetreating,
      mockPacmanDeath,
      mockLevelUp
    );
    jest.spyOn(mockGhostSiren, "pause");
    jest.spyOn(mockGhostScared, "pause");
    jest.spyOn(mockGhostRetreating, "pause");
    jest.spyOn(mockPacmanDeath, "play");
    jest.spyOn(mockLevelUp, "play");
  });

  it("has each audio object as a constructor variable", () => {
    expect(audioPlayer.ghostSiren).toEqual(mockGhostSiren);
    expect(audioPlayer.ghostScared).toEqual(mockGhostScared);
    expect(audioPlayer.ghostRetreating).toEqual(mockGhostRetreating);
    expect(audioPlayer.pacmanDeath).toEqual(mockPacmanDeath);
    expect(audioPlayer.levelUp).toEqual(mockLevelUp);
  });

  it("sets ghostAudioWantsToPlay constructor variable to false", () => {
    expect(audioPlayer.ghostAudioWantsToPlay).toBe(false);
  });

  it("onend on pacmanDeath sets wantsToPlay to false", () => {
    mockPacmanDeath.wantsToPlay = true;
    audioPlayer.pacmanDeath.onend();
    expect(mockPacmanDeath.wantsToPlay).toBe(false);
  });

  it("onend on levelUp sets wantsToPlay to false", () => {
    mockLevelUp.wantsToPlay = true;
    audioPlayer.levelUp.onend();
    expect(mockLevelUp.wantsToPlay).toBe(false);
  });

  describe("playGhostSiren", () => {
    it("calls pause on the ghostScared", () => {
      audioPlayer.playGhostSiren();
      expect(mockGhostScared.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on the ghostRetreating", () => {
      audioPlayer.playGhostSiren();
      expect(mockGhostRetreating.pause).toHaveBeenCalledTimes(1);
    });

    it("calls play on the ghostSiren", () => {
      jest.spyOn(mockGhostSiren, "play");
      audioPlayer.playGhostSiren();
      expect(mockGhostSiren.play).toHaveBeenCalledTimes(1);
    });
  });

  describe("playGhostScared", () => {
    it("calls pause on the ghostSiren", () => {
      audioPlayer.playGhostScared();
      expect(mockGhostSiren.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on the ghostRetreating", () => {
      audioPlayer.playGhostScared();
      expect(mockGhostRetreating.pause).toHaveBeenCalledTimes(1);
    });

    it("calls play on the ghostScared", () => {
      jest.spyOn(mockGhostScared, "play");
      audioPlayer.playGhostScared();
      expect(mockGhostScared.play).toHaveBeenCalledTimes(1);
    });
  });

  describe("playGhostRetreating", () => {
    it("calls pause on the ghostSiren", () => {
      audioPlayer.playGhostRetreating();
      expect(mockGhostSiren.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on the ghostScared", () => {
      audioPlayer.playGhostRetreating();
      expect(mockGhostScared.pause).toHaveBeenCalledTimes(1);
    });

    it("calls play on the ghostRetreating", () => {
      jest.spyOn(mockGhostRetreating, "play");
      audioPlayer.playGhostRetreating();
      expect(mockGhostRetreating.play).toHaveBeenCalledTimes(1);
    });
  });

  describe("stopGhostAudio", () => {
    it("calls pause on ghostSiren", () => {
      audioPlayer.stopGhostAudio();
      expect(mockGhostSiren.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on ghostScared", () => {
      audioPlayer.stopGhostAudio();
      expect(mockGhostScared.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on ghostRetreating", () => {
      audioPlayer.stopGhostAudio();
      expect(mockGhostRetreating.pause).toHaveBeenCalledTimes(1);
    });

    it("sets ghostAudioWantsToPlay to false", () => {
      audioPlayer.ghostAudioWantsToPlay = true;
      audioPlayer.stopGhostAudio();
      expect(audioPlayer.ghostAudioWantsToPlay).toBe(false);
    });
  });

  describe("playPacmanDeath", () => {
    it("calls play on pacmanDeath", () => {
      audioPlayer.playPacmanDeath();
      expect(mockPacmanDeath.play).toHaveBeenCalledTimes(1);
    });

    it("sets wantsToPlay on pacmanDeath to true", () => {
      audioPlayer.playPacmanDeath();
      expect(mockPacmanDeath.wantsToPlay).toBe(true);
    });
  });

  describe("playLevelUp", () => {
    it("calls play on levelUp", () => {
      audioPlayer.playLevelUp();
      expect(mockLevelUp.play).toHaveBeenCalledTimes(1);
    });

    it("sets wantsToPlay on levelUp to true", () => {
      audioPlayer.playLevelUp();
      expect(mockLevelUp.wantsToPlay).toBe(true);
    });
  });

  describe("playPacmanDeathAndLevelUpIfWantTo", () => {
    it("calls play on pacmanDeath if wantsToPlay is true", () => {
      mockPacmanDeath.wantsToPlay = true;
      audioPlayer.playPacmanDeathAndLevelUpIfWantTo();
      expect(mockPacmanDeath.play).toHaveBeenCalledTimes(1);
    });

    it("does not call play on pacmanDeath if wantsToPlay is false", () => {
      audioPlayer.playPacmanDeathAndLevelUpIfWantTo();
      expect(mockPacmanDeath.play).toHaveBeenCalledTimes(0);
    });

    it("calls play on levelUp if wantsToPlay is true", () => {
      mockLevelUp.wantsToPlay = true;
      audioPlayer.playPacmanDeathAndLevelUpIfWantTo();
      expect(mockLevelUp.play).toHaveBeenCalledTimes(1);
    });

    it("does not call play on levelUp if wantsToPlay is false", () => {
      audioPlayer.playPacmanDeathAndLevelUpIfWantTo();
      expect(mockLevelUp.play).toHaveBeenCalledTimes(0);
    });
  });

  describe("pauseAll", () => {
    it("calls pause on ghostSiren", () => {
      audioPlayer.pauseAll();
      expect(mockGhostSiren.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on ghostScared", () => {
      audioPlayer.pauseAll();
      expect(mockGhostScared.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on ghostRetreating", () => {
      audioPlayer.pauseAll();
      expect(mockGhostRetreating.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on the pacmanDeath", () => {
      jest.spyOn(mockPacmanDeath, "pause");
      audioPlayer.pauseAll();
      expect(mockPacmanDeath.pause).toHaveBeenCalledTimes(1);
    });

    it("calls pause on the levelUp", () => {
      jest.spyOn(mockLevelUp, "pause");
      audioPlayer.pauseAll();
      expect(mockLevelUp.pause).toHaveBeenCalledTimes(1);
    });
  });
});
