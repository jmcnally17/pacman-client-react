export default function addDirectionDetection(variables) {
  window.addEventListener(
    "keydown",
    (variables.directionEventListener = ({ key }) => {
      if (key === "ArrowUp") {
        variables.lastKeyPressed = "up";
      } else if (key === "ArrowLeft") {
        variables.lastKeyPressed = "left";
      } else if (key === "ArrowRight") {
        variables.lastKeyPressed = "right";
      } else if (key === "ArrowDown") {
        variables.lastKeyPressed = "down";
      }
    })
  );
}
