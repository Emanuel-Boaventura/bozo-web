export function getRandomRgbColor() {
  const red = Math.floor(Math.random() * 256); // Generate random number between 0 and 255
  const green = Math.floor(Math.random() * 256); // Generate random number between 0 and 255
  const blue = Math.floor(Math.random() * 256); // Generate random number between 0 and 255

  return `rgb(${red}, ${green}, ${blue})`;
}
