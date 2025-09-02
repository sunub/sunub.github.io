'use client';

import styled from 'styled-components';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { BottomClouds } from '@/components/LoadingAnimation/ui/BottomClouds';
import { FlyingBirdAnime } from '@/components/LoadingAnimation/ui/FlyingBird';
import { TopClouds } from '@/components/LoadingAnimation/ui/TopCloud';

export default function Loading() {
  return (
    <BodyWrapper data-testid="loading-screen">
      <TopClouds />
      <LoadingAnimation>
        <FlyingBirdAnime />
      </LoadingAnimation>
      <BottomClouds />
    </BodyWrapper>
  );
}

const BodyWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  width: 100dvw;
  height: 100dvh;
  background: color-mix(in oklch, var(--color-background), var(--color-midStop) 10%);
`;
