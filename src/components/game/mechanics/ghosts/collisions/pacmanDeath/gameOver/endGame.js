import Leaderboard from "../../../../../../leaderboard/leaderboard";
import displayPleaseWait from "../animation/displayPleaseWait";
import resetAfterGameOver from "./resetAfterGameOver";
import saveScore from "./saveScore";

export default async function endGame(
  variables,
  pellets,
  powerUps,
  ghosts,
  pacman,
  cycleTimer,
  scaredTimer,
  ctx,
  callbackOne = displayPleaseWait,
  callbackTwo = saveScore,
  callbackThree = resetAfterGameOver
) {
  cancelAnimationFrame(variables.animationId);
  callbackOne(ctx);
  if (variables.player) await callbackTwo(variables);

  callbackThree(
    pellets,
    powerUps,
    ghosts,
    pacman,
    variables,
    cycleTimer,
    scaredTimer
  );
  variables.reactRoot.render(<Leaderboard variables={variables} />);
}
