import findCyanScatterPath from "./findCyanScatterPath";
import findOrangeScatterPath from "./findOrangeScatterPath";
import findPinkScatterPath from "./findPinkScatterPath";
import findRedScatterPath from "./findRedScatterPath";

export default function scatter(
  ghost,
  pathway,
  callbackOne = findRedScatterPath,
  callbackTwo = findPinkScatterPath,
  callbackThree = findCyanScatterPath,
  callbackFour = findOrangeScatterPath
) {
  if (ghost.colour === "red") return callbackOne(pathway);
  else if (ghost.colour === "pink") return callbackTwo(pathway);
  else if (ghost.colour === "cyan") return callbackThree(pathway);
  else if (ghost.colour === "orange") return callbackFour(pathway);
}
