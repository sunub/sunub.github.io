<<<<<<< HEAD
<<<<<<< HEAD
const COLORS = {
  text: {
    light: `oklch(21.08% 0.055 34.69)`,
    dark: `oklch(100% 0 31.08)`,
  },
  background: {
    light: `oklch(97.14% 0.011 31.07)`,
    dark: `oklch(23.93% 0 0)`,
  },
  primary: {
    light: `oklch(100% 0 0 / 0.8)`,
    dark: `oklch(34% 0.019 229.64)`,
  },
  highlightColor: {
    light: `oklch(70.8% 0.165 32.85)`,
    dark: `oklch(64.86% 0.181 249.54)`,
  },
  header: {
    light: `oklch(90.8% 0.046 29.64)`,
    dark: `oklch(30.4% 0.005 247.98)`,
  },
  icon: {
    light: `oklch(61.8% 0.027 30.58)`,
    dark: `oklch(97.14% 0.011 31.07)`,
  },
  elevation: {
    light: "oklch(100% 0 0)",
    dark: "oklch(45.42% 0.007 239.95)",
  },
  bird: {
    light: "oklch(73.44% 0.152 21.47)",
    dark: "oklch(90.21% 0.055771670330652126 300.11937740281473)",
  },
  thumb: {
    light: "oklch(92.54% 0.01 32.52)",
    dark: "oklch(92.17% 0.039 291.94)",
  },
  thumbBackground: {
    light: "oklch(53.74% 0.029 30.1)",
    dark: "oklch(45.42% 0.007 239.95)",
  },
=======
=======
>>>>>>> refs/remotes/origin/sunub
const LIGHT_COLORS: Record<string, string> = {
  "--color-navlink": `oklch(42.14% 0.08 29.36)`,
  "--color-text": `oklch(21.08% 0.055 34.69)`,
  "--color-background": `oklch(97.14% 0.011 31.07)`,
  "--color-primary": `oklch(100% 0 0 / 0.8)`,
  "--color-highlight": `oklch(70.8% 0.165 32.85)`,
  "--color-header": `oklch(90.8% 0.046 29.64)`,
  "--color-icon": `oklch(61.8% 0.027 30.58)`,
  "--color-elevation": `oklch(100% 0 0)`,
  "--color-bird": `oklch(73.44% 0.152 21.47)`,
  "--color-thumb": `oklch(36.76% 0.016 32.52)`,
  "--color-thumbBackground": `oklch(82.35% 0.007 30.1 / 73.5%)`,
  "--color-frontWave": `oklch(97.14% 0.011 31.07)`,
  "--color-midStart": `oklch(93.91% 0.026 32.24)`,
  "--color-midStop": `oklch(87.16% 0.067 29.88)`,
  "--color-endStart": `oklch(91.76% 0.034 31.16)`,
  "--color-endStop": `oklch(89.29% 0.054 18.22)`,
<<<<<<< HEAD
  "--color-birdWing": "oklch(34% 0.019 229.64)",
  "--color-birdBody": "oklch(23.32% 0.011 216.94)",
  "--color-birdBeak": "oklch(58.39% 0.025 237.95)",
  "--color-birdEyeball": "oklch(88.53% 0 0)",
  "--color-landscape":
    "linear-gradient(1deg, oklch(97.14% 0.011 31.07) 21.41%, oklch(82.9% 0.09573202406959574 31.111262465234525 / 68%) 55.11%)",
=======
>>>>>>> refs/remotes/origin/sunub
};

const DARK_COLORS: Record<string, string> = {
  "--color-navlink": `oklch(90.21% 0.055771670330652126 300.11937740281473)`,
  "--color-text": `oklch(100% 0 31.08)`,
  "--color-background": `oklch(23.93% 0 0)`,
  "--color-primary": `oklch(34% 0.019 229.64)`,
  "--color-highlight": `oklch(64.86% 0.181 249.54)`,
  "--color-header": `oklch(30.4% 0.005 247.98)`,
  "--color-icon": `oklch(97.14% 0.011 31.07)`,
  "--color-elevation": `oklch(45.42% 0.007 239.95)`,
  "--color-bird": `oklch(90.21% 0.055771670330652126 300.11937740281473)`,
  "--color-thumb": `oklch(92.17% 0.039 291.94)`,
  "--color-thumbBackground": `oklch(45.42% 0.007 239.95)`,
  "--color-frontWave": `oklch(23.93% 0 0)`,
  "--color-midStart": `oklch(92.17% 0.039 291.94)`,
  "--color-midStop": `oklch(58.12% 0.155 287.19)`,
  "--color-endStart": `oklch(58.37% 0.154 286.76)`,
  "--color-endStop": `oklch(38.11% 0.111 286.59)`,
<<<<<<< HEAD
  "--color-birdWing": "oklch(39.71% 0.054 232.07)",
  "--color-birdBody": "oklch(26.29% 0.026 216.39)",
  "--color-birdBeak": "oklch(72.63% 0.045 233.48)",
  "--color-birdEyeball": "oklch(96.12% 0 0)",
  "--color-landscape":
    "linear-gradient(1deg, oklch(76.95% 0.12588555394033804 289.2710106250223) 24.47%, oklch(43.6% 0.073 290.15) 55.11%)",
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
};

const COLOR_MODE_KEY = "theme-preference";

<<<<<<< HEAD
<<<<<<< HEAD
export { COLORS, COLOR_MODE_KEY };
=======
export { LIGHT_COLORS, DARK_COLORS, COLOR_MODE_KEY };
>>>>>>> dev-v2
=======
export { LIGHT_COLORS, DARK_COLORS, COLOR_MODE_KEY };
>>>>>>> refs/remotes/origin/sunub
