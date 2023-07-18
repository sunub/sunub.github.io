'use client';

import ThemeIcon from '@/components/icon/ColorThemeIcon';
import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '@/components/Theme/ThemeProvider';

type Theme = {
    colorMode?: string | null,
    setColorMode?: (value: string) => void,
};

const ToggleBtn = styled.button`
    --toggle-size: var(--size-6);

    background: none;
    border: none;
    padding: 0;

    inline-size: var(--toggle-size);
    block-size: var(--toggle-size);
    aspect-ratio: 1;
    border-radius: 50%;

    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    outline-offset: 5px;

    & > svg {
        inline-size: 100%;
        block-size: 100%;
        stroke-linecap: round;
    }

    @media (hover: none) {
        --toggle-size: 48px;
    }
`;

export default function ThemeToggler() {
    const theme: Theme = useContext(ThemeContext);

    return (
        <ToggleBtn
            title="Toggles light & dark"
            aria-label="auto"
            onClick={() => {
                if (theme.setColorMode) {
                    const curTheme: string = theme.colorMode === 'light' ? 'dark' : 'light';
                    theme.setColorMode(curTheme);
                }
            }}
        >
            <ThemeIcon />
        </ToggleBtn>
    );
}
