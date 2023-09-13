export function getRgbToHex(rgbColor: string) {
  const regex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  const matches = regex.exec(rgbColor);

  if (!matches) {
    throw new Error("Invalid RGB color format");
  }

  const red = parseInt(matches[1]);
  const green = parseInt(matches[2]);
  const blue = parseInt(matches[3]);

  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = blue.toString(16).padStart(2, "0");

  return `#${hexRed}${hexGreen}${hexBlue}`;
}
