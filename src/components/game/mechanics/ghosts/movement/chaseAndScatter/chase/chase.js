import isOrangeFarFromPacman from "../isOrangeFarFromPacman";
import findOrangeScatterPath from "../scatter/findOrangeScatterPath";
import findCyanAimPath from "./findCyanAimPath";
import findPinkAimPath from "./findPinkAimPath";
import findRedOrangeAimPath from "./findRedOrangeAimPath";

export default function chase(
  ghost,
  pathway,
  pacman,
  variables,
  redGhost,
  callbackOne = isOrangeFarFromPacman,
  callbackTwo = findRedOrangeAimPath,
  callbackThree = findPinkAimPath,
  callbackFour = findCyanAimPath,
  callbackFive = findOrangeScatterPath
) {
  if (
    ghost.colour === "red" ||
    (ghost.colour === "orange" && callbackOne(ghost, pacman, variables))
  )
    return callbackTwo(pacman, pathway);
  else if (ghost.colour === "pink")
    return callbackThree(pacman, pathway, variables);
  else if (ghost.colour === "cyan")
    return callbackFour(pacman, variables, redGhost, pathway);
  else if (ghost.colour === "orange") return callbackFive(pathway);
}
