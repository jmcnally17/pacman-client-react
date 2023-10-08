import Ghost from "./ghost";

describe("Ghost", () => {
  const tileLength = 32;
  let ghost;
  let scaredChasingRetreatingGhost;
  let mockRetreatingTimer;
  let mockCtx;

  beforeEach(() => {
    ghost = new Ghost(
      {
        position: { x: 32, y: 32 },
        velocity: { x: 7.5, y: 2.5 },
        colour: "red",
      },
      tileLength
    );
    scaredChasingRetreatingGhost = new Ghost(
      {
        position: { x: 32, y: 32 },
        velocity: { x: 7.5, y: 2.5 },
        colour: "red",
      },
      tileLength
    );
    scaredChasingRetreatingGhost.isScared = true;
    scaredChasingRetreatingGhost.isChasing = true;
    scaredChasingRetreatingGhost.isRetreating = true;
    mockRetreatingTimer = { reset: () => undefined };
    scaredChasingRetreatingGhost.retreatingTimer = mockRetreatingTimer;
    jest.spyOn(mockRetreatingTimer, "reset");
    mockCtx = { drawImage: () => undefined };
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(ghost.originalPosition).toEqual({ x: 32, y: 32 });
      expect(ghost.position).toEqual({ x: 32, y: 32 });
      expect(ghost.originalVelocity).toEqual({ x: 7.5, y: 2.5 });
      expect(ghost.velocity).toEqual({ x: 7.5, y: 2.5 });
      expect(ghost.tileLength).toBe(tileLength);
      expect(ghost.radius).toBe((tileLength * 3) / 8);
      expect(ghost.colour).toBe("red");
      expect(ghost.prevCollisions).toEqual([]);
      expect(ghost.speed).toBe(tileLength / 8);
      expect(ghost.isScared).toBeFalsy();
      expect(ghost.isChasing).toBeFalsy();
      expect(ghost.isRetreating).toBeFalsy();
      expect(ghost.retreatingTimer).toBeNull();
      expect(ghost.image).toBeInstanceOf(Image);
      expect(ghost.up).toBeInstanceOf(Image);
      expect(ghost.up.src).toBe("http://localhost/images/red-ghost-up.png");
      expect(ghost.left).toBeInstanceOf(Image);
      expect(ghost.left.src).toBe("http://localhost/images/red-ghost-left.png");
      expect(ghost.right).toBeInstanceOf(Image);
      expect(ghost.right.src).toBe(
        "http://localhost/images/red-ghost-right.png"
      );
      expect(ghost.down).toBeInstanceOf(Image);
      expect(ghost.down.src).toBe("http://localhost/images/red-ghost-down.png");
      expect(ghost.scaredBlue).toBeInstanceOf(Image);
      expect(ghost.scaredBlue.src).toBe(
        "http://localhost/images/scared-ghost-blue.png"
      );
      expect(ghost.eyesUp).toBeInstanceOf(Image);
      expect(ghost.eyesUp.src).toBe("http://localhost/images/eyes-up.png");
      expect(ghost.eyesLeft).toBeInstanceOf(Image);
      expect(ghost.eyesLeft.src).toBe("http://localhost/images/eyes-left.png");
      expect(ghost.eyesRight).toBeInstanceOf(Image);
      expect(ghost.eyesRight.src).toBe(
        "http://localhost/images/eyes-right.png"
      );
      expect(ghost.eyesDown).toBeInstanceOf(Image);
      expect(ghost.eyesDown.src).toBe("http://localhost/images/eyes-down.png");
    });
  });

  describe("draw", () => {
    it("calls drawImage on ctx to draw the ghost", () => {
      jest.spyOn(mockCtx, "drawImage");
      ghost.draw(mockCtx);
      expect(mockCtx.drawImage).toHaveBeenCalledTimes(1);
      expect(mockCtx.drawImage).toHaveBeenCalledWith(ghost.image, 8, 8);
    });
  });

  describe("update", () => {
    it("calls draw and updates the position", () => {
      jest.spyOn(ghost, "draw");
      ghost.update(mockCtx);
      expect(ghost.draw).toHaveBeenCalledTimes(1);
      expect(ghost.draw).toHaveBeenCalledWith(mockCtx);
      expect(ghost.position).toEqual({ x: 39.5, y: 34.5 });
    });
  });

  describe("changeScaredState", () => {
    it("can change isScared to true when called", () => {
      ghost.changeScaredState();
      expect(ghost.isScared).toBeTruthy();
    });

    it("can change isScared to false when called", () => {
      scaredChasingRetreatingGhost.changeScaredState();
      expect(scaredChasingRetreatingGhost.isScared).toBeFalsy();
    });
  });

  describe("changeChasingState", () => {
    it("can change isChasing to true when called", () => {
      ghost.changeChasingState();
      expect(ghost.isChasing).toBeTruthy();
    });

    it("can change isChasing to false when called", () => {
      scaredChasingRetreatingGhost.changeChasingState();
      expect(scaredChasingRetreatingGhost.isChasing).toBeFalsy();
    });
  });

  describe("changeRetreatingState", () => {
    it("can change isRetreating to true when called", () => {
      ghost.changeRetreatingState();
      expect(ghost.isRetreating).toBeTruthy();
    });

    it("can change isRetreating to false when called", () => {
      scaredChasingRetreatingGhost.changeRetreatingState();
      expect(scaredChasingRetreatingGhost.isRetreating).toBeFalsy();
    });
  });

  describe("reset", () => {
    it("changes the ghosts parameters back to their original configuration", () => {
      scaredChasingRetreatingGhost.position.x += 20;
      scaredChasingRetreatingGhost.position.y += 20;
      scaredChasingRetreatingGhost.velocity.x += 5;
      scaredChasingRetreatingGhost.velocity.y += 10;
      scaredChasingRetreatingGhost.speed = 16;
      scaredChasingRetreatingGhost.prevCollisions.push("up");
      scaredChasingRetreatingGhost.reset();
      expect(scaredChasingRetreatingGhost.position).toEqual({ x: 32, y: 32 });
      expect(scaredChasingRetreatingGhost.velocity).toEqual({ x: 7.5, y: 2.5 });
      expect(scaredChasingRetreatingGhost.speed).toBe(4);
      expect(scaredChasingRetreatingGhost.prevCollisions).toEqual([]);
      expect(scaredChasingRetreatingGhost.isScared).toBeFalsy();
      expect(scaredChasingRetreatingGhost.isChasing).toBeFalsy();
      expect(mockRetreatingTimer.reset).toHaveBeenCalledTimes(1);
      expect(scaredChasingRetreatingGhost.isRetreating).toBeFalsy();
    });

    it("leaves isScared as false if it is already false", () => {
      ghost.retreatingTimer = mockRetreatingTimer;
      ghost.reset();
      expect(ghost.isScared).toBeFalsy();
    });

    it("leaves the chasing state as false if it is already false", () => {
      ghost.retreatingTimer = mockRetreatingTimer;
      ghost.reset();
      expect(ghost.isChasing).toBeFalsy();
    });

    it("leaves the retreating state as false if it is already false", () => {
      ghost.retreatingTimer = mockRetreatingTimer;
      ghost.reset();
      expect(ghost.isRetreating).toBeFalsy();
    });

    it("calls assignSpriteToResetTheSprite", () => {
      jest.spyOn(ghost, "assignSprite");
      ghost.retreatingTimer = mockRetreatingTimer;
      ghost.reset();
      expect(ghost.assignSprite).toHaveBeenCalledTimes(1);
    });
  });

  describe("checkSpeedMatchesState", () => {
    beforeEach(() => {
      jest.spyOn(ghost, "adjustPosition");
    });

    it("halves speed and velocity if speed is tileLength / 8 and is scared", () => {
      ghost.velocity = { x: 4, y: 0 };
      ghost.speed = 4;
      ghost.isScared = true;
      ghost.isRetreating = false;
      ghost.checkSpeedMatchesState();
      expect(ghost.velocity).toEqual({ x: 2, y: 0 });
      expect(ghost.speed).toBe(2);
      expect(ghost.adjustPosition).toHaveBeenCalledTimes(1);
    });

    it("does not change speed and velocity if speed is tileLength / 8 and is not scared", () => {
      ghost.velocity = { x: 4, y: 0 };
      ghost.speed = 4;
      ghost.isScared = false;
      ghost.isRetreating = false;
      ghost.checkSpeedMatchesState();
      expect(ghost.velocity).toEqual({ x: 4, y: 0 });
      expect(ghost.speed).toBe(4);
      expect(ghost.adjustPosition).toHaveBeenCalledTimes(0);
    });

    it("doubles speed and velocity if speed is tileLength / 16 and is not scared", () => {
      ghost.velocity = { x: 2, y: 0 };
      ghost.speed = 2;
      ghost.isScared = false;
      ghost.isRetreating = false;
      ghost.checkSpeedMatchesState();
      expect(ghost.velocity).toEqual({ x: 4, y: 0 });
      expect(ghost.speed).toBe(4);
      expect(ghost.adjustPosition).toHaveBeenCalledTimes(1);
    });

    it("does not change speed and velocity if speed is tileLength / 16 and is scared", () => {
      ghost.velocity = { x: 2, y: 0 };
      ghost.speed = 2;
      ghost.isScared = true;
      ghost.isRetreating = false;
      ghost.checkSpeedMatchesState();
      expect(ghost.velocity).toEqual({ x: 2, y: 0 });
      expect(ghost.speed).toBe(2);
    });

    it("quadruples speed and velocity if speed is tileLength / 16 and is retreating", () => {
      ghost.velocity = { x: 2, y: 0 };
      ghost.speed = 2;
      ghost.isScared = false;
      ghost.isRetreating = true;
      ghost.checkSpeedMatchesState();
      expect(ghost.velocity).toEqual({ x: 8, y: 0 });
      expect(ghost.speed).toBe(8);
      expect(ghost.adjustPosition).toHaveBeenCalledTimes(1);
    });

    it("halves speed and velocity if speed is tileLength / 4 and is not retreating or scared", () => {
      ghost.velocity = { x: 8, y: 0 };
      ghost.speed = 8;
      ghost.isScared = false;
      ghost.isRetreating = false;
      ghost.checkSpeedMatchesState();
      expect(ghost.velocity).toEqual({ x: 4, y: 0 });
      expect(ghost.speed).toBe(4);
      expect(ghost.adjustPosition).toHaveBeenCalledTimes(1);
    });

    it("does not change speed and velocity if speed is tileLength / 4 and is retreating", () => {
      ghost.velocity = { x: 8, y: 0 };
      ghost.speed = 8;
      ghost.isScared = false;
      ghost.isRetreating = true;
      ghost.checkSpeedMatchesState();
      expect(ghost.velocity).toEqual({ x: 8, y: 0 });
      expect(ghost.speed).toBe(8);
      expect(ghost.adjustPosition).toHaveBeenCalledTimes(0);
    });
  });

  describe("adjustPosition", () => {
    it("calls shiftBeforeRetreating if isRetreating is true", () => {
      jest.spyOn(ghost, "shiftBeforeRetreating");
      ghost.isRetreating = true;
      ghost.adjustPosition();
      expect(ghost.shiftBeforeRetreating).toHaveBeenCalledTimes(1);
    });

    it("calls shiftRegular if isRetreating is false", () => {
      jest.spyOn(ghost, "shiftRegular");
      ghost.isRetreating = false;
      ghost.adjustPosition(ghost);
      expect(ghost.shiftRegular).toHaveBeenCalledTimes(1);
    });
  });

  describe("shiftBeforeRetreating", () => {
    it("calls shiftLeft when the ghost is moving to the right", () => {
      jest.spyOn(ghost, "shiftLeft");
      ghost.velocity = { x: 4, y: 0 };
      ghost.shiftBeforeRetreating();
      expect(ghost.shiftLeft).toHaveBeenCalledTimes(1);
    });

    it("calls shiftRight when the ghost is moving to the left", () => {
      jest.spyOn(ghost, "shiftRight");
      ghost.velocity = { x: -4, y: 0 };
      ghost.shiftBeforeRetreating();
      expect(ghost.shiftRight).toHaveBeenCalledTimes(1);
    });

    it("calls shiftUp when the ghost is moving downwards", () => {
      jest.spyOn(ghost, "shiftUp");
      ghost.velocity = { x: 0, y: 4 };
      ghost.shiftBeforeRetreating();
      expect(ghost.shiftUp).toHaveBeenCalledTimes(1);
    });

    it("calls shiftDown when the ghost is moving upwards", () => {
      jest.spyOn(ghost, "shiftDown");
      ghost.velocity = { x: 0, y: -4 };
      ghost.shiftBeforeRetreating();
      expect(ghost.shiftDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("shiftRegular", () => {
    it("adds 2 to both position.x and position.y if they are not divisible by 4", () => {
      ghost.position = { x: 82, y: 194 };
      ghost.shiftRegular();
      expect(ghost.position).toEqual({
        x: 84,
        y: 196,
      });
    });
  });

  describe("shiftLeft", () => {
    it("takes 2 away from position.x when position.x % 8 equals 2", () => {
      ghost.position = { x: 82, y: 0 };
      ghost.shiftLeft();
      expect(ghost.position.x).toBe(80);
    });

    it("takes 4 away from position.x when position.x % 8 equals 4", () => {
      ghost.position = { x: 84, y: 0 };
      ghost.shiftLeft();
      expect(ghost.position.x).toBe(80);
    });

    it("takes 6 away from position.x when position.x % 8 equals 6", () => {
      ghost.position = { x: 86, y: 0 };
      ghost.shiftLeft();
      expect(ghost.position.x).toBe(80);
    });
  });

  describe("shiftRight", () => {
    it("adds 6 to position.x when position.x % 8 equals 2", () => {
      ghost.position = { x: 82, y: 0 };
      ghost.shiftRight();
      expect(ghost.position.x).toBe(88);
    });

    it("adds 4 to position.x when position.x % 8 equals 4", () => {
      ghost.position = { x: 84, y: 0 };
      ghost.shiftRight();
      expect(ghost.position.x).toBe(88);
    });

    it("adds 2 to position.x when position.x % 8 equals 6", () => {
      ghost.position = { x: 86, y: 0 };
      ghost.shiftRight(ghost);
      expect(ghost.position.x).toBe(88);
    });
  });

  describe("shiftUp", () => {
    it("takes 2 away from position.y when position.y % 8 equals 2", () => {
      ghost.position = { x: 0, y: 82 };
      ghost.shiftUp();
      expect(ghost.position.y).toBe(80);
    });

    it("takes 4 away from position.y when position.y % 8 equals 4", () => {
      ghost.position = { x: 0, y: 84 };
      ghost.shiftUp();
      expect(ghost.position.y).toBe(80);
    });

    it("takes 6 away from position.y when position.y % 8 equals 6", () => {
      ghost.position = { x: 0, y: 86 };
      ghost.shiftUp();
      expect(ghost.position.y).toBe(80);
    });
  });

  describe("shiftDown", () => {
    it("adds 6 to position.y when position.y % 8 equals 2", () => {
      ghost.position = { x: 0, y: 82 };
      ghost.shiftDown();
      expect(ghost.position.y).toBe(88);
    });

    it("adds 4 to position.y when position.y % 8 equals 4", () => {
      ghost.position = { x: 0, y: 84 };
      ghost.shiftDown();
      expect(ghost.position.y).toBe(88);
    });

    it("adds 2 to position.y when position.y % 8 equals 6", () => {
      ghost.position = { x: 0, y: 86 };
      ghost.shiftDown();
      expect(ghost.position.y).toBe(88);
    });
  });
});
