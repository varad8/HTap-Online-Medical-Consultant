/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        voilet: "#9D7BFE",
        white: "#ffffff",
        black: "#000000",
        skyblue: "#03B8C9",
        yellow_dark: "#FABA20",
      },
      backgroundImage: {
        features:
          "radial-gradient(circle at 85% 1%, rgba(255,0,0, 0.05) 0%, rgba(255,0,0, 0.05) 96%,transparent 96%, transparent 100%),radial-gradient(circle at 14% 15%, rgba(255,0,0, 0.05) 0%, rgba(255,0,0, 0.05) 1%,transparent 1%, transparent 100%),radial-gradient(circle at 60% 90%, rgba(255,0,0, 0.05) 0%, rgba(255,0,0, 0.05) 20%,transparent 20%, transparent 100%),radial-gradient(circle at 79% 7%, rgba(255,0,0, 0.05) 0%, rgba(255,0,0, 0.05) 78%,transparent 78%, transparent 100%),radial-gradient(circle at 55% 65%, rgba(255,0,0, 0.05) 0%, rgba(255,0,0, 0.05) 52%,transparent 52%, transparent 100%),linear-gradient(135deg, rgb(3,184,201),rgb(3,184,201))",
      },
    },
  },
  plugins: [],
};
