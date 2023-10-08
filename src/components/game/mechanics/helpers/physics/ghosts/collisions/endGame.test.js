import GhostCollision from "./ghostCollision";
import Animator from "../../../graphics/animator/animator";
import Leaderboard from "../../../../../../leaderboard/leaderboard";

jest.mock("../../../graphics/animator/animator");
jest.mock("../../../../../../leaderboard/leaderboard");

describe("endGame", () => {
  let variables;
  let assets;
  let ctx;
  let saveScore;
  let resetAfterGameOver;

  beforeEach(() => {
    Animator.mockClear();
    Leaderboard.mockClear();
    variables = {
      player: { username: "person" },
      animationId: "animationId",
      reactRoot: { render: () => undefined },
    };
    assets = "assets";
    ctx = "ctx";
    saveScore = jest.fn();
    resetAfterGameOver = jest.fn();
    jest.spyOn(variables.reactRoot, "render");
  });

  it("calls cancelAnimationFrame on the current animationId", () => {
    jest.spyOn(global, "cancelAnimationFrame");
    GhostCollision.endGame(
      variables,
      assets,
      ctx,
      saveScore,
      resetAfterGameOver
    );
    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(variables.animationId);
  });

  it("calls displayPleaseWait", () => {
    GhostCollision.endGame(
      variables,
      assets,
      ctx,
      saveScore,
      resetAfterGameOver
    );
    expect(Animator.displayPleaseWait).toHaveBeenCalledTimes(1);
    expect(Animator.displayPleaseWait).toHaveBeenCalledWith(ctx);
  });

  it("calls saveScore when the player is not undefined", () => {
    GhostCollision.endGame(
      variables,
      assets,
      ctx,
      saveScore,
      resetAfterGameOver
    );
    expect(saveScore).toHaveBeenCalledTimes(1);
    expect(saveScore).toHaveBeenCalledWith(variables);
  });

  it("does not call saveScore when the player is undefined", () => {
    variables.player = undefined;
    GhostCollision.endGame(
      variables,
      assets,
      ctx,
      saveScore,
      resetAfterGameOver
    );
    expect(saveScore).toHaveBeenCalledTimes(0);
  });

  it("calls resetAfterGameOver", async () => {
    await GhostCollision.endGame(
      variables,
      assets,
      ctx,
      saveScore,
      resetAfterGameOver
    );
    expect(resetAfterGameOver).toHaveBeenCalledTimes(1);
    expect(resetAfterGameOver).toHaveBeenCalledWith(assets, variables);
  });

  it("renders the Leaderboard component", async () => {
    await GhostCollision.endGame(
      variables,
      assets,
      ctx,
      saveScore,
      resetAfterGameOver
    );
    expect(variables.reactRoot.render).toHaveBeenCalledTimes(1);
    expect(variables.reactRoot.render).toHaveBeenCalledWith(
      <Leaderboard variables={variables} />
    );
  });
});
