/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      screens: {
        max_screen: "1140px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "#433CEB",
        secondary: "#CB2A8A",
        primaryText: "#333333",
        secondaryText: "#666666",
      },
      backgroundImage: {
        gradient: "linear-gradient(94deg, #FF1493 -24.05%, #1746FF 127.9%)",
        headerGradient:
          "linear-gradient(90deg, rgba(255, 146, 173, 0.50) -8.03%, rgba(125, 236, 255, 0.50) 112.85%)",
      },
      fontFamily: {
        "font-primary": ["Space Grotesk", "serif"],
        "font-secondary": ["Space Grotesk", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

