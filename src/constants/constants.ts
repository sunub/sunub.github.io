const LIGHT_COLORS: Record<string, string | number> = {
  "--color-navlink": `oklch(42.14% 0.08 29.36)`,
  "--color-text": `oklch(21.08% 0.055 34.69)`,
  "--color-background": `oklch(97.14% 0.011 31.07)`,
  "--color-primary": `oklch(100% 0 0 / 0.8)`,
  "--color-highlight": `oklch(70.8% 0.165 32.85)`,
  "--color-header": `oklch(90.8% 0.046 29.64)`,
  "--color-icon": `oklch(61.8% 0.027 30.58)`,
  "--color-elevation": `oklch(100% 0 0)`,
  "--color-bird": `oklch(73.44% 0.152 21.47)`,
  "--color-thumb": `oklch(92.54% 0.01 32.52)`,
  "--color-thumb-background": `oklch(53.74% 0.029 30.1)`,
  "--color-frontWave": `oklch(97.14% 0.011 31.07)`,
  "--color-midStart": `oklch(93.91% 0.026 32.24)`,
  "--color-midStop": `oklch(87.16% 0.067 29.88)`,
  "--color-endStart": `oklch(91.76% 0.034 31.16)`,
  "--color-endStop": `oklch(89.29% 0.054 18.22)`,
  "--color-landscape":
    "linear-gradient(1deg, oklch(97.14% 0.011 31.07) 21.41%, oklch(82.9% 0.09573202406959574 31.111262465234525 / 68%) 55.11%)",
  "--color-light-heroimage": 1,
  "--color-dark-heroimage": 0,
};

const DARK_COLORS: Record<string, string | number> = {
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
  "--color-thumb-background": `oklch(45.42% 0.007 239.95)`,
  "--color-frontWave": `oklch(23.93% 0 0)`,
  "--color-midStart": `oklch(92.17% 0.039 291.94)`,
  "--color-midStop": `oklch(58.12% 0.155 287.19)`,
  "--color-endStart": `oklch(58.37% 0.154 286.76)`,
  "--color-endStop": `oklch(38.11% 0.111 286.59)`,
  "--color-landscape":
    "linear-gradient(1deg, oklch(76.95% 0.12588555394033804 289.2710106250223) 24.47%, oklch(43.6% 0.073 290.15) 55.11%)",
  "--color-light-heroimage": 0,
  "--color-dark-heroimage": 1,
};

const COLOR_MODE_KEY = "theme-preference";

export { LIGHT_COLORS, DARK_COLORS, COLOR_MODE_KEY };
