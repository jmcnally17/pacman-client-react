export default function displayLevel(ctx, variables) {
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(`Level ${variables.level}`, 300, 15);
}
