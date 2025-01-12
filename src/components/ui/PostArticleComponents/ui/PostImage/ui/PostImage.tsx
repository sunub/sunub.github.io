"use client";

import useToggle from "@/hooks/use-toggle";
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";
import styled, { keyframes } from "styled-components";
import { isImageLoaded } from "../model/cache";
import { CustomImage } from "./CustomImage";

type ImageLayout = "default" | "wide" | "full" | "float-left" | "float-right";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  layout?: ImageLayout;
  caption?: string;
}

const PostImage = memo(
  ({ src, alt, priority = false, caption }: PostImageProps) => {
    const [isLoading, setIsLoading] = useState(!isImageLoaded(src));
    const { ref, inView } = useInView({
      threshold: 0,
      triggerOnce: true,
      rootMargin: "50px 0px",
    });
    const [isZoomIn, toggleZoomStatus] = useToggle();
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (isZoomIn) {
          toggleZoomStatus();
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isZoomIn) {
          toggleZoomStatus();
        }
      };

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isZoomIn]);

    return (
      <Fragment>
        <Figure ref={ref} onClick={toggleZoomStatus}>
          <ImageWrapper ref={imageRef}>
            {(inView || priority) && (
              <>
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse z" />
                )}
                <CustomImage
                  src={src}
                  alt={alt}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </>
            )}
          </ImageWrapper>
          {caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {caption}
            </figcaption>
          )}
        </Figure>
        {isZoomIn &&
          createPortal(
            <ZoomImageContainer onClick={toggleZoomStatus}>
              <ZoomedImage>
                <CustomImage
                  src={src}
                  alt={alt}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  type="wide"
                  additionalStyle="cursor-zoom-out z-[10000]"
                />
              </ZoomedImage>
              <BlurredBackground />
            </ZoomImageContainer>,
            document.body,
          )}
      </Fragment>
    );
  },
);

const Figure = styled.figure`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 350px;
  aspect-ratio: auto;
  cursor: zoom-in;
`;

const ZoomImageContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
`;

const ZoomedImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 90%;
  max-height: 90%;
  aspect-ratio: auto;
  cursor: zoom-out;
`;

const BlurredBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--color-background);
  cursor: zoom-out;
`;

export { PostImage };
