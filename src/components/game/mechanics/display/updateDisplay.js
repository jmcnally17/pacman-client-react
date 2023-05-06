import displayScore from "./displayScore";
import displayLevel from "./displayLevel";
import displayLives from "./displayLives";

export default function updateDisplay(
  variables,
  pacman,
  callbackOne = displayScore,
  callbackTwo = displayLevel,
  callbackThree = displayLives
) {
  const info = document.querySelector("#info");
  const ctx = info.getContext("2d");
  ctx.clearRect(0, 0, info.width, info.height);
  ctx.font = "20px microN56";
  ctx.textBaseline = "middle";
  callbackOne(ctx, variables);
  callbackTwo(ctx, variables);
  callbackThree(ctx, pacman);
}
