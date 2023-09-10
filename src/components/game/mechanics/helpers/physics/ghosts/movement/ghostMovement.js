export default class GhostMovement {
  static adjustPosition(
    ghost,
    shiftBeforeRetreating = GhostMovement.shiftBeforeRetreating,
    shiftRegular = GhostMovement.shiftRegular
  ) {
    if (ghost.isRetreating) shiftBeforeRetreating(ghost);
    else shiftRegular(ghost);
  }

  static shiftBeforeRetreating(
    ghost,
    shiftLeft = GhostMovement.shiftLeft,
    shiftRight = GhostMovement.shiftRight,
    shiftUp = GhostMovement.shiftUp,
    shiftDown = GhostMovement.shiftDown
  ) {
    if (ghost.velocity.x > 0) {
      shiftLeft(ghost);
    } else if (ghost.velocity.x < 0) {
      shiftRight(ghost);
    }
    if (ghost.velocity.y > 0) {
      shiftUp(ghost);
    } else if (ghost.velocity.y < 0) {
      shiftDown(ghost);
    }
  }

  static shiftRegular(ghost) {
    if (ghost.position.x % 4 !== 0) ghost.position.x += 2;
    if (ghost.position.y % 4 !== 0) ghost.position.y += 2;
  }

  static shiftLeft(ghost) {
    if (ghost.position.x % 8 === 2) ghost.position.x -= 2;
    else if (ghost.position.x % 8 === 4) ghost.position.x -= 4;
    else if (ghost.position.x % 8 === 6) ghost.position.x -= 6;
  }

  static shiftRight(ghost) {
    if (ghost.position.x % 8 === 2) ghost.position.x += 6;
    else if (ghost.position.x % 8 === 4) ghost.position.x += 4;
    else if (ghost.position.x % 8 === 6) ghost.position.x += 2;
  }

  static shiftUp(ghost) {
    if (ghost.position.y % 8 === 2) ghost.position.y -= 2;
    else if (ghost.position.y % 8 === 4) ghost.position.y -= 4;
    else if (ghost.position.y % 8 === 6) ghost.position.y -= 6;
  }

  static shiftDown(ghost) {
    if (ghost.position.y % 8 === 2) ghost.position.y += 6;
    else if (ghost.position.y % 8 === 4) ghost.position.y += 4;
    else if (ghost.position.y % 8 === 6) ghost.position.y += 2;
  }

  static chaseAndScatter(
    ghost,
    assets,
    collisions,
    variables,
    calculateDistance = GhostMovement.calculateDistance,
    pickDirection = GhostMovement.pickDirection
  ) {
    if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
    else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
    else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");
    else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");

    const pathways = [];
    ghost.prevCollisions.forEach((collision) => {
      if (!collisions.includes(collision)) {
        pathways.push({
          direction: collision,
        });
      }
    });
    calculateDistance(assets, ghost, pathways, variables);
    pickDirection(pathways, ghost);
  }

  static calculateDistance(
    assets,
    ghost,
    pathways,
    variables,
    addCoordinates = GhostMovement.addCoordinates,
    chase = GhostMovement.chase,
    scatter = GhostMovement.scatter,
    calculateHypotenuse = GhostMovement.calculateHypotenuse
  ) {
    pathways.forEach((pathway) => {
      addCoordinates(pathway, ghost, variables);
      let displacementFromAim;
      if (ghost.isChasing) {
        displacementFromAim = chase(ghost, pathway, assets, variables);
      } else if (!ghost.isChasing) {
        displacementFromAim = scatter(ghost, pathway);
      }
      calculateHypotenuse(displacementFromAim, pathway);
    });
  }

  static addCoordinates(pathway, ghost, variables) {
    if (pathway.direction === "up") {
      pathway.position = {
        x: ghost.position.x,
        y: ghost.position.y - variables.tileLength / 8,
      };
    } else if (pathway.direction === "left") {
      pathway.position = {
        x: ghost.position.x - variables.tileLength / 8,
        y: ghost.position.y,
      };
    } else if (pathway.direction === "right") {
      pathway.position = {
        x: ghost.position.x + variables.tileLength / 8,
        y: ghost.position.y,
      };
    } else if (pathway.direction === "down") {
      pathway.position = {
        x: ghost.position.x,
        y: ghost.position.y + variables.tileLength / 8,
      };
    }
  }

  static chase(
    ghost,
    pathway,
    assets,
    variables,
    isOrangeFarFromPacman = GhostMovement.isOrangeFarFromPacman,
    findRedOrangeAimPath = GhostMovement.findRedOrangeAimPath,
    findPinkAimPath = GhostMovement.findPinkAimPath,
    findCyanAimPath = GhostMovement.findCyanAimPath,
    findOrangeScatterPath = GhostMovement.findOrangeScatterPath
  ) {
    if (
      ghost.colour === "red" ||
      (ghost.colour === "orange" &&
        isOrangeFarFromPacman(ghost, assets.characters.pacman, variables))
    )
      return findRedOrangeAimPath(assets.characters.pacman, pathway);
    else if (ghost.colour === "pink")
      return findPinkAimPath(
        assets.characters.pacman,
        pathway,
        variables
      );
    else if (ghost.colour === "cyan")
      return findCyanAimPath(assets, variables, pathway);
    else if (ghost.colour === "orange") return findOrangeScatterPath(pathway);
  }

  static isOrangeFarFromPacman(orangeGhost, pacman, variables) {
    const x = pacman.position.x - orangeGhost.position.x;
    const y = pacman.position.y - orangeGhost.position.y;
    const distance = Math.hypot(x, y);
    if (distance > variables.tileLength * 8) return true;
    return false;
  }

  static findRedOrangeAimPath(pacman, pathway) {
    return {
      x: pacman.position.x - pathway.position.x,
      y: pacman.position.y - pathway.position.y,
    };
  }

  static findPinkAimPath(pacman, pathway, variables) {
    let x = pacman.position.x - pathway.position.x;
    let y = pacman.position.y - pathway.position.y;
    if (pacman.rotation === 0) x += variables.tileLength * 4;
    else if (pacman.rotation === Math.PI / 2) y += variables.tileLength * 4;
    else if (pacman.rotation === Math.PI) x -= variables.tileLength * 4;
    else if (pacman.rotation === (Math.PI * 3) / 2)
      y -= variables.tileLength * 4;
    return {
      x: x,
      y: y,
    };
  }

  static findCyanAimPath(assets, variables, pathway) {
    const pacman = assets.characters.pacman;
    const redGhost = assets.characters.ghosts.red;
    let x = pacman.position.x * 2 - redGhost.position.x;
    let y = pacman.position.y * 2 - redGhost.position.y;
    if (pacman.rotation === 0) x += variables.tileLength * 2;
    else if (pacman.rotation === Math.PI / 2) y += variables.tileLength * 2;
    else if (pacman.rotation === Math.PI) x -= variables.tileLength * 2;
    else if (pacman.rotation === (Math.PI * 3) / 2)
      y -= variables.tileLength * 2;
    return {
      x: x - pathway.position.x,
      y: y - pathway.position.y,
    };
  }

  static scatter(
    ghost,
    pathway,
    findRedScatterPath = GhostMovement.findRedScatterPath,
    findPinkScatterPath = GhostMovement.findPinkScatterPath,
    findCyanScatterPath = GhostMovement.findCyanScatterPath,
    findOrangeScatterPath = GhostMovement.findOrangeScatterPath
  ) {
    if (ghost.colour === "red") return findRedScatterPath(pathway);
    else if (ghost.colour === "pink") return findPinkScatterPath(pathway);
    else if (ghost.colour === "cyan") return findCyanScatterPath(pathway);
    else if (ghost.colour === "orange") return findOrangeScatterPath(pathway);
  }

  static findRedScatterPath(pathway) {
    return {
      x: 896 - pathway.position.x,
      y: -pathway.position.y,
    };
  }

  static findPinkScatterPath(pathway) {
    return {
      x: -pathway.position.x,
      y: -pathway.position.y,
    };
  }

  static findCyanScatterPath(pathway) {
    return {
      x: 896 - pathway.position.x,
      y: 992 - pathway.position.y,
    };
  }

  static findOrangeScatterPath(pathway) {
    return {
      x: -pathway.position.x,
      y: 992 - pathway.position.y,
    };
  }

  static calculateHypotenuse(vector, pathway) {
    pathway.distance = Math.hypot(vector.x, vector.y);
  }

  static pickDirection(pathways, ghost) {
    let shortest;
    for (let i = 0; i < pathways.length; i++) {
      if (shortest === undefined || pathways[i].distance < shortest.distance)
        shortest = pathways[i];
    }
    if (shortest.direction === "up") {
      ghost.velocity.x = 0;
      ghost.velocity.y = -ghost.speed;
    } else if (shortest.direction === "left") {
      ghost.velocity.x = -ghost.speed;
      ghost.velocity.y = 0;
    } else if (shortest.direction === "right") {
      ghost.velocity.x = ghost.speed;
      ghost.velocity.y = 0;
    } else if (shortest.direction === "down") {
      ghost.velocity.x = 0;
      ghost.velocity.y = ghost.speed;
    }
  }

  static emptyPrevCollisions(ghost) {
    ghost.prevCollisions = [];
  }

  static moveRandomly(
    ghost,
    collisions,
    pickRandomDirection = GhostMovement.pickRandomDirection
  ) {
    if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
    else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
    else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");
    else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");

    const pathways = ghost.prevCollisions.filter((collision) => {
      return !collisions.includes(collision);
    });
    pickRandomDirection(ghost, pathways);
  }

  static pickRandomDirection(ghost, pathways) {
    const direction = pathways[Math.floor(Math.random() * pathways.length)];
    if (direction === "up") {
      ghost.velocity.x = 0;
      ghost.velocity.y = -ghost.speed;
    } else if (direction === "down") {
      ghost.velocity.x = 0;
      ghost.velocity.y = ghost.speed;
    } else if (direction === "right") {
      ghost.velocity.x = ghost.speed;
      ghost.velocity.y = 0;
    } else if (direction === "left") {
      ghost.velocity.x = -ghost.speed;
      ghost.velocity.y = 0;
    }
  }
}
