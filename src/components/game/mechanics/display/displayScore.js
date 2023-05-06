export default function displayScore(ctx, variables) {
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${variables.score}`, 10, 15);
}
