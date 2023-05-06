export default class Boundary {
  constructor({ position, regularImage, whiteImage }, tileLength) {
    this.position = position;
    this.width = tileLength;
    this.height = tileLength;
    this.regularImage = regularImage;
    this.whiteImage = whiteImage;
    this.image = regularImage;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  flash() {
    let imageSource = this.image.src;
    this.image = imageSource.includes("white")
      ? this.regularImage
      : this.whiteImage;
  }
}
