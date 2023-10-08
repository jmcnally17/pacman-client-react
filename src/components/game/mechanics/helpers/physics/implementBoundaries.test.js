import Physics from "./physics";
import BoundaryManager from "./boundaries/boundaryManager";

jest.mock("./boundaries/boundaryManager");

describe("implementBoundaries", () => {
  let boundary;
  let assets;
  let ctx;

  beforeEach(() => {
    BoundaryManager.mockClear();
    boundary = { draw: () => undefined };
    assets = {
      props: { boundaries: [boundary, boundary, boundary] },
      characters: { pacman: "pacman" },
    };
    ctx = "ctx";
    jest.spyOn(boundary, "draw");
  });

  it("calls draw on each boundary", () => {
    Physics.implementBoundaries(assets, ctx);
    expect(boundary.draw).toHaveBeenCalledTimes(3);
    expect(boundary.draw).toHaveBeenNthCalledWith(1, ctx);
    expect(boundary.draw).toHaveBeenNthCalledWith(2, ctx);
    expect(boundary.draw).toHaveBeenNthCalledWith(3, ctx);
  });

  it("calls  to implement the boundary functionality", () => {
    Physics.implementBoundaries(assets, ctx);
    expect(BoundaryManager.stopPacmanCollision).toHaveBeenCalledTimes(3);
    expect(BoundaryManager.stopPacmanCollision).toHaveBeenCalledWith(
      boundary,
      assets.characters.pacman
    );
  });
});
