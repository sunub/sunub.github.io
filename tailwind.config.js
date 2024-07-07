/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./posts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        base: "var(--color-frontWave)",
      },
      colors: {
        border: "oklch(42.44% 0.011 17.58)",
        input: {
          DEFAULT: "oklch(65.57% 0.19552898037793698 288.17775174927874)",
          invalid: "oklch(73.96% 0.1963 25.278467161119735)",
        },
        ring: {
          DEFAULT: "oklch(86.83% 0.06751643147886291 285.8383540015746)",
          invalid: "oklch(64.17% 0.221 26.06)",
        },
        background: "var(--color-background)",
        foreground: {
          DEFAULT: "oklch(76.7% 0.123 284.14)",
          destructive: "oklch(64.17% 0.221 26.06)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--color-background)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        device: {
          DEFAULT: "oklch(96.88% 0.015 294.47)",
          foreground: "oklch(92.86% 0.036 289.07)",
          text: "oklch(60.31% 0.105 291.44)",
        },
        pinInput: {
          DEFAULT: "oklch(92.86% 0.036 289.07)",
        },
        drawer: {
          DEFAULT: "oklch(76.64% 0.13 292.01)",
          foreground: "oklch(96.88% 0.015 294.47)",
        },
        "button-default": {
          DEFAULT: "oklch(90.62% 0.047 286.718)",
          foreground: "oklch(28.06% 0.024 291.84)",
        },
        "button-active": {
          DEFAULT: "oklch(56.76% 0.071 292.01 / 95.53%)",
          foreground: "oklch(96.88% 0.015 294.47)",
        },
        "button-confirm": {
          DEFAULT: "oklch(84.32% 0.114 146.91)",
          foreground: "oklch(46.84% 0.099 111.15)",
        },
        "button-destructive": {
          DEFAULT: "oklch(74.12% 0.157 25.26)",
          foreground: "oklch(28.06% 0.024 291.84)",
        },
        "destructive-active": {
          DEFAULT: "oklch(56.18% 0.182 25.26)",
          foreground: "oklch(96.88% 0.015 294.47)",
        },
        base: "var(--color-text)",
      },
      backgroundImage: {
        "error-pattern": "url(/error_page.svg)",
      },
    },
  },
  plugins: [],
};
