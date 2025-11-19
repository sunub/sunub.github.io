'use client';

import Cookies from 'js-cookie';
import React, { useCallback } from 'react';
import { Theme } from 'type';
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/constants';

interface ThemeContextProps {
  colorTheme: Theme;
  setColorTheme: (nextValue: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  colorTheme: 'light',
  setColorTheme: () => {},
});

function ThemeProvider({ initialTheme, children }: { initialTheme: 'light' | 'dark'; children: React.ReactNode }) {
  const [colorTheme, rawSetColorTheme] = React.useState<'light' | 'dark'>(initialTheme);

  const updateTheme = useCallback((nextTheme: Theme) => {
    const root = document.documentElement;

    const colors = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;

    root.setAttribute('data-color-theme', nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });

    Cookies.set('color-theme', nextTheme, { expires: 1000 });
    rawSetColorTheme(nextTheme);
  }, []);

  React.useEffect(() => {
    function matchMediaHandler({ matches: isDark }: { matches: boolean }) {
      const nextColorTheme = isDark ? 'dark' : 'light';
      updateTheme(nextColorTheme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', matchMediaHandler);

    return () => mediaQuery.removeEventListener('change', matchMediaHandler);
  }, [updateTheme]);

  const contextValue = React.useMemo(
    () => ({
      colorTheme,
      setColorTheme: updateTheme,
    }),
    [colorTheme, updateTheme]
  );

  return <ThemeContext.Provider value={contextValue as ThemeContextProps}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}


export default ThemeProvider;
