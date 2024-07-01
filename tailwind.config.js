/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#201449",
        secondary: "#FFDB60",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          fontSize: "16px",
          borderColor: "#FFDB60",
        },
        h1: {
          fontSize: "3rem",
        },
        h3: {
          fontSize: "1.5rem",
        },
        svg: {
          width: "35px !important",
          height: "35px !important",
        },
        video: {
          height: "600px",
        },
      });
    },
  ],
};
