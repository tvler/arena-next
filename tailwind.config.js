/* eslint-disable no-undef */
const grayLight = "#EFEFEF";
const grayDefault = "#DFDFDF";
const grayDark = "#919295";
const grayDarkest = "#535355";

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "#fff",
      blue: {
        lightest: "#F9FBFF",
        light: "#E2ECFF",
        DEFAULT: "#3B5998",
      },
      purple: {
        DEFAULT: "#573B8E",
      },
      green: {
        DEFAULT: "#17AC10",
      },
      "cool-black": "#333",
      gray: {
        light: grayLight,
        DEFAULT: grayDefault,
        dark: grayDark,
        darkest: grayDarkest,
        // Prose hacks
        100: grayLight,
        200: grayLight,
        300: grayDefault,
        400: grayDefault,
        500: grayDark,
        600: grayDark,
        700: grayDarkest,
        800: grayDarkest,
        900: grayDarkest,
      },
    },
    fontFamily: {
      sans: "Helvetica, Arial, sans-serif",
      serif: "Palatino, serif",
    },
    extend: {
      keyframes: {
        "ellipses-loader": {
          "0%": {
            opacity: 1,
            clipPath: "inset(0 100% 0 0)",
          },
          "24.9%": {
            clipPath: "inset(0 100% 0 0)",
          },
          "25%": {
            clipPath: "inset(0 66% 0 0)",
          },
          "49.9%": {
            clipPath: "inset(0 66% 0 0)",
          },
          "50%": {
            clipPath: "inset(0 33% 0 0)",
          },
          "74.9%": {
            clipPath: "inset(0 33% 0 0)",
          },
          "75%": {
            clipPath: "inset(0 0 0 0)",
          },
          "100%": {
            opacity: 1,
            clipPath: "none",
          },
        },
      },
      animation: {
        "ellipses-loader": "ellipses-loader linear 0.9s infinite",
      },
      gridTemplateColumns: {
        "auto-fit-block": "repeat(auto-fit, var(--block-size))",
      },
      gridAutoRows: {
        block: "var(--block-size)",
      },
      spacing: {
        block: "var(--block-size)",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: null,
            },
            h2: {
              fontWeight: null,
            },
            h3: {
              fontWeight: null,
            },
            h4: {
              fontWeight: null,
            },
            a: {
              fontWeight: null,
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
