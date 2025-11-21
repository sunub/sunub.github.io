"use client";

import Image from "next/image";
import styled, { keyframes } from "styled-components";

interface BgImageProps {
	$bgUrl: string;
}

export const RootWrapper = styled.div`
  position: relative;
  top: 65px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const BackgroundWrapper = styled.div`
  display: grid;
  grid: [hero-background] 1fr / [hero-background] 1fr;
  place-items: center;
  height: 550px;
`;

export const Picture = styled.picture`
  display: contents;
  margin-left: auto;
  margin-right: auto;
`;

export const HeroImageWrapper = styled.div`
  display: grid;
  grid-template: [hero-image] 1fr / [hero-image] 1fr;
  justify-items: center;
`;

export const Bridge = styled(Image)`
  display: inline-block;
  width: 100dvw;
  height: 120px;
  opacity: var(--bridge-opacity);
`;

export const Clouds = styled(Image)`
  display: inline-block;
  width: 100%;
  height: 200px;
  opacity: var(--clouds-opacity);

  animation: pan 100s linear infinite;
  will-change: background-position;
  @keyframes pan {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 1039px 0%;
    }
  }
`;

const panLoop = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-33.33333%); } 
`;

const panLoopRight = keyframes`
  0% { transform: translateX(-33.33333%); }
  100% { transform: translateX(0%); } 
`;

export const AnimationWindow = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden; // 트랙이 화면 밖으로 나가는 것을 숨김
  opacity: var(--clouds-opacity);
  z-index: 0;
  pointer-events: none;
  user-select: none;
  pointer-events: none;
`;

// 3. 옆으로 길게 늘어선 기차 (Track)
export const AnimationTrack = styled.div`
  display: flex; /* 이미지들을 가로로 나열 */
  width: max-content; /* 내용물(이미지들)의 전체 너비만큼 늘어남 */
  gap: 2rem;
  height: 100%;
  will-change: transform;
  
  // 애니메이션 적용
  animation: ${panLoop} 100s linear infinite;
`;

// 4. 비율을 유지하는 이미지 컴포넌트
export const AutoWidthImage = styled(Image)`
  height: 100%; /* 높이는 부모(200px)에 맞춤 */
  width: auto;  /* ★ 핵심: 너비는 이미지 비율에 맞춰서 알아서 늘어남 (잘림 방지) */
  max-width: none; /* Flex 안에서 이미지가 찌그러지는 것 방지 */
`;

export const CarImage = styled(Image)`
  width: auto;
  height: 100%; /* 높이는 부모(200px)에 맞춤 */
  max-width: none; /* Flex 안에서 이미지가 찌그러지는 것 방지 */
`;

export const BridgeWindow = styled.div`
  position: relative; // Grid 안에 배치되므로 relative 혹은 absolute
  width: 100vw;       // 화면 전체 너비
  height: 120px;      // 기존 Bridge 높이 유지
  overflow: hidden;   // 넘치는 부분 숨김
  opacity: var(--bridge-opacity);
  z-index: 1;         // 구름보다 앞에 있어야 한다면 조정
  pointer-events: none;
`;

// 2. 이미지를 담을 정적 트랙 (움직이지 않음)
export const BridgeTrack = styled.div`
  display: flex;      // 가로로 나열
  width: max-content; // 내용물만큼 너비 확보
  height: 100%;
`;

export const CarsWindow = styled.div`
  position: absolute;
  top: 235px;   // 기존 Cars의 top 위치 유지
  left: 0;
  width: 100%;
  height: 10px;
  overflow: hidden;
  opacity: var(--cars-opacity);
  pointer-events: none;
`;

// 3. Cars 전용 트랙 (애니메이션 속도 50s)
export const CarsTrack = styled.div`
  display: flex;
  gap: 2rem;
  width: max-content;
  height: 100%;
  will-change: transform;
  
  // Clouds(100s)보다 2배 빠름
  animation: ${panLoopRight} 75s linear infinite;
`;

export const Moon = styled(Image)<{ $opacity: string }>`
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: var(${(props) => props.$opacity});
`;

export const Cars = styled.span<BgImageProps>`
  background-repeat: repeat-x;
  position: absolute;
  z-index: -1;
  top: 241px;
  left: 0px;
  width: 100%;
  height: 100%;

  animation: pan-cars 50s linear infinite;
  will-change: background-position;

  background-image: url(${(props) => props.$bgUrl});
  opacity: var(--cars-opacity);
  @keyframes pan-cars {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 1554px 0%;
    }
  }
`;
export const LightShadow = styled.span`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: oklch(50.81% 0.191 29.05);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(--color-light-heroimage);
`;

export const DarkShadow = styled.span`
  position: relative;
  top: -28px;
  display: inline-block;
  width: 100%;
  height: 7px;
  background-color: oklch(15.29% 0.034 262.59 / 85%);
  mix-blend-mode: darken;
  filter: blur(10px);
  opacity: var(--color-dark-heroimage);
`;

export const DrakHeroImageWapper = styled.div<{ $isVisible: boolean }>`
  grid-area: hero-image;
  :root[data-color-theme='dark'] & {
    display: contents;
    content-visibility: visible;
  }
`;

export const LightHeroImageWapper = styled.div<{ $isVisible: boolean }>`
  grid-area: hero-image;
  :root[data-color-theme='light'] & {
    display: contents;
    content-visibility: visible;
  }
`;
