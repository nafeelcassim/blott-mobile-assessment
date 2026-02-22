import type { TextStyle } from "react-native";

const lineHeight100 = (fontSize: number) => fontSize;

type HeadingToken = {
  fontSize: number;
  lineHeight: number;
  fontWeight: TextStyle["fontWeight"];
};

type BodyToken = {
  fontSize: number;
  lineHeight: number;
};

export const TYPOGRAPHY = {
  weight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  } as const satisfies Record<string, TextStyle["fontWeight"]>,
  heading: {
    xs: {
      fontSize: 14,
      lineHeight: lineHeight100(14),
      fontWeight: "700",
    } satisfies HeadingToken,
    sm: {
      fontSize: 16,
      lineHeight: lineHeight100(16),
      fontWeight: "700",
    } satisfies HeadingToken,
    md: {
      fontSize: 18,
      lineHeight: lineHeight100(18),
      fontWeight: "700",
    } satisfies HeadingToken,
    lg: {
      fontSize: 20,
      lineHeight: lineHeight100(20),
      fontWeight: "700",
    } satisfies HeadingToken,
    xl: {
      fontSize: 24,
      lineHeight: lineHeight100(24),
      fontWeight: "700",
    } satisfies HeadingToken,
    "2xl": {
      fontSize: 30,
      lineHeight: lineHeight100(30),
      fontWeight: "700",
    } satisfies HeadingToken,
  },
  body: {
    "2xs": {
      fontSize: 10,
      lineHeight: lineHeight100(10),
    } satisfies BodyToken,
    xs: {
      fontSize: 12,
      lineHeight: lineHeight100(12),
    } satisfies BodyToken,
    sm: {
      fontSize: 14,
      lineHeight: lineHeight100(14),
    } satisfies BodyToken,
    md: {
      fontSize: 16,
      lineHeight: lineHeight100(16),
    } satisfies BodyToken,
    lg: {
      fontSize: 18,
      lineHeight: lineHeight100(18),
    } satisfies BodyToken,
    xl: {
      fontSize: 20,
      lineHeight: lineHeight100(20),
    } satisfies BodyToken,
    "2xl": {
      fontSize: 24,
      lineHeight: lineHeight100(24),
    } satisfies BodyToken,
    "3xl": {
      fontSize: 30,
      lineHeight: lineHeight100(30),
    } satisfies BodyToken,
  },
} as const;
