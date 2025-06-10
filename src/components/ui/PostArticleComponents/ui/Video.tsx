"use client";

import React from "react";
import styled from "styled-components";

const VideoWrapper = styled.div<{ maxWidth: number }>`
  position: relative;
  padding-bottom: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  outline: 1px solid var(--color-content-outline);
  max-width: ${(props) => props.maxWidth}px;
  width: 100%;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const OverlayButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 150ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const VideoSvgContainer = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: calc(50% - 32px);
    top: calc(50% - 32px);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    background-color: rgba(0, 0, 0, 0.55);
  }

  svg {
    position: relative;
    z-index: 2;
    color: white;
  }
`;

function PlaySvg() {
  return (
    <VideoSvgContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    </VideoSvgContainer>
  );
}

function PauseSvg() {
  return (
    <VideoSvgContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
      </svg>
    </VideoSvgContainer>
  );
}

const Video = ({
  src,
  caption,
  maxWidth = 528,
}: {
  src: string;
  caption: string;
  maxWidth?: number;
  aspectRatio?: string;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  React.useEffect(() => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.play() : videoRef.current.pause();
  }, [isPlaying]);

  return (
    <VideoWrapper maxWidth={maxWidth}>
      <StyledVideo loop muted playsInline src={src} ref={videoRef}>
        <source src={src} type="video/mp4" />
      </StyledVideo>

      <OverlayButton
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? <PauseSvg /> : <PlaySvg />}
      </OverlayButton>
    </VideoWrapper>
  );
};

export { Video };
