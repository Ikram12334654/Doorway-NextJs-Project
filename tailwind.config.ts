import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        left: "-10px 0 15px -3px rgba(0, 0, 0, 0.1), -4px 0 6px -2px rgba(0, 0, 0, 0.05)",
      },
      screens: {
        mobile: "300px",
        sm: { max: "499px" },
        md: { max: "769px" },
        lg: { max: "1024px" },
        xl: { max: "1439px" },
        "2xl": "1599px",
        "min-sm": "300px",
        "min-md": "499px",
        "min-lg": "769px",
        "min-xl": "1045px",
      },
      colors: {
        themeColor: "#1ed761",
      },
      width: {
        "90p": "90%",
        "80p": "80%",
        "70p": "70%",
      },
      fontSize: {
        xl: "3.3rem",

        lg: "2rem",
        md: "1.5rem",
        mde: "1rem",
        sm: "0.7rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
