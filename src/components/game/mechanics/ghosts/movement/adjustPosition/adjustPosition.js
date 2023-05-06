import shiftBeforeRetreating from "./shiftBeforeRetreating";
import shiftRegular from "./shiftRegular";

export default function adjustPosition(
  ghost,
  callbackOne = shiftBeforeRetreating,
  callbackTwo = shiftRegular
) {
  if (ghost.isRetreating) callbackOne(ghost);
  else callbackTwo(ghost);
}
