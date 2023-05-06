import ScaredTimer from "../../models/scaredTimer";

export default function makeScaredTimer(ghosts) {
  return new ScaredTimer(ghosts);
}
