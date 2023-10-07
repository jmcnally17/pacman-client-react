import Ghost from "./ghost";

let ghost;
let scaredChasingRetreatingGhost;
let mockRetreatingTimer;
let mockCtx;

describe("Ghost", () => {
  const tileLength = 20;

  beforeEach(() => {
    ghost = new Ghost(
      {
        position: { x: 20, y: 20 },
        velocity: { x: 7.5, y: 2.5 },
        colour: "red",
      },
      tileLength
    );
    scaredChasingRetreatingGhost = new Ghost(
      {
        position: { x: 20, y: 20 },
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
      expect(ghost.originalPosition).toEqual({ x: 20, y: 20 });
      expect(ghost.position).toEqual({ x: 20, y: 20 });
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
      expect(mockCtx.drawImage).toHaveBeenCalledWith(ghost.image, 5, 5);
    });
  });

  describe("update", () => {
    it("calls draw and updates the position", () => {
      jest.spyOn(ghost, "draw");
      ghost.update(mockCtx);
      expect(ghost.draw).toHaveBeenCalledTimes(1);
      expect(ghost.draw).toHaveBeenCalledWith(mockCtx);
      expect(ghost.position).toEqual({ x: 27.5, y: 22.5 });
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
      expect(scaredChasingRetreatingGhost.position).toEqual({ x: 20, y: 20 });
      expect(scaredChasingRetreatingGhost.velocity).toEqual({ x: 7.5, y: 2.5 });
      expect(scaredChasingRetreatingGhost.speed).toBe(2.5);
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

    it("resets the sprite to the upwards looking sprite", () => {
      const upGhost = new Ghost(
        {
          position: { x: 20, y: 20 },
          velocity: { x: 0, y: -5 },
          colour: "red",
        },
        tileLength
      );
      upGhost.retreatingTimer = mockRetreatingTimer;
      upGhost.velocity = { x: 7.5, y: 2.5 };
      upGhost.image = upGhost.left;
      upGhost.reset();
      expect(upGhost.image).toEqual(upGhost.up);
    });

    it("resets the sprite to the downwards looking sprite", () => {
      const downGhost = new Ghost(
        {
          position: { x: 20, y: 20 },
          velocity: { x: 0, y: 5 },
          colour: "red",
        },
        tileLength
      );
      downGhost.retreatingTimer = mockRetreatingTimer;
      downGhost.velocity = { x: 7.5, y: 2.5 };
      downGhost.image = downGhost.left;
      downGhost.reset();
      expect(downGhost.image).toEqual(downGhost.down);
    });

    it("resets the sprite to the rightwards looking sprite", () => {
      const rightGhost = new Ghost(
        {
          position: { x: 20, y: 20 },
          velocity: { x: 5, y: 0 },
          colour: "red",
        },
        tileLength
      );
      rightGhost.retreatingTimer = mockRetreatingTimer;
      rightGhost.velocity = { x: 7.5, y: 2.5 };
      rightGhost.image = rightGhost.left;
      rightGhost.reset();
      expect(rightGhost.image).toEqual(rightGhost.right);
    });

    it("resets the sprite to the leftwards looking sprite", () => {
      const leftGhost = new Ghost(
        {
          position: { x: 20, y: 20 },
          velocity: { x: -5, y: 0 },
          colour: "red",
        },
        tileLength
      );
      leftGhost.retreatingTimer = mockRetreatingTimer;
      leftGhost.velocity = { x: 7.5, y: 2.5 };
      leftGhost.image = leftGhost.right;
      leftGhost.reset();
      expect(leftGhost.image).toEqual(leftGhost.left);
    });
  });
});
