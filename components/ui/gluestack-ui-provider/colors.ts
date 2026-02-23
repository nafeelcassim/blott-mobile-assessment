import { hexToRgba } from "@/utils";
import { vars } from "nativewind";

export const config = {
  light: vars({
    "--color-primary-0": hexToRgba("#FAF7FF")!,
    "--color-primary-50": hexToRgba("#F3EDFF")!,
    "--color-primary-100": hexToRgba("#E6D9FF")!,
    "--color-primary-200": hexToRgba("#D1B3FF")!,
    "--color-primary-300": hexToRgba("#B794F6")!,
    "--color-primary-400": hexToRgba("#9F7AEA")!,
    "--color-primary-500": hexToRgba("#805AD5")!,
    "--color-primary-600": hexToRgba("#6B46C1")!,
    "--color-primary-700": hexToRgba("#553C9A")!,
    "--color-primary-800": hexToRgba("#44337A")!,
    "--color-primary-900": hexToRgba("#322659")!,
    "--color-primary-950": hexToRgba("#1A1625")!,

    /* Secondary  */
    "--color-secondary-0": hexToRgba("#FDFDFD")!,
    "--color-secondary-50": hexToRgba("#FBFBFB")!,
    "--color-secondary-100": hexToRgba("#F6F6F6")!,
    "--color-secondary-200": hexToRgba("#F2F2F2")!,
    "--color-secondary-300": hexToRgba("#EDEDED")!,
    "--color-secondary-400": hexToRgba("#E6E6E7")!,
    "--color-secondary-500": hexToRgba("#D9D9DB")!,
    "--color-secondary-600": hexToRgba("#C6C7C7")!,
    "--color-secondary-700": hexToRgba("#BDBDBD")!,
    "--color-secondary-800": hexToRgba("#B1B1B1")!,
    "--color-secondary-900": hexToRgba("#A5A4A4")!,
    "--color-secondary-950": hexToRgba("#9D9D9D")!,

    /* Error */
    "--color-error-0": hexToRgba("#FEE9E9")!,
    "--color-error-50": hexToRgba("#FEE2E2")!,
    "--color-error-100": hexToRgba("#FECACA")!,
    "--color-error-200": hexToRgba("#FCA5A5")!,
    "--color-error-300": hexToRgba("#F87171")!,
    "--color-error-400": hexToRgba("#EF4444")!,
    "--color-error-500": hexToRgba("#E63535")!,
    "--color-error-600": hexToRgba("#DC2626")!,
    "--color-error-700": hexToRgba("#B91C1C")!,
    "--color-error-800": hexToRgba("#991B1B")!,
    "--color-error-900": hexToRgba("#7F1D1D")!,
    "--color-error-950": hexToRgba("#531313")!,

    /* Typography */
    "--color-typography-0": hexToRgba("#FEFEFF")!,
    "--color-typography-50": hexToRgba("#F5F5F5")!,
    "--color-typography-100": hexToRgba("#E5E5E5")!,
    "--color-typography-200": hexToRgba("#DBDBDC")!,
    "--color-typography-300": hexToRgba("#D4D4D4")!,
    "--color-typography-400": hexToRgba("#A3A3A3")!,
    "--color-typography-500": hexToRgba("#8C8C8C")!,
    "--color-typography-600": hexToRgba("#737373")!,
    "--color-typography-700": hexToRgba("#525252")!,
    "--color-typography-800": hexToRgba("#404040")!,
    "--color-typography-900": hexToRgba("#262627")!,
    "--color-typography-950": hexToRgba("#171717")!,

    /* Border */
    "--color-border-300": hexToRgba("#D3D3D3")!,

    /* Focus Ring Indicator  */
    "--color-indicator-primary": hexToRgba("#373737")!,
    "--color-indicator-info": hexToRgba("#5399EC")!,
    "--color-indicator-error": hexToRgba("#B91C1C")!,
  }),
};
