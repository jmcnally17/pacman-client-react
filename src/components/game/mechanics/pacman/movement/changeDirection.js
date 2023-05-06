import checkDirectionChange from "./checkDirectionChange";

export default function changeDirection(
  variables,
  pacman,
  boundaries,
  callback = checkDirectionChange
) {
  if (variables.lastKeyPressed === "up") {
    callback(pacman, boundaries, {
      velocity: {
        x: 0,
        y: -pacman.speed,
      },
    });
  } else if (variables.lastKeyPressed === "down") {
    callback(pacman, boundaries, {
      velocity: {
        x: 0,
        y: pacman.speed,
      },
    });
  } else if (variables.lastKeyPressed === "right") {
    callback(pacman, boundaries, {
      velocity: {
        x: pacman.speed,
        y: 0,
      },
    });
  } else if (variables.lastKeyPressed === "left") {
    callback(pacman, boundaries, {
      velocity: {
        x: -pacman.speed,
        y: 0,
      },
    });
  }
}
