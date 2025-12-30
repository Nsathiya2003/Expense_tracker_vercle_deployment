/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- make sure this matches your project files
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#1B1B1B",
        "light-white": "rgba(255,255,255,0.18)",
        "light-grey": "rgba(30, 23, 23, 0.18)",
        purple: "#5B3256",
        "light-blue": " rgb(184, 227, 241)",
        // "dark-gray":
        purple: "#50404eff",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        fadeOut: "fadeOut 0.2s ease-in",
        slideDown: "slideDown 0.25s ease-out",
        slideUp: "slideUp 0.2s ease-in",
      },
    },
  },
  plugins: [],
};
