'use client';

import { motion } from 'motion/react';
import { memo } from 'react';
import { WaveBirdMirroredSvg, WaveBirdSvg } from './WaveBird.style';

export const WaveBird = memo(() => {
  return (
    <motion.div
      animate={{
        rotate: [0, 6, -4],
        y: [0, 15, 3],
      }}
      transition={{
        duration: 8,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse',
        times: [0, 0.5, 1],
      }}
      style={{
        position: 'absolute',
        bottom: '38px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
      }}
    >
      <WaveBirdSvg xmlns="http://www.w3.org/2000/svg" width="48" height="52" fill="none">
        <path
          fill="var(--color-birdBody)"
          d="M10.36 0h25.226c3.028 0 5.484 2.48 5.484 5.54v38.778c0 2.448-1.965 4.432-4.387 4.432h-17.55c-2.422 0-4.386-1.984-4.386-4.432V13.663A23.32 23.32 0 0 1 10.359 0"
        />
        <path
          fill="var(--color-birdBeak)"
          d="M22.424 45.426c0-9.79 5.175-17.727 14.867-17.727 2.194 0 3.779 3.266 3.779 3.878v13.12c0 1.997-2.088 4.053-4.124 4.053H22.424z"
        />
        <path
          fill="var(--color-birdBeak)"
          d="M3.779 23.267h14.258c3.029 0 5.484 2.48 5.484 5.54v12.188h-8.774c-6.058 0-10.968-4.961-10.968-11.08z"
        />
        <path
          fill="var(--color-birdWing)"
          d="M1.585 24.375h19.742c3.03 0 5.484 2.48 5.484 5.54V48.75H12.553c-6.057 0-10.968-4.96-10.968-11.08z"
        />
        <path
          fill="var(--color-birdEyeball)"
          d="M26.608 13.572c0 5.402-2.365 9.782-5.282 9.782s-5.282-4.38-5.282-9.782S18.41 3.79 21.327 3.79s5.282 4.38 5.282 9.782"
        />
        <path
          fill="var(--color-birdBody)"
          d="M24.847 13.572c0 4.42-1.576 8.003-3.52 8.003-1.946 0-3.522-3.583-3.522-8.003s1.576-8.003 3.521-8.003 3.521 3.583 3.521 8.003"
        />
        <path
          fill="var(--color-birdEyeball)"
          d="M28.642 11.104c0-5.417 4.95-7.132 7.426-7.312h3.712c6.683 0 8.266 5.597 8.221 8.396v5.822H28.642z"
        />
        <path
          fill="var(--color-birdBeak)"
          d="M33.946 23.563c-4.35 0-5.304-3.386-5.304-5.959h15.91c0 5.01-3.535 5.959-5.303 5.959z"
        />
        <path
          fill="var(--color-birdShadow)"
          d="M31.68 47.458C10.09 45.627 4.294 31.278 4.094 24.33h-2.52v13.732c1.056 8.48 7.477 10.68 10.555 10.72h24.71c3.07 0 4.077-2.57 4.197-3.855-.48.964-5.997 2.815-9.355 2.53"
        />
      </WaveBirdSvg>
      <WaveBirdMirroredSvg xmlns="http://www.w3.org/2000/svg" width="48" height="52" fill="none">
        <path
          fill="var(--color-birdBody)"
          d="M10.36 0h25.226c3.028 0 5.484 2.48 5.484 5.54v38.778c0 2.448-1.965 4.432-4.387 4.432h-17.55c-2.422 0-4.386-1.984-4.386-4.432V13.663A23.32 23.32 0 0 1 10.359 0"
        />
        <path
          fill="var(--color-birdBeak)"
          d="M22.424 45.426c0-9.79 5.175-17.727 14.867-17.727 2.194 0 3.779 3.266 3.779 3.878v13.12c0 1.997-2.088 4.053-4.124 4.053H22.424z"
        />
        <path
          fill="var(--color-birdBeak)"
          d="M3.779 23.267h14.258c3.029 0 5.484 2.48 5.484 5.54v12.188h-8.774c-6.058 0-10.968-4.961-10.968-11.08z"
        />
        <path
          fill="var(--color-birdBeak)"
          d="m0 27.263 16.602-.31c3.028-.056 5.528 2.378 5.584 5.437l.238 13.053-11.118.207C5.249 45.763.249 40.895.137 34.777z"
        />
        <path
          fill="var(--color-birdWing)"
          d="M1.585 24.375h19.742c3.03 0 5.484 2.48 5.484 5.54V48.75H12.553c-6.057 0-10.968-4.96-10.968-11.08z"
        />
        <path
          fill="var(--color-birdEyeBall)"
          d="M26.608 13.572c0 5.402-2.365 9.782-5.282 9.782s-5.282-4.38-5.282-9.782S18.41 3.79 21.327 3.79s5.282 4.38 5.282 9.782"
        />
        <path
          fill="var(--color-birdBody)"
          d="M24.847 13.572c0 4.42-1.576 8.003-3.52 8.003-1.946 0-3.522-3.583-3.522-8.003s1.576-8.003 3.521-8.003 3.521 3.583 3.521 8.003"
        />
        <path
          fill="var(--color-birdEyeBall)"
          d="M28.642 11.104c0-5.417 4.95-7.132 7.426-7.312h3.712c6.683 0 8.266 5.597 8.221 8.396v5.822H28.642z"
        />
        <path
          fill="var(--color-birdBeak)"
          d="M33.946 23.563c-4.35 0-5.304-3.386-5.304-5.959h15.91c0 5.01-3.535 5.959-5.303 5.959z"
        />
        <path
          fill="var(--color-birdShadow)"
          d="M31.68 47.458C10.09 45.627 4.294 31.278 4.094 24.33h-2.52v13.732c1.056 8.48 7.477 10.68 10.555 10.72h24.71c3.07 0 4.077-2.57 4.197-3.855-.48.964-5.997 2.815-9.355 2.53"
        />
      </WaveBirdMirroredSvg>
    </motion.div>
  );
});

WaveBird.displayName = 'WaveBird';
