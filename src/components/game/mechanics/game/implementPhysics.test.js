import Game from "./game";
import Physics from "../helpers/physics/physics";

jest.mock("../helpers/physics/physics");

describe("implementPhysics", () => {
  let assets;
  let ctx;
  let variables;

  beforeEach(() => {
    Physics.mockClear();
    assets = "assets";
    ctx = "ctx";
    variables = "variables";
  });

  it("calls implementBoundaries", () => {
    Game.implementPhysics(assets, ctx, variables);
    expect(Physics.implementBoundaries).toHaveBeenCalledTimes(1);
    expect(Physics.implementBoundaries).toHaveBeenCalledWith(assets, ctx);
  });

  it("calls implementPellets", () => {
    Game.implementPhysics(assets, ctx, variables);
    expect(Physics.implementPellets).toHaveBeenCalledTimes(1);
    expect(Physics.implementPellets).toHaveBeenCalledWith(
      assets,
      ctx,
      variables
    );
  });

  it("calls implementPowerUps", () => {
    Game.implementPhysics(assets, ctx, variables);
    expect(Physics.implementPowerUps).toHaveBeenCalledTimes(1);
    expect(Physics.implementPowerUps).toHaveBeenCalledWith(
      assets,
      ctx,
      variables
    );
  });

  it("calls implementGhosts", () => {
    Game.implementPhysics(assets, ctx, variables);
    expect(Physics.implementGhosts).toHaveBeenCalledTimes(1);
    expect(Physics.implementGhosts).toHaveBeenCalledWith(
      assets,
      ctx,
      variables
    );
  });

  it("calls implementPacman", () => {
    Game.implementPhysics(assets, ctx, variables);
    expect(Physics.implementPacman).toHaveBeenCalledTimes(1);
    expect(Physics.implementPacman).toHaveBeenCalledWith(
      variables,
      assets,
      ctx
    );
  });
});
