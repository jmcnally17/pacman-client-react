import Boundary from "../../models/boundary";
import Pellet from "../../models/pellet";
import PowerUp from "../../models/powerUp";
import Ghost from "../../models/ghost";
import PacMan from "../../models/pacman";
import CycleTimer from "../../models/cycleTimer";
import ScaredTimer from "../../models/scaredTimer";
import RetreatingTimer from "../../models/retreatingTimer";
import AudioPlayer from "../../models/audioPlayer";

export default class Factory {
  static PIPE_NAMES = {
    "-": "horizontal",
    "|": "vertical",
    1: "corner-one",
    2: "corner-two",
    3: "corner-three",
    4: "corner-four",
  };

  static TUNNEL_DATA = [
    { position: { x: -1, y: 13 } },
    { position: { x: -1, y: 15 } },
    { position: { x: 28, y: 13 } },
    { position: { x: 28, y: 15 } },
  ];

  static GHOST_DATA = [
    {
      colour: "red",
      position: { x: 31, y: 23 },
      velocity: { x: 0, y: -1 / 8 },
    },
    {
      colour: "pink",
      position: { x: 25, y: 23 },
      velocity: { x: 0, y: -1 / 8 },
    },
    {
      colour: "cyan",
      position: { x: 37, y: 29 },
      velocity: { x: 1 / 8, y: 0 },
    },
    {
      colour: "orange",
      position: { x: 19, y: 29 },
      velocity: { x: -1 / 8, y: 0 },
    },
  ];

  static makeAssets(
    map,
    variables,
    makeGhosts = Factory.makeGhosts,
    makePacman = Factory.makePacman,
    makeCycleTimer = Factory.makeCycleTimer,
    makeScaredTimer = Factory.makeScaredTimer,
    makeRetreatingTimers = Factory.makeRetreatingTimers,
    makeBoundaries = Factory.makeBoundaries,
    makePellets = Factory.makePellets,
    makePowerUps = Factory.makePowerUps,
    makeAudioPlayer = Factory.makeAudioPlayer,
    makePauseTextImage = Factory.makePauseTextImage
  ) {
    const ghosts = makeGhosts(variables);
    return {
      props: {
        boundaries: makeBoundaries(map, variables),
        pellets: makePellets(map, variables),
        powerUps: makePowerUps(map, variables),
      },
      characters: {
        ghosts: ghosts,
        pacman: makePacman(variables),
      },
      timers: {
        cycleTimer: makeCycleTimer(ghosts),
        scaredTimer: makeScaredTimer(ghosts),
        retreatingTimers: makeRetreatingTimers(ghosts),
      },
      audioPlayer: makeAudioPlayer(),
      pauseTextImage: makePauseTextImage(),
    };
  }

  static makeBoundaries(
    map,
    variables,
    makeTunnelBoundaries = Factory.makeTunnelBoundaries
  ) {
    const boundaries = [];
    map.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element !== " " && element !== "." && element !== "o") {
          const regularImage = new Image();
          regularImage.src = `./images/pipe-${Factory.PIPE_NAMES[element]}.png`;
          const whiteImage = new Image();
          whiteImage.src = `./images/pipe-${Factory.PIPE_NAMES[element]}-white.png`;
          const boundary = new Boundary(
            {
              position: {
                x: variables.tileLength * j,
                y: variables.tileLength * i,
              },
              regularImage: regularImage,
              whiteImage: whiteImage,
            },
            variables.tileLength
          );
          boundaries.push(boundary);
        }
      });
    });
    makeTunnelBoundaries(boundaries, variables);
    return boundaries;
  }

  static makeTunnelBoundaries(boundaries, variables) {
    const regularImage = new Image();
    regularImage.src = "./images/pipe-horizontal.png";
    const whiteImage = new Image();
    whiteImage.src = "./images/pipe-horizontal-white.png";
    Factory.TUNNEL_DATA.forEach((data) => {
      const tunnelBoundary = new Boundary(
        {
          position: {
            x: variables.tileLength * data.position.x,
            y: variables.tileLength * data.position.y,
          },
          regularImage: regularImage,
          whiteImage: whiteImage,
        },
        variables.tileLength
      );
      boundaries.push(tunnelBoundary);
    });
  }

  static makePellets(map, variables) {
    const pellets = [];
    map.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === ".") {
          const pellet = new Pellet(
            {
              position: {
                x: (variables.tileLength * (2 * j + 1)) / 2,
                y: (variables.tileLength * (2 * i + 1)) / 2,
              },
            },
            variables.tileLength
          );
          pellets.push(pellet);
        }
      });
    });
    return pellets;
  }

  static makePowerUps(map, variables) {
    const powerUps = [];
    map.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === "o") {
          const powerUp = new PowerUp(
            {
              position: {
                x: (variables.tileLength * (2 * j + 1)) / 2,
                y: (variables.tileLength * (2 * i + 1)) / 2,
              },
            },
            variables.tileLength
          );
          powerUps.push(powerUp);
        }
      });
    });
    return powerUps;
  }

  static makeGhosts(variables) {
    const ghosts = {};
    Factory.GHOST_DATA.forEach((data) => {
      const ghost = new Ghost(
        {
          position: {
            x: (variables.tileLength * data.position.x) / 2,
            y: (variables.tileLength * data.position.y) / 2,
          },
          velocity: {
            x: variables.tileLength * data.velocity.x,
            y: variables.tileLength * data.velocity.y,
          },
          colour: data.colour,
        },
        variables.tileLength
      );
      ghost.assignSprite();
      ghosts[data.colour] = ghost;
    });
    return ghosts;
  }

  static makePacman(variables) {
    return new PacMan(
      {
        position: {
          x: (variables.tileLength * 29) / 2,
          y: (variables.tileLength * 47) / 2,
        },
        velocity: {
          x: 0,
          y: 0,
        },
      },
      variables.tileLength
    );
  }

  static makeCycleTimer(ghosts) {
    return new CycleTimer(Object.values(ghosts));
  }

  static makeScaredTimer(ghosts) {
    return new ScaredTimer(Object.values(ghosts));
  }

  static makeRetreatingTimers(ghosts) {
    const retreatingTimers = [];
    Object.values(ghosts).forEach((ghost) => {
      const retreatingTimer = new RetreatingTimer(ghost);
      ghost.retreatingTimer = retreatingTimer;
      retreatingTimers.push(retreatingTimer);
    });
    return retreatingTimers;
  }

  static makeAudioPlayer() {
    return new AudioPlayer();
  }

  static makePauseTextImage() {
    const image = new Image();
    image.src = "./images/pause-text.png";
    return image;
  }
}
