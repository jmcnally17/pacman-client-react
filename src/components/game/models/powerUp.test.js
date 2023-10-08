import PowerUp from "./powerUp";

describe("PowerUp", () => {
  let powerUp;
  let eatenPowerUp;
  let mockCtx;

  beforeEach(() => {
    powerUp = new PowerUp(
      {
        position: {
          x: 50,
          y: 100,
        },
      },
      20
    );
    eatenPowerUp = new PowerUp(
      {
        position: {
          x: 50,
          y: 100,
        },
      },
      20
    );
    eatenPowerUp.changeEatenState();
    mockCtx = {
      beginPath: () => undefined,
      arc: () => undefined,
      fillStyle: "",
      fill: () => undefined,
      closePath: () => undefined,
    };
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(powerUp.position).toEqual({
        x: 50,
        y: 100,
      });
      expect(powerUp.radius).toBe(7);
      expect(powerUp.hasBeenEaten).toBeFalsy();
      expect(powerUp.rate).toBe(-0.4);
      expect(powerUp.tileLength).toBe(20);
    });
  });

  describe("changeEatenState", () => {
    it("can change the power up to being eaten", () => {
      powerUp.changeEatenState();
      expect(powerUp.hasBeenEaten).toBeTruthy();
    });

    it("can change the power up to uneaten", () => {
      eatenPowerUp.changeEatenState();
      expect(eatenPowerUp.hasBeenEaten).toBeFalsy();
    });
  });

  describe("update", () => {
    it("calls draw and flash", () => {
      jest.spyOn(powerUp, "draw");
      jest.spyOn(powerUp, "flash");
      powerUp.update(mockCtx);
      expect(powerUp.draw).toHaveBeenCalledTimes(1);
      expect(powerUp.draw).toHaveBeenCalledWith(mockCtx);
      expect(powerUp.flash).toHaveBeenCalledTimes(1);
    });
  });

  describe("draw", () => {
    it("calls the necessary functions on ctx to draw the power up", () => {
      jest.spyOn(mockCtx, "beginPath");
      jest.spyOn(mockCtx, "arc");
      jest.spyOn(mockCtx, "fill");
      jest.spyOn(mockCtx, "closePath");
      powerUp.draw(mockCtx);
      expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
      expect(mockCtx.arc).toHaveBeenCalledTimes(1);
      expect(mockCtx.arc).toHaveBeenCalledWith(50, 100, 7, 0, Math.PI * 2);
      expect(mockCtx.fillStyle).toBe("white");
      expect(mockCtx.fill).toHaveBeenCalledTimes(1);
      expect(mockCtx.closePath).toHaveBeenCalledTimes(1);
    });
  });

  describe("flash", () => {
    it("adds the rate to the radius", () => {
      powerUp.flash();
      expect(powerUp.radius).toBe(6.6);
    });

    it("changes the sign of the rate to positive when the radius reaches a minimum value", () => {
      powerUp.radius = 5;
      powerUp.flash();
      expect(powerUp.rate).toBe(0.4);
      expect(powerUp.radius).toBe(5.4);
    });

    it("changes the sign of the rate to negative when the radius reaches a maximum value", () => {
      powerUp.rate = 0.4;
      powerUp.radius = 9;
      powerUp.flash();
      expect(powerUp.rate).toBe(-0.4);
      expect(powerUp.radius).toBe(8.6);
    });
  });
});
