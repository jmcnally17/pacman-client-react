import PacmanManager from "./pacmanManager";

describe("changeDirection", () => {
  let pacman;
  let boundaries;
  let assets;
  let checkDirectionChange;

  beforeEach(() => {
    pacman = { speed: 5 };
    boundaries = "boundaries";
    assets = {
      props: { boundaries: boundaries },
      characters: { pacman: pacman },
    };
    checkDirectionChange = jest.fn();
  });

  it("calls checkDirectionChange if the last key pressed is up", () => {
    const variables = { lastKeyPressed: "up" };
    PacmanManager.changeDirection(variables, assets, checkDirectionChange);
    expect(checkDirectionChange).toHaveBeenCalledTimes(1);
    expect(checkDirectionChange).toHaveBeenCalledWith(pacman, boundaries, {
      velocity: { x: 0, y: -5 },
    });
  });

  it("calls checkDirectionChange if the last key pressed is down", () => {
    const variables = { lastKeyPressed: "down" };
    PacmanManager.changeDirection(variables, assets, checkDirectionChange);
    expect(checkDirectionChange).toHaveBeenCalledTimes(1);
    expect(checkDirectionChange).toHaveBeenCalledWith(pacman, boundaries, {
      velocity: { x: 0, y: 5 },
    });
  });

  it("calls checkDirectionChange if the last key pressed is right", () => {
    const variables = { lastKeyPressed: "right" };
    PacmanManager.changeDirection(variables, assets, checkDirectionChange);
    expect(checkDirectionChange).toHaveBeenCalledTimes(1);
    expect(checkDirectionChange).toHaveBeenCalledWith(pacman, boundaries, {
      velocity: { x: 5, y: 0 },
    });
  });

  it("calls checkDirectionChange if the last key pressed is left", () => {
    const variables = { lastKeyPressed: "left" };
    PacmanManager.changeDirection(variables, assets, checkDirectionChange);
    expect(checkDirectionChange).toHaveBeenCalledTimes(1);
    expect(checkDirectionChange).toHaveBeenCalledWith(pacman, boundaries, {
      velocity: { x: -5, y: 0 },
    });
  });

  it("does not call checkDirectionChange if the last key pressed is empty", () => {
    const variables = { lastKeyPressed: "" };
    PacmanManager.changeDirection(variables, assets, checkDirectionChange);
    expect(checkDirectionChange).toHaveBeenCalledTimes(0);
  });
});
