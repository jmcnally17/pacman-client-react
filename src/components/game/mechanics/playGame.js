import Factory from "./factory/factory";
import Game from "./game/game";


const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2", "1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "-", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "-", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", "o", "|", " ", " ", "|", ".", "|", " ", " ", " ", "|", ".", "|", "|", ".", "|", " ", " ", " ", "|", ".", "|", " ", " ", "|", "o", "|"],
  ["|", ".", "4", "-", "-", "3", ".", "4", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "3", ".", "4", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "2", ".", "1", "-", "-", "-", "-", "-", "-", "2", ".", "1", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "-", "3", ".", "|", "|", ".", "4", "-", "-", "2", "1", "-", "-", "3", ".", "|", "|", ".", "4", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "2", ".", "|", "4", "-", "-", "2", " ", "|", "|", " ", "1", "-", "-", "3", "|", ".", "1", "-", "-", "-", "-", "3"],
  [" ", " ", " ", " ", " ", "|", ".", "|", "1", "-", "-", "3", " ", "4", "3", " ", "4", "-", "-", "2", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "1", "-", "-", "-", "-", "-", "-", "2", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  ["-", "-", "-", "-", "-", "3", ".", "4", "3", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", "4", "3", ".", "4", "-", "-", "-", "-", "-"],
  [" ", " ", " ", " ", " ", " ", ".", " ", " ", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", " ", " ", ".", " ", " ", " ", " ", " ", " "],
  ["-", "-", "-", "-", "-", "2", ".", "1", "2", " ", "|", " ", " ", " ", " ", " ", " ", "|", " ", "1", "2", ".", "1", "-", "-", "-", "-", "-"],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "4", "-", "-", "-", "-", "-", "-", "3", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "|", ".", "|", "|", " ", "1", "-", "-", "-", "-", "-", "-", "2", " ", "|", "|", ".", "|", " ", " ", " ", " ", " "],
  ["1", "-", "-", "-", "-", "3", ".", "4", "3", " ", "4", "-", "-", "2", "1", "-", "-", "3", " ", "4", "3", ".", "4", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "2", ".", "1", "-", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "-", "2", ".", "1", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "2", "|", ".", "4", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "3", ".", "|", "1", "-", "3", ".", "|"],
  ["|", "o", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", ".", " ", " ", ".", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", "o", "|"],
  ["4", "-", "2", ".", "|", "|", ".", "1", "2", ".", "1", "-", "-", "-", "-", "-", "-", "2", ".", "1", "2", ".", "|", "|", ".", "1", "-", "3"],
  ["1", "-", "3", ".", "4", "3", ".", "|", "|", ".", "4", "-", "-", "2", "1", "-", "-", "3", ".", "|", "|", ".", "4", "3", ".", "4", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", "|", "|", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "1", "-", "-", "-", "-", "3", "4", "-", "-", "2", ".", "|", "|", ".", "1", "-", "-", "3", "4", "-", "-", "-", "-", "2", ".", "|"],
  ["|", ".", "4", "-", "-", "-", "-", "-", "-", "-", "-", "3", ".", "4", "3", ".", "4", "-", "-", "-", "-", "-", "-", "-", "-", "3", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

const variables = {
  tileLength: 32,
  isWindowVisible: true,
  isGamePaused: false,
  score: 0,
  lastKeyPressed: "",
  level: 1,
  player: undefined,
  reactRoot: null,
  killCount: 0,
  start: true,
  animationId: null,
  directionEventListener: null,
  visibilityEventListener: null,
  pauseEventListener: null,
  levelUpCount: 0,
  frameLifetime: 10,
  startTime: null,
}

const assets = Factory.makeAssets(map, variables);

export default function playGame(player, reactRoot) {
  variables.animationId = requestAnimationFrame(playGame);
  const board = document.querySelector("#board");
  const ctx = board.getContext("2d");
  if (variables.start === true) {
    Game.finishSetup(variables, player, reactRoot, assets, ctx);
    variables.startTime = performance.now();
  }
  if (performance.now() - variables.startTime >= variables.frameLifetime) {
    ctx.clearRect(0, 0, board.width, board.height);
    Game.implementPhysics(assets, ctx, variables);
    Game.implementGraphics(variables, assets["characters"]["pacman"]);
    Game.manageGhostAudio(assets);
    variables.startTime = performance.now();
  }
};
