import PacMan from "./pacman";

describe("PacMan", () => {
  let pacman;
  let mockCtx;
  let mockMunchOne;
  let mockMunchTwo;

  beforeEach(() => {
    mockMunchOne = {
      src: "./audio/munch_one.wav",
      volume: 0.1,
      play: () => undefined,
    };
    mockMunchTwo = {
      src: "./audio/munch_two.wav",
      volume: 0.1,
      play: () => undefined,
    };
    pacman = new PacMan(
      {
        position: {
          x: 290,
          y: 470,
        },
        velocity: {
          x: 7.5,
          y: 2.5,
        },
      },
      20,
      mockMunchOne,
      mockMunchTwo
    );
    mockCtx = {
      save: () => undefined,
      translate: () => undefined,
      rotate: () => undefined,
      beginPath: () => undefined,
      arc: () => undefined,
      lineTo: () => undefined,
      fillStyle: "",
      fill: () => undefined,
      closePath: () => undefined,
      restore: () => undefined,
    };
    jest.spyOn(mockMunchTwo, "play");
    jest.spyOn(mockMunchOne, "play");
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(pacman.originalPosition).toEqual({
        x: 290,
        y: 470,
      });
      expect(pacman.position).toEqual({
        x: 290,
        y: 470,
      });
      expect(pacman.originalVelocity).toEqual({
        x: 7.5,
        y: 2.5,
      });
      expect(pacman.velocity).toEqual({
        x: 7.5,
        y: 2.5,
      });
      expect(pacman.tileLength).toBe(20);
      expect(pacman.radius).toBe(7.5);
      expect(pacman.speed).toBe(2.5);
      expect(pacman.radians).toBe(Math.PI / 4);
      expect(pacman.openRate).toBe(Math.PI / 36);
      expect(pacman.shrinkRate).toBe(Math.PI / 220);
      expect(pacman.rotation).toBe(0);
      expect(pacman.lives).toBe(2);
      expect(pacman.isEating).toBeFalsy();
      expect(pacman.isShrinking).toBeFalsy();
      expect(pacman.isLevellingUp).toBeFalsy();
      expect(pacman.munchOne).toBe(mockMunchOne);
      expect(pacman.munchTwo).toBe(mockMunchTwo);
      expect(pacman.munchOne.src).toBe("./audio/munch_one.wav");
      expect(pacman.munchTwo.src).toBe("./audio/munch_two.wav");
      expect(pacman.munchOne.volume).toBe(0.1);
      expect(pacman.munchTwo.volume).toBe(0.1);
    });
  });

  describe("draw", () => {
    it("calls the necessary functions on ctx to draw Pac-Man", () => {
      jest.spyOn(mockCtx, "save");
      jest.spyOn(mockCtx, "translate");
      jest.spyOn(mockCtx, "rotate");
      jest.spyOn(mockCtx, "beginPath");
      jest.spyOn(mockCtx, "arc");
      jest.spyOn(mockCtx, "lineTo");
      jest.spyOn(mockCtx, "fill");
      jest.spyOn(mockCtx, "closePath");
      jest.spyOn(mockCtx, "restore");
      pacman.draw(mockCtx);
      expect(mockCtx.save).toHaveBeenCalledTimes(1);
      expect(mockCtx.translate).toHaveBeenCalledTimes(2);
      expect(mockCtx.translate).toHaveBeenNthCalledWith(1, 290, 470);
      expect(mockCtx.translate).toHaveBeenNthCalledWith(2, -290, -470);
      expect(mockCtx.rotate).toHaveBeenCalledTimes(1);
      expect(mockCtx.rotate).toHaveBeenCalledWith(0);
      expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
      expect(mockCtx.arc).toHaveBeenCalledTimes(1);
      expect(mockCtx.arc).toHaveBeenCalledWith(
        290,
        470,
        15,
        Math.PI / 4,
        (7 * Math.PI) / 4
      );
      expect(mockCtx.lineTo).toHaveBeenCalledTimes(1);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(285, 470);
      expect(mockCtx.fillStyle).toBe("yellow");
      expect(mockCtx.fill).toHaveBeenCalledTimes(1);
      expect(mockCtx.closePath).toHaveBeenCalledTimes(1);
      expect(mockCtx.restore).toHaveBeenCalledTimes(1);
    });
  });

  describe("update", () => {
    it("calls the necessary functions and updates Pac-Man's position", () => {
      jest.spyOn(pacman, "checkRotation");
      jest.spyOn(pacman, "draw");
      pacman.update(mockCtx);
      expect(pacman.checkRotation).toHaveBeenCalledTimes(1);
      expect(pacman.draw).toHaveBeenCalledTimes(1);
      expect(pacman.draw).toHaveBeenCalledWith(mockCtx);
      expect(pacman.position).toEqual({
        x: 297.5,
        y: 472.5,
      });
    });

    it("calls chomp if Pac-Man is moving", () => {
      jest.spyOn(pacman, "chomp");
      pacman.update(mockCtx);
      expect(pacman.chomp).toHaveBeenCalledTimes(1);
    });

    it("sets the radians back to PI / 4 if Pac-Man is not moving", () => {
      pacman.velocity = {
        x: 0,
        y: 0,
      };
      pacman.radians = 0;
      pacman.update(mockCtx);
      expect(pacman.radians).toBe(Math.PI / 4);
    });
  });

  describe("chomp", () => {
    it("adds the openRate to the radians", () => {
      pacman.chomp();
      expect(pacman.radians).toBe((10 * Math.PI) / 36);
    });

    it("multiplies the openRate by -1 when the radians becomes greater than PI / 4", () => {
      pacman.radians = Math.PI / 2;
      expect(pacman.openRate).toBe(Math.PI / 36);
      pacman.chomp();
      expect(pacman.openRate).toBe(-Math.PI / 36);
    });

    it("multiplies the openRate by -1 when the radians becomes smaller than PI / 36", () => {
      pacman.radians = 0;
      pacman.openRate = -Math.PI / 36;
      pacman.chomp();
      expect(pacman.openRate).toBe(Math.PI / 36);
    });

    it("plays munchTwo when the radians is greater than PI / 4, the openRate is positive and isEating is true", () => {
      pacman.radians = Math.PI / 2;
      pacman.isEating = true;
      pacman.chomp();
      expect(mockMunchTwo.play).toHaveBeenCalledTimes(1);
    });

    it("plays munchOne when the radians becomes smaller than PI / 36, the openRate is negative and isEating is true", () => {
      pacman.radians = 0;
      pacman.openRate *= -1;
      pacman.isEating = true;
      pacman.chomp();
      expect(mockMunchOne.play).toHaveBeenCalledTimes(1);
    });

    it("does not play munchTwo when isEating is false", () => {
      pacman.radians = Math.PI / 2;
      pacman.chomp();
      expect(mockMunchTwo.play).toHaveBeenCalledTimes(0);
    });

    it("does not play munchOne when isEating is false", () => {
      pacman.radians = 0;
      pacman.openRate *= -1;
      pacman.chomp();
      expect(mockMunchOne.play).toHaveBeenCalledTimes(0);
    });
  });

  describe("checkRotation", () => {
    it("sets Pac-Man's rotation to 0 when moving to the right", () => {
      pacman.rotation = Math.PI;
      pacman.velocity = {
        x: 5,
        y: 0,
      };
      pacman.checkRotation();
      expect(pacman.rotation).toBe(0);
    });

    it("sets Pac-Man's rotation to PI when moving to the left", () => {
      pacman.velocity = {
        x: -5,
        y: 0,
      };
      pacman.checkRotation();
      expect(pacman.rotation).toBe(Math.PI);
    });

    it("sets Pac-Man's rotation to PI / 2 when moving downwards", () => {
      pacman.velocity = {
        x: 0,
        y: 5,
      };
      pacman.checkRotation();
      expect(pacman.rotation).toBe(Math.PI / 2);
    });

    it("sets Pac-Man's rotation to 3 * PI / 2 when moving upwards", () => {
      pacman.velocity = {
        x: 0,
        y: -5,
      };
      pacman.checkRotation();
      expect(pacman.rotation).toBe((3 * Math.PI) / 2);
    });
  });

  describe("shrink", () => {
    it("calls draw and increases the radians by the shrinkRate", () => {
      jest.spyOn(pacman, "draw");
      pacman.shrink(mockCtx);
      expect(pacman.draw).toHaveBeenCalledTimes(1);
      expect(pacman.draw).toHaveBeenCalledWith(mockCtx);
      expect(pacman.radians).toBe(Math.PI / 4 + Math.PI / 220);
    });
  });

  describe("reset", () => {
    it("puts Pac-Man back into original position, velocity, rotation, radians and openRate", () => {
      pacman.position.x += 20;
      pacman.position.y += 20;
      pacman.velocity.x += 5;
      pacman.velocity.y += 10;
      pacman.radians = Math.PI / 18;
      pacman.openRate = -Math.PI / 36;
      pacman.rotation += Math.PI;
      pacman.reset();
      expect(pacman.position).toEqual({
        x: 290,
        y: 470,
      });
      expect(pacman.velocity).toEqual({
        x: 7.5,
        y: 2.5,
      });
      expect(pacman.radians).toBe(Math.PI / 4);
      expect(pacman.openRate).toBe(Math.PI / 36);
      expect(pacman.rotation).toBe(0);
    });
  });
});
