import Boundary from "../../models/boundary";
import makeTunnelBoundaries from "./makeTunnelBoundaries";

export default function makeBoundaries(
  map,
  variables,
  callback = makeTunnelBoundaries
) {
  const boundaries = [];
  map.forEach((row, i) => {
    row.forEach((element, j) => {
      if (element === "-") {
        const regularImage = new Image();
        regularImage.src = "./images/pipe-horizontal.png";
        const whiteImage = new Image();
        whiteImage.src = "./images/pipe-horizontal-white.png";
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
      } else if (element === "|") {
        const regularImage = new Image();
        regularImage.src = "./images/pipe-vertical.png";
        const whiteImage = new Image();
        whiteImage.src = "./images/pipe-vertical-white.png";
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
      } else if (element === "1") {
        const regularImage = new Image();
        regularImage.src = "./images/pipe-corner-one.png";
        const whiteImage = new Image();
        whiteImage.src = "./images/pipe-corner-one-white.png";
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
      } else if (element === "2") {
        const regularImage = new Image();
        regularImage.src = "./images/pipe-corner-two.png";
        const whiteImage = new Image();
        whiteImage.src = "./images/pipe-corner-two-white.png";
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
      } else if (element === "3") {
        const regularImage = new Image();
        regularImage.src = "./images/pipe-corner-three.png";
        const whiteImage = new Image();
        whiteImage.src = "./images/pipe-corner-three-white.png";
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
      } else if (element === "4") {
        const regularImage = new Image();
        regularImage.src = "./images/pipe-corner-four.png";
        const whiteImage = new Image();
        whiteImage.src = "./images/pipe-corner-four-white.png";
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
  callback(boundaries, variables);
  return boundaries;
}
