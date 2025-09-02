'use client';

import { memo } from 'react';
import styled from 'styled-components';

export const UnderLineWaveIcon = memo(
  ({
    width = 3,
    scale = '1.25, 1',
    length = 0.6,
    delay = 0.5,
  }: {
    width?: number;
    scale?: string;
    length?: number;
    delay?: number;
  }) => {
    return (
      <UnderLineWaveSVG xmlns="http://www.w3.org/2000/svg" width="700" height="11" fill="none">
        <UnderLineWavePath
          d="M3 5.19c4-1.69 14-4.31 16.5 0s4.833 3.747 8.5 0c2.684-2.742 6.472-3.093 9.5 0 3.667 3.747 6.26 3.31 9.5 0 2.633-2.69 6 3.31 11 0 3.459-2.29 5.333 3.747 9 0 3.667-3.746 5.292 5.81 13 0 4.896-3.69 5.248 4.566 11.5 0"
          strokeWidth={width}
          transform={`scale(${scale})`}
          pathLength={length}
          $delay={delay}
        />
      </UnderLineWaveSVG>
    );
  }
);

UnderLineWaveIcon.displayName = 'UnderLineWaveIcon';

const UnderLineWaveSVG = styled.svg`
  transform: rotate(-1deg);
  stroke: var(--color-text);
  stroke-width: 2.5;
  stroke-linecap: round;
`;

const UnderLineWavePath = styled.path<{ $delay: number }>`
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1);

  stroke-dashoffset: 0;
  transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
  transition-duration: 200ms;
  stroke: color-mix(in oklch, var(--color-text), transparent);

  animation: wave 2s cubic-bezier(0.8, 1, 0.7, 1) infinite;

  @keyframes wave {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.35;
    }

    100% {
      opacity: 1;
    }
  }
`;
