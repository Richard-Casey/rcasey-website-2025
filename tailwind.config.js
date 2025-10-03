/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0f0f0f",
          gray: "#1a1a1a",
          accent: "#4FC3F7",   // Light blue highlight
          text: "#e5e5e5",
          subtext: "#9ca3af",
        },
      },
      fontFamily: {
        sans: ["'Exo 2'", "system-ui", "sans-serif"], // 👈 swapped Inter → Exo 2
        mono: ["'Fira Code'", "monospace"],
      },
      fontSize: {
        base: "1rem",   // 16px
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // <— add this
  ],
}
