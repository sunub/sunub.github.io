'use client';

import Image from 'next/image';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
`;

const scrollAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 20%) scale(0.5);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
`;

export const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  background-color: #e5e7eb;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const Caption = styled.figcaption`
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563;
  margin-top: 0.5rem;
`;

export const Figure = styled.figure`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: auto;
  cursor: zoom-in;
`;

export const ZoomImageContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
`;

export const ZoomedImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 90%;
  max-height: 90%;
  aspect-ratio: auto;
  cursor: zoom-out;
`;

export const BlurredBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--color-background);
  cursor: zoom-out;
`;

export const StyledImage = styled(Image)<{
  $isLoading: boolean;
  $zoomed?: boolean;
}>`
  object-fit: contain;
  transition: opacity 0.3s ease;
  opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
  animation: ${scrollAnimation} 800ms cubic-bezier(0.4, 0, 0.25, 1);

  ${({ $zoomed }) =>
    $zoomed &&
    css`
      cursor: zoom-out;
      z-index: 10000;
    `}
`;

export const CustomImageStyle = styled(Image)<{
  $isLoading: boolean;
  $extraCss?: ReturnType<typeof css>;
}>`
  object-fit: contain;
  transition: opacity 0.3s ease;
  opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};

  ${({ $extraCss }) => $extraCss || ''}
`;
