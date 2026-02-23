export function hexToRgba(
  hex: string,
  opacity?: number,
  output: "string" | "tuple" = "string",
): string | null {
  const validHex =
    /^#?([a-fA-F\d]{3}|[a-fA-F\d]{4}|[a-fA-F\d]{6}|[a-fA-F\d]{8})$/;
  if (!validHex.test(hex)) {
    return null;
  }

  hex = hex.replace(/^#/, "");

  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const a = (() => {
    if (opacity !== undefined) {
      return Math.min(1, Math.max(0, opacity));
    }

    if (hex.length === 8) {
      return parseInt(hex.substring(6, 8), 16) / 255;
    }

    return 1;
  })();

  if (output === "string") {
    return `${r} ${g} ${b}`;
  } else {
    return `${r} ${g} ${b} ${a}`;
  }
}
