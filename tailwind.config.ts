import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
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
        brand: {
          50: "#e6fff2",
          100: "#ccffe6",
          200: "#99ffcc",
          300: "#66ffb3",
          400: "#33ff99",
          500: "#1ed761",
          600: "#1ab255",
          700: "#137a3d",
          800: "#0d5228",
          900: "#073916",
        },
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
        base: "1.2rem",
        mde: "1rem",
        sm: ["0.875rem", "1.25rem"],
      },
    },
  },
  plugins: [],
} satisfies Config;
