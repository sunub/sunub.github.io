'use client';

import { useContext } from 'react';
import styled from 'styled-components';
import ThemeIcon from '../icon/ColorThemeIcon';
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

// const SunAndMoon = styled.svg`
//     --icon-fill: oklch(45.88% 0.029 30.71);
// 	--icon-hover-fill: oklch(21.08% 0.055 34.69);
// `

// const Sun = styled.circle`
//     fill: var(--icon-fill);
// `

// const SunAndBeams = styled.g`
//     stroke: var(--icon-fill);
// `

// const Moon = styled.mask`
//     transform-origin: center center;
// `

// function ThemeIcon() {
//     return (
//         <SunAndMoon
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             className="sun-and-moon"
//         >
//             <Sun cx="12" cy="12" r="5" fill="#2D0D06" id="sun" className="sun" mask="url(#moon-mask)" />
//             <SunAndBeams className="sun-beams">
//                 <path d="M12 3V3.52941" strokeWidth="3" strokeLinecap="round" />
//                 <path d="M5.63604 5.63604L6.01039 6.01039" strokeWidth="3" strokeLinecap="round" />
//                 <path d="M3 12L3.52941 12" strokeWidth="3" strokeLinecap="round" />
//                 <path d="M5.63604 18.364L6.01039 17.9896" strokeWidth="3" strokeLinecap="round" />
//                 <path d="M12 20.4706V21" strokeWidth="3" strokeLinecap="round" />
//                 <path d="M17.9896 17.9896L18.364 18.364" strokeWidth="3" strokeLinecap="round" />
//                 <path d="M20.4706 12L21 12" strokeWidth="3" strokeLinecap="round" />
//                 <path d="M17.9896 6.01039L18.364 5.63604" strokeWidth="3" strokeLinecap="round" />
//             </SunAndBeams>
//             <Moon className="moon" id="moon-mask">
//                 <rect x="0" y="0" width="100%" height="100%" fill="white" />
//                 <circle cx="24" cy="24" r="6" fill="black" />
//             </Moon>
//         </SunAndMoon>
//     );
// }


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
