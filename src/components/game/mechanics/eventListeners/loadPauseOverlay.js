import loadPauseText from "./loadPauseText";
import loadTint from "./loadTint";

export default function loadPauseOverlay(
  ctx,
  pauseTextImage,
  callbackOne = loadTint,
  callbackTwo = loadPauseText
) {
  callbackOne(ctx);
  callbackTwo(ctx, pauseTextImage);
}
