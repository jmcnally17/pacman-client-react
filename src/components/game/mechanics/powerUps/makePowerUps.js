import PowerUp from "../../models/powerUp";

export default function makePowerUps(map, variables) {
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
