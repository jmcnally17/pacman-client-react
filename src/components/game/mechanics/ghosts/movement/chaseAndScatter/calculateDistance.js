import addCoordinates from "./addCoordinates";
import calculateHypotenuse from "./calculateHypotenuse";
import chase from "./chase/chase";
import scatter from "./scatter/scatter";

export default function calculateDistance(
  pacman,
  ghost,
  pathways,
  variables,
  redGhost,
  callbackOne = addCoordinates,
  callbackTwo = chase,
  callbackThree = scatter,
  callbackFour = calculateHypotenuse
) {
  pathways.forEach((pathway) => {
    callbackOne(pathway, ghost, variables);
    let displacementFromAim;
    if (ghost.isChasing) {
      displacementFromAim = callbackTwo(
        ghost,
        pathway,
        pacman,
        variables,
        redGhost
      );
    } else if (!ghost.isChasing) {
      displacementFromAim = callbackThree(ghost, pathway);
    }
    callbackFour(displacementFromAim, pathway);
  });
}
