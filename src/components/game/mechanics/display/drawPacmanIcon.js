export default function drawPacmanIcon(ctx, position) {
  ctx.beginPath();
  ctx.arc(position.x, position.y, 15, Math.PI / 4, (Math.PI * 7) / 4);
  ctx.lineTo(position.x - 5, position.y);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}
