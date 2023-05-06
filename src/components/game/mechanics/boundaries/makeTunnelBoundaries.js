import Boundary from "../../models/boundary";

const regularImage = new Image();
regularImage.src = "./images/pipe-horizontal.png";
const whiteImage = new Image();
whiteImage.src = "./images/pipe-horizontal-white.png";

export default function makeTunnelBoundaries(boundaries, variables) {
  const tunnelBoundaryOne = new Boundary(
    {
      position: {
        x: -variables.tileLength,
        y: variables.tileLength * 13,
      },
      regularImage: regularImage,
      whiteImage: whiteImage,
    },
    variables.tileLength
  );
  const tunnelBoundaryTwo = new Boundary(
    {
      position: {
        x: -variables.tileLength,
        y: variables.tileLength * 15,
      },
      regularImage: regularImage,
      whiteImage: whiteImage,
    },
    variables.tileLength
  );
  const tunnelBoundaryThree = new Boundary(
    {
      position: {
        x: variables.tileLength * 28,
        y: variables.tileLength * 13,
      },
      regularImage: regularImage,
      whiteImage: whiteImage,
    },
    variables.tileLength
  );
  const tunnelBoundaryFour = new Boundary(
    {
      position: {
        x: variables.tileLength * 28,
        y: variables.tileLength * 15,
      },
      regularImage: regularImage,
      whiteImage: whiteImage,
    },
    variables.tileLength
  );
  boundaries.push(
    tunnelBoundaryOne,
    tunnelBoundaryTwo,
    tunnelBoundaryThree,
    tunnelBoundaryFour
  );
}
