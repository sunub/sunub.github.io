'use client';

import { memo } from 'react';
import { UnderLineWavePath, UnderLineWaveSVG } from '../styles/index';

interface UnderLineWaveIconProps {
  width?: number;
  scale?: string;
  length?: number;
  delay?: number;
}

export const UnderLineWaveIcon = memo(
  ({ width = 3, scale = '5, 1', length = 0.6, delay = 0.5 }: UnderLineWaveIconProps) => {
    return (
      <UnderLineWaveSVG
        id="search-input_underline-wave"
        xmlns="http://www.w3.org/2000/svg"
        width="470"
        height="11"
        fill="none"
      >
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
