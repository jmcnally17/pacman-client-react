export default function implementTunnel(character, variables) {
  if (character.position.x === (variables.tileLength * 57) / 2)
    character.position.x = -variables.tileLength / 2;
  else if (character.position.x === -variables.tileLength / 2)
    character.position.x = (variables.tileLength * 57) / 2;
}
