/* eslint-disable no-undef */
module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "#fff",
      blue: {
        lightest: "#f9fbff",
        light: "#E2ECFF",
        DEFAULT: "#3B5998",
      },
      purple: {
        light: "#cfcbd6",
        DEFAULT: "#4b3d67",
      },
      green: {
        light: "#c1e9bf",
        DEFAULT: "#17ac10",
      },
      "cool-black": "#333",
      gray: "#ccc",
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
