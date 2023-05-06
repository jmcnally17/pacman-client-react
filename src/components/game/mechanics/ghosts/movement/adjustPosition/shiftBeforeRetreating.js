import shiftDown from "./shiftDown";
import shiftLeft from "./shiftLeft";
import shiftRight from "./shiftRight";
import shiftUp from "./shiftUp";

export default function shiftBeforeRetreating(
  ghost,
  callbackOne = shiftLeft,
  callbackTwo = shiftRight,
  callbackThree = shiftUp,
  callbackFour = shiftDown
) {
  if (ghost.velocity.x > 0) {
    callbackOne(ghost);
  } else if (ghost.velocity.x < 0) {
    callbackTwo(ghost);
  }
  if (ghost.velocity.y > 0) {
    callbackThree(ghost);
  } else if (ghost.velocity.y < 0) {
    callbackFour(ghost);
  }
}
