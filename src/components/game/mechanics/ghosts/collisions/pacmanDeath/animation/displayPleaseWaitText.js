export default function displayPleaseWaitText(ctx) {
  ctx.globalAlpha = 1;
  ctx.font = "100px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Please wait...", 448, 496);
}
