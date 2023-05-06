export default class PowerUp {
  constructor({ position }, tileLength) {
    this.position = position;
    this.radius = (tileLength * 7) / 20;
    this.hasBeenEaten = false;
    this.rate = -tileLength / 50;
    this.tileLength = tileLength;
  }

  changeEatenState() {
    this.hasBeenEaten = this.hasBeenEaten ? false : true;
  }

  update(ctx) {
    this.draw(ctx);
    this.flash();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }

  flash() {
    if (
      this.radius <= this.tileLength / 4 ||
      this.radius >= (this.tileLength * 9) / 20
    ) {
      this.rate = -this.rate;
    }
    this.radius += this.rate;
  }
}
