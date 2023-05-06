import loadTint from "../../../../eventListeners/loadTint";
import displayPleaseWaitText from "./displayPleaseWaitText";

export default function displayPleaseWait(
  ctx,
  callbackOne = loadTint,
  callbackTwo = displayPleaseWaitText
) {
  callbackOne(ctx);
  callbackTwo(ctx);
}
