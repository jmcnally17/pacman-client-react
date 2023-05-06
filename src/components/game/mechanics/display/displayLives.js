import drawPacmanIcon from "./drawPacmanIcon";

export default function displayLives(ctx, pacman, callback = drawPacmanIcon) {
  if (pacman.lives >= 1)
    callback(ctx, {
      x: 580,
      y: 15,
    });
  if (pacman.lives >= 2)
    callback(ctx, {
      x: 540,
      y: 15,
    });
}
