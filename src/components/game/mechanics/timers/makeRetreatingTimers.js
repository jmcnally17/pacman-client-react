import RetreatingTimer from "../../models/retreatingTimer";

export default function makeRetreatingTimers(ghosts) {
  const retreatingTimers = [];
  ghosts.forEach((ghost) => {
    const retreatingTimer = new RetreatingTimer(ghost);
    ghost.retreatingTimer = retreatingTimer;
    retreatingTimers.push(retreatingTimer);
  });
  return retreatingTimers;
}
