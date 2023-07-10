'use client';
import React, { useEffect, useState, createContext, useMemo } from 'react';
import { COLORS, COLOR_MODE_KEY } from '@/constants/constants';

export const ThemeContext = createContext<any>({});

export default function Provider({ children }: { children: React.ReactNode }) {
    const [colorMode, rawSetColorMode] = useState<string | null>(null);

    useEffect(() => {
        const root = document.documentElement;
        const initColorValue = root.getAttribute('data-color-mode');
        rawSetColorMode(initColorValue);
    }, []);

    const contextValue = useMemo(() => {
        const setColorMode = (newValue: 'dark' | 'light') => {
            const root = window.document.documentElement;
            root.setAttribute('data-color-mode', newValue);

            localStorage.setItem(COLOR_MODE_KEY, newValue);
            Object.entries(COLORS).map(([name, colorByTheme]) => {
                const cssVariable = `--color-${name}`;

                root.style.setProperty(cssVariable, colorByTheme[newValue]);
            });

            rawSetColorMode(newValue);
        };

        return { colorMode, setColorMode };
    }, [colorMode, rawSetColorMode]);

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}
