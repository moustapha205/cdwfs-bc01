/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fond: "#FFFFFF",
        texte: "#0B2540",
        secondaire: "#475569",
        accent: "#B45309",
        focus: "#2563EB",
      },
      fontSize: {
        xs: ".875rem",
        s: "1rem",
        m: "1.25rem",
        l: "1.563rem",
        xl: "1.953rem",
      },
    },
  },
  plugins: [],
};
