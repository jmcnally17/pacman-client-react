export default class ScaredTimer {
  constructor(ghosts) {
    this.timeout = null;
    this.ghosts = ghosts;
    this.startTime = null;
    this.timeRemaining = null;
    this.isRunning = false;
    this.duration = 7000;
  }

  start(cycleTimer, dateNow = Date.now()) {
    this.startTime = dateNow;
    this.timeout = setTimeout(() => {
      this.ghosts.forEach((ghost) => {
        if (ghost.isScared) {
          ghost.changeScaredState();
          ghost.assignSprite();
          ghost.checkSpeedMatchesState();
        }
      });
      cycleTimer.resume();
      this.isRunning = false;
    }, this.duration);
    this.timeRemaining = this.duration;
    this.isRunning = true;
  }

  pause(dateNow = Date.now()) {
    clearTimeout(this.timeout);
    const timeElapsed = dateNow - this.startTime;
    this.timeRemaining = this.timeRemaining - timeElapsed;
  }

  resume(cycleTimer, dateNow = Date.now()) {
    this.startTime = dateNow;
    this.timeout = setTimeout(() => {
      this.ghosts.forEach((ghost) => {
        if (ghost.isScared) {
          ghost.changeScaredState();
          ghost.assignSprite();
          ghost.checkSpeedMatchesState();
        }
      });
      cycleTimer.resume();
      this.isRunning = false;
    }, this.timeRemaining);
  }

  reset() {
    clearTimeout(this.timeout);
    this.isRunning = false;
  }
}
