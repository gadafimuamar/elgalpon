/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        choco: {
          DEFAULT: "#4a2c11",
          light: "#7a4a21",
        },
        dulce: "#d4a373",
        crema: "#faedcd",
      },
    },
    fontFamily: {
      display: ["Segoe UI", "system-ui", "sans-serif"],
    },
  },
  plugins: [],
};
