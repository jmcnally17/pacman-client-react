export default function drawLevelUpBoard(ctx, boundaries) {
  ctx.clearRect(0, 0, 896, 992);
  boundaries.forEach((boundary) => boundary.draw(ctx));
  ctx.font = "40px Arial";
  ctx.fillStyle = "yellow";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Level Up!", 448, 560);
}
