export default function findRedOrangeAimPath(pacman, pathway) {
  return {
    x: pacman.position.x - pathway.position.x,
    y: pacman.position.y - pathway.position.y,
  };
}
