import localFont from "next/font/local";

/**
 * Typefaces are self-hosted from Fontsource packages so builds never depend on a
 * third-party font CDN being reachable. Each font is exposed as a CSS variable
 * and mapped to a Tailwind family in globals.css.
 */
export const fontSans = localFont({
  src: "../../node_modules/@fontsource-variable/urbanist/files/urbanist-latin-wght-normal.woff2",
  variable: "--font-urbanist",
  weight: "100 900",
  display: "swap",
});

export const fontSerif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});

export const fontMono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

export const fontVariables = [fontSans.variable, fontSerif.variable, fontMono.variable].join(" ");
