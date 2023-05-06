import implementTunnel from "../boundaries/implementTunnel";
import checkIfPacmanIsEating from "./checkIfPacmanIsEating";
import changeDirection from "./movement/changeDirection";

export default function implementPacman(
  variables,
  pacman,
  boundaries,
  ctx,
  pellets,
  callbackOne = changeDirection,
  callbackTwo = checkIfPacmanIsEating,
  callbackThree = implementTunnel
) {
  callbackOne(variables, pacman, boundaries);
  callbackTwo(pellets, pacman);
  pacman.update(ctx);
  callbackThree(pacman, variables);
}
