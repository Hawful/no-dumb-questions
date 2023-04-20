import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {},
    extend: {
      boxShadow: {
        "hard-s": "2px 2px",
        "hard-m": "4px 4px",
        "hard-l": "6px 6px",
        "hard-xl": "8px 8px",
        "hard-2xl": "10px 10px",
        "hard-s-yellow": "2px 2px #FFE100",
        "hard-m-yellow": "4px 4px #FFE100",
        "hard-l-yellow": "6px 6px #FFE100",
        "hard-xl-yellow": "8px 8px #FFE100",
        "hard-2xl-yellow": "10px 10px #FFE100",
        "hard-s-cyan": "2px 2px #00E1FF",
        "hard-m-cyan": "4px 4px #00E1FF",
        "hard-l-cyan": "6px 6px #00E1FF",
        "hard-xl-cyan": "8px 8px #00E1FF",
        "hard-2xl-cyan": "10px 10px #00E1FF",
        "hard-s-magenta": "2px 2px #FF0F8A",
        "hard-m-magenta": "4px 4px #FF0F8A",
        "hard-l-magenta": "6px 6px #FF0F8A",
        "hard-xl-magenta": "8px 8px #FF0F8A",
        "hard-2xl-magenta": "10px 10px #FF0F8A",
      },
      colors: {
        sun: {
          100: "#FFF9CC",
          200: "#FFF399",
          300: "#FFED66",
          500: "#FFE100",
          700: "#CCB400",
          800: "#998700",
        },
        sky: {
          100: "#CCF9FF",
          200: "#99F3FF",
          300: "#66EDFF",
          500: "#00E1FF",
          700: "#00B4CC",
          800: "#008799",
        },
        magenta: {
          100: "#FFDBEE",
          200: "#FFA8D5",
          300: "#FF75BC",
          500: "#FF0F8A",
          600: "#D10D71",
          700: "#9E0956",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
