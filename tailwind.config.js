/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        night: "#0A0A0A",
        darkBlue: "#001B29",
        blue: "#002132",
        lightBlue: "#044362",
        profileButton: "#c97388",
        gold: "#BBA839",
        darkGold: "#5E541D"
      },
    },
  },
  plugins: [],
};
