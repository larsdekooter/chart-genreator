export function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function rgbaToHex(rgbaColor: string) {
  const rgbaValues = rgbaColor
    .substring(rgbaColor.indexOf("(") + 1, rgbaColor.lastIndexOf(")"))
    .split(",")
    .map((val) => parseInt(val.trim()));

  if (rgbaValues.length !== 4) {
    throw new Error("Invalid RGBA color format.");
  }

  const [r, g, b, a] = rgbaValues;

  if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
    throw new Error("Invalid RGBA color values.");
  }

  if (
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255 ||
    a < 0 ||
    a > 1
  ) {
    throw new Error("RGBA color values out of range.");
  }

  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");

  return `#${hexR}${hexG}${hexB}`;
}

function isHexColor(color: string) {
  return /^#([A-Fa-f0-9]{3}){1,2}$/.test(color);
}

function isRgbColor(color: string) {
  return /^rgba?\(\s?\d+\s?,\s?\d+\s?,\s?\d+(\s?,\s?[01](\.\d+)?)?\s?\)$/.test(
    color
  );
}
