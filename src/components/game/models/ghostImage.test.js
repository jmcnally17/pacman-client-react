import Ghost from "./ghost";

describe("Ghost", () => {
  let ghost;

  beforeEach(() => {
    ghost = new Ghost(
      {
        position: {
          x: 50,
          y: 50,
        },
        colour: "orange",
      },
      20
    );
  });

  describe("assignSprite", () => {
    it("assigns the upwards looking sprite when moving up and not scared or retreating", () => {
      ghost.velocity = {
        y: -2.5,
      };
      ghost.assignSprite();
      expect(ghost.image.src).toBe(
        "http://localhost/images/orange-ghost-up.png"
      );
    });

    it("assigns the leftwards looking sprite when moving to the left and not scared or retreating", () => {
      ghost.velocity = {
        x: -2.5,
      };
      ghost.assignSprite();
      expect(ghost.image.src).toBe(
        "http://localhost/images/orange-ghost-left.png"
      );
    });

    it("assigns the rightwards looking sprite when moving to the right and not scared or retreating", () => {
      ghost.velocity = {
        x: 2.5,
      };
      ghost.assignSprite();
      expect(ghost.image.src).toBe(
        "http://localhost/images/orange-ghost-right.png"
      );
    });

    it("assigns the downwards looking sprite when moving down and not scared or retreating", () => {
      ghost.velocity = {
        y: 2.5,
      };
      ghost.assignSprite();
      expect(ghost.image.src).toBe(
        "http://localhost/images/orange-ghost-down.png"
      );
    });

    it("assigns the scared blue sprite when the ghost is scared", () => {
      ghost.changeScaredState();
      ghost.assignSprite();
      expect(ghost.image.src).toBe(
        "http://localhost/images/scared-ghost-blue.png"
      );
    });

    it("assigns the upwards looking eyes sprite when moving up and retreating", () => {
      ghost.changeRetreatingState();
      ghost.velocity = {
        y: -2.5,
      };
      ghost.assignSprite();
      expect(ghost.image.src).toBe("http://localhost/images/eyes-up.png");
    });

    it("assigns the leftwards looking eyes sprite when moving to the left and retreating", () => {
      ghost.changeRetreatingState();
      ghost.velocity = {
        x: -2.5,
      };
      ghost.assignSprite();
      expect(ghost.image.src).toBe("http://localhost/images/eyes-left.png");
    });

    it("assigns the rightwards looking eyes sprite when moving to the right and retreating", () => {
      ghost.changeRetreatingState();
      ghost.velocity = {
        x: 2.5,
      };
      ghost.assignSprite();
      expect(ghost.image.src).toBe("http://localhost/images/eyes-right.png");
    });

    it("assigns the downwards looking eyes sprite when moving down and retreating", () => {
      ghost.changeRetreatingState();
      ghost.velocity = {
        y: 2.5,
      };
      ghost.assignSprite();
      expect(ghost.image.src).toBe("http://localhost/images/eyes-down.png");
    });
  });
});
