import stopPacmanCollision from "./stopPacmanCollision";

export default function implementBoundaries(
  boundaries,
  ctx,
  pacman,
  callback = stopPacmanCollision
) {
  boundaries.forEach((boundary) => {
    boundary.draw(ctx);
    callback(boundary, pacman);
  });
}
