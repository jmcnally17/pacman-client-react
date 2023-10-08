import Physics from "./physics";
import PowerUpManager from "./powerUps/powerUpManager";

jest.mock("./powerUps/powerUpManager");

describe("implementPowerUps", () => {
  let powerUp;
  let assets;
  let ctx;
  let variables;

  beforeEach(() => {
    PowerUpManager.mockClear();
    powerUp = { hasBeenEaten: false, update: () => undefined };
    assets = { props: { powerUps: [powerUp, powerUp, powerUp] } };
    ctx = "ctx";
    variables = "variables";
    jest.spyOn(powerUp, "update");
  });

  it("calls update on each power up if they have not been eaten", () => {
    Physics.implementPowerUps(assets, ctx, variables);
    expect(powerUp.update).toHaveBeenCalledTimes(3);
    expect(powerUp.update).toHaveBeenNthCalledWith(1, ctx);
    expect(powerUp.update).toHaveBeenNthCalledWith(2, ctx);
    expect(powerUp.update).toHaveBeenNthCalledWith(3, ctx);
  });

  it("does not call update on each power up if they have been eaten", () => {
    powerUp.hasBeenEaten = true;
    Physics.implementPowerUps(assets, ctx, variables);
    expect(powerUp.update).toHaveBeenCalledTimes(0);
  });

  it("calls eatPowerUp on each power up if they have not been eaten", () => {
    Physics.implementPowerUps(assets, ctx, variables);
    expect(PowerUpManager.eatPowerUp).toHaveBeenCalledTimes(3);
    expect(PowerUpManager.eatPowerUp).toHaveBeenNthCalledWith(
      1,
      powerUp,
      assets,
      variables
    );
    expect(PowerUpManager.eatPowerUp).toHaveBeenNthCalledWith(
      2,
      powerUp,
      assets,
      variables
    );
    expect(PowerUpManager.eatPowerUp).toHaveBeenNthCalledWith(
      3,
      powerUp,
      assets,
      variables
    );
  });

  it("does not call eatPowerUp on each power up if they have been eaten", () => {
    powerUp.hasBeenEaten = true;
    Physics.implementPowerUps(assets, ctx, variables);
    expect(PowerUpManager.eatPowerUp).toHaveBeenCalledTimes(0);
  });
});
