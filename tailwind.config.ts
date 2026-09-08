import type { Config } from "tailwindcss";

/**
 * KARTHIKEYAN C — PORTFOLIO V2 · "DESIGN IN MOTION"
 * Brand tokens: near-black editorial base, orange as the interaction color,
 * purple as the experimental/creative accent.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0F1015", // primary background
          secondary: "#171821",
        },
        surface: {
          DEFAULT: "#20212B",
          elevated: "#262733",
        },
        border: {
          DEFAULT: "#30313D",
        },
        text: {
          DEFAULT: "#F5F5F7", // primary text
          secondary: "#A0A1B2",
          muted: "#737583",
        },
        orange: {
          DEFAULT: "#FB542B", // primary interaction
          hover: "#FF704D",
        },
        purple: {
          DEFAULT: "#A3278F", // experimental / creative
          deep: "#4F30AB",
        },
        // --- Back-compat aliases (V1 components) mapped onto the V2 palette.
        // Being migrated section-by-section; remove once no component uses them.
        base: {
          DEFAULT: "#0F1015",
          soft: "#171821",
          elevated: "#20212B",
        },
        ink: {
          DEFAULT: "#F5F5F7",
          muted: "#A0A1B2",
          faint: "#737583",
        },
        accent: {
          DEFAULT: "#FB542B",
          soft: "#FF704D",
          deep: "#4F30AB",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial scale
        hero: ["clamp(2.5rem, 8vw, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        section: ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        project: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "28px",
      },
      transitionTimingFunction: {
        // centralized easing
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
        expo: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      transitionDuration: {
        // motion tokens
        fast: "200ms",
        normal: "400ms",
        medium: "600ms",
        slow: "900ms",
        cinematic: "1200ms",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
