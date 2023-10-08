import Pellet from "./pellet";

describe("Pellet", () => {
  let pellet;
  let eatenPellet;

  beforeEach(() => {
    pellet = new Pellet(
      {
        position: {
          x: 50,
          y: 100,
        },
      },
      20
    );
    eatenPellet = new Pellet(
      {
        position: {
          x: 50,
          y: 100,
        },
      },
      20
    );
    eatenPellet.changeEatenState();
  });

  describe("upon instantiation", () => {
    it("has a number of instance variables", () => {
      expect(pellet.position).toEqual({
        x: 50,
        y: 100,
      });
      expect(pellet.radius).toBe(2);
      expect(pellet.hasBeenEaten).toBeFalsy();
    });
  });

  describe("changeEatenState", () => {
    it("can change the pellet to being eaten", () => {
      pellet.changeEatenState();
      expect(pellet.hasBeenEaten).toBeTruthy();
    });

    it("can change the pellet to uneaten", () => {
      eatenPellet.changeEatenState();
      expect(eatenPellet.hasBeenEaten).toBeFalsy();
    });
  });

  describe("draw", () => {
    it("calls the necessary functions on ctx to draw the pellet", () => {
      const mockCtx = {
        beginPath: () => undefined,
        arc: () => undefined,
        fillStyle: "",
        fill: () => undefined,
        closePath: () => undefined,
      };
      jest.spyOn(mockCtx, "beginPath");
      jest.spyOn(mockCtx, "arc");
      jest.spyOn(mockCtx, "fill");
      jest.spyOn(mockCtx, "closePath");
      pellet.draw(mockCtx);
      expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
      expect(mockCtx.arc).toHaveBeenCalledTimes(1);
      expect(mockCtx.arc).toHaveBeenCalledWith(50, 100, 2, 0, Math.PI * 2);
      expect(mockCtx.fillStyle).toBe("white");
      expect(mockCtx.fill).toHaveBeenCalledTimes(1);
      expect(mockCtx.closePath).toHaveBeenCalledTimes(1);
    });
  });
});
