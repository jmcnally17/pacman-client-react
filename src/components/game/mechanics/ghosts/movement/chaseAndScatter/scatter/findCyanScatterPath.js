export default function findCyanScatterPath(pathway) {
  return {
    x: 896 - pathway.position.x,
    y: 992 - pathway.position.y,
  };
}
