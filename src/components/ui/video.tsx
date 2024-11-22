"use client";

import React from "react";
import styled from "styled-components";

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

const Video = ({
  src,
  caption,
  maxWidth = 528,
}: {
  src: string;
  caption: string;
  maxWidth: number;
  aspectRatio: string;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  React.useEffect(() => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.play() : videoRef.current.pause();
  }, [isPlaying]);

  return (
    <div
      className="relative pb-6"
      style={
        {
          "--max-width": `${maxWidth}px`,
          outline: "1px solid var(--color-content-outline)",
        } as React.CSSProperties
      }
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        src={src}
        className="w-full h-full object-cover"
        ref={videoRef}
      />
      <button
        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
        onClick={togglePlay}
      >
        {isPlaying ? <PauseSvg /> : <PlaySvg />}
      </button>
    </div>
  );
};

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
        className="feather feather-play"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
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
        className="feather feather-pause"
      >
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
    </VideoSvgContainer>
  );
}

export default Video;
