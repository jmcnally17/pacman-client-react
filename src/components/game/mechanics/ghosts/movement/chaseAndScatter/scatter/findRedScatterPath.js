export default function findRedScatterPath(pathway) {
  return {
    x: 896 - pathway.position.x,
    y: -pathway.position.y,
  };
}
