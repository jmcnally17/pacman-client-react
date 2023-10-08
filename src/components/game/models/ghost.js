export default class Ghost {
  constructor({ position, velocity, colour }, tileLength) {
    this.originalPosition = position;
    this.position = { ...this.originalPosition };
    this.originalVelocity = velocity;
    this.velocity = { ...this.originalVelocity };
    this.tileLength = tileLength;
    this.radius = (this.tileLength * 3) / 8;
    this.colour = colour;
    this.prevCollisions = [];
    this.speed = this.tileLength / 8;
    this.isScared = false;
    this.isChasing = false;
    this.isRetreating = false;
    this.retreatingTimer = null;
    this.image = new Image();
    this.up = new Image();
    this.up.src = `./images/${this.colour}-ghost-up.png`;
    this.left = new Image();
    this.left.src = `./images/${this.colour}-ghost-left.png`;
    this.right = new Image();
    this.right.src = `./images/${this.colour}-ghost-right.png`;
    this.down = new Image();
    this.down.src = `./images/${this.colour}-ghost-down.png`;
    this.scaredBlue = new Image();
    this.scaredBlue.src = `./images/scared-ghost-blue.png`;
    this.eyesUp = new Image();
    this.eyesUp.src = `./images/eyes-up.png`;
    this.eyesLeft = new Image();
    this.eyesLeft.src = `./images/eyes-left.png`;
    this.eyesRight = new Image();
    this.eyesRight.src = `./images/eyes-right.png`;
    this.eyesDown = new Image();
    this.eyesDown.src = `./images/eyes-down.png`;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x - this.radius * 2,
      this.position.y - this.radius * 2
    );
  }

  update(ctx) {
    this.draw(ctx);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  changeScaredState() {
    this.isScared = this.isScared ? false : true;
  }

  changeChasingState() {
    this.isChasing = this.isChasing ? false : true;
  }

  changeRetreatingState() {
    this.isRetreating = this.isRetreating ? false : true;
  }

  reset() {
    this.position = { ...this.originalPosition };
    this.velocity = { ...this.originalVelocity };
    this.speed = this.tileLength / 8;
    this.prevCollisions = [];
    this.#resetStates();
    this.assignSprite();
  }

  assignSprite() {
    if (this.isRetreating) this.#assignRetreatingSprite();
    else if (this.isScared) this.#assignScaredSprite();
    else this.#assignRegularSprite();
  }

  checkSpeedMatchesState() {
    if (this.isScared && this.speed === this.tileLength / 8) {
      this.adjustPosition();
      this.velocity.x /= 2;
      this.velocity.y /= 2;
      this.speed /= 2;
    } else if (this.isRetreating && this.speed === this.tileLength / 16) {
      this.adjustPosition();
      this.velocity.x *= 4;
      this.velocity.y *= 4;
      this.speed *= 4;
    } else if (!this.isScared && this.speed === this.tileLength / 16) {
      this.adjustPosition();
      this.velocity.x *= 2;
      this.velocity.y *= 2;
      this.speed *= 2;
    } else if (!this.isRetreating && this.speed === this.tileLength / 4) {
      this.adjustPosition();
      this.velocity.x /= 2;
      this.velocity.y /= 2;
      this.speed /= 2;
    }
  }

  adjustPosition() {
    if (this.isRetreating) this.shiftBeforeRetreating();
    else this.shiftRegular();
  }

  shiftBeforeRetreating() {
    if (this.velocity.x > 0) {
      this.shiftLeft();
    } else if (this.velocity.x < 0) {
      this.shiftRight();
    }
    if (this.velocity.y > 0) {
      this.shiftUp();
    } else if (this.velocity.y < 0) {
      this.shiftDown();
    }
  }

  shiftRegular() {
    if (this.position.x % 4 !== 0) this.position.x += 2;
    if (this.position.y % 4 !== 0) this.position.y += 2;
  }

  shiftLeft() {
    if (this.position.x % 8 === 2) this.position.x -= 2;
    else if (this.position.x % 8 === 4) this.position.x -= 4;
    else if (this.position.x % 8 === 6) this.position.x -= 6;
  }

  shiftRight() {
    if (this.position.x % 8 === 2) this.position.x += 6;
    else if (this.position.x % 8 === 4) this.position.x += 4;
    else if (this.position.x % 8 === 6) this.position.x += 2;
  }

  shiftUp() {
    if (this.position.y % 8 === 2) this.position.y -= 2;
    else if (this.position.y % 8 === 4) this.position.y -= 4;
    else if (this.position.y % 8 === 6) this.position.y -= 6;
  }

  shiftDown() {
    if (this.position.y % 8 === 2) this.position.y += 6;
    else if (this.position.y % 8 === 4) this.position.y += 4;
    else if (this.position.y % 8 === 6) this.position.y += 2;
  }

  // private

  #resetStates() {
    if (this.isScared) this.changeScaredState();
    if (this.isChasing) this.changeChasingState();
    this.retreatingTimer.reset();
    if (this.isRetreating) this.changeRetreatingState();
  }

  #assignRetreatingSprite() {
    if (this.velocity.y < 0) this.image = this.eyesUp;
    else if (this.velocity.x < 0) this.image = this.eyesLeft;
    else if (this.velocity.x > 0) this.image = this.eyesRight;
    else if (this.velocity.y > 0) this.image = this.eyesDown;
  }

  #assignScaredSprite() {
    this.image = this.scaredBlue;
  }

  #assignRegularSprite() {
    if (this.velocity.y < 0) this.image = this.up;
    else if (this.velocity.x < 0) this.image = this.left;
    else if (this.velocity.x > 0) this.image = this.right;
    else if (this.velocity.y > 0) this.image = this.down;
  }
}
