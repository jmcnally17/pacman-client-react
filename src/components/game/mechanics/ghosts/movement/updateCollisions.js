import hitBoundaryConditional from "../../boundaries/hitBoundaryConditional";

export default function updateCollisions(
  boundaries,
  collisions,
  ghost,
  callback = hitBoundaryConditional
) {
  boundaries.forEach((boundary) => {
    if (
      !collisions.includes("down") &&
      callback(ghost, boundary, {
        velocity: {
          x: 0,
          y: ghost.speed,
        },
      })
    ) {
      collisions.push("down");
    } else if (
      !collisions.includes("right") &&
      callback(ghost, boundary, {
        velocity: {
          x: ghost.speed,
          y: 0,
        },
      })
    ) {
      collisions.push("right");
    } else if (
      !collisions.includes("left") &&
      callback(ghost, boundary, {
        velocity: {
          x: -ghost.speed,
          y: 0,
        },
      })
    ) {
      collisions.push("left");
    } else if (
      !collisions.includes("up") &&
      callback(ghost, boundary, {
        velocity: {
          x: 0,
          y: -ghost.speed,
        },
      })
    ) {
      collisions.push("up");
    }
  });
  if (collisions.length > ghost.prevCollisions.length) {
    ghost.prevCollisions = collisions;
  }
}
