"use client";

import useToggle from "@/hooks/use-toggle";
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";
import styled, { keyframes } from "styled-components";
import { isImageLoaded, markImageAsLoaded } from "../model/cache";
import Image from "next/image";
import { Caption, Skeleton, StyledImage } from "../style";

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

const CustomImage = memo(
  ({
    src,
    alt,
    isLoading,
    setIsLoading,
    type = "responsive",
    additionalStyle,
    quality = 75,
    priority = false,
  }: {
    src: string;
    alt: string;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    type?: "responsive" | "wide";
    additionalStyle?: string;
    quality?: number;
    priority?: boolean;
  }) => {
    return (
      <StyledImage
        src={src}
        alt={alt}
        {...(type === "responsive"
          ? {
              width: 800,
              height: 500,
              style: { width: "100%", height: "auto" },
            }
          : { fill: true })}
        className={`
            object-contain
            transition-opacity duration-300
          `}
        $isLoading={isLoading}
        $zoomed={type === "wide"}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        quality={quality}
        sizes={`
            (max-width: 640px) 100vw,
            (max-width: 1024px) 75vw,
            (max-width: 1280px) 50vw,
            33vw
          `}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAvM1P7YAAAAASUVORK5CYII="
        onLoad={() => {
          if (!isImageLoaded(src)) {
            markImageAsLoaded(src);
            setIsLoading(false);
          }
        }}
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.src === nextProps.src &&
      prevProps.alt === nextProps.alt &&
      prevProps.priority === nextProps.priority &&
      prevProps.type === nextProps.type &&
      prevProps.additionalStyle === nextProps.additionalStyle &&
      prevProps.isLoading === nextProps.isLoading &&
      prevProps.quality === nextProps.quality
    );
  }
);

const PostImage = memo(
  ({ src, alt, priority = false, caption }: PostImageProps) => {
    const [isLoading, setIsLoading] = useState(!isImageLoaded(src));
    const { ref, inView } = useInView({
      threshold: 0,
      triggerOnce: true,
      rootMargin: "200px 0px",
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

      if (isZoomIn) {
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("keydown", handleKeyDown);
        };
      }
    }, [isZoomIn, toggleZoomStatus]);

    return (
      <Fragment>
        <Figure ref={ref} onClick={toggleZoomStatus}>
          <ImageWrapper ref={imageRef}>
            {(inView || priority) && (
              <>
                {isLoading && <Skeleton />}
                {/* priority를 inView와 결합하여 전달 */}
                <CustomImage
                  src={src}
                  alt={alt}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  priority={priority && inView}
                />
              </>
            )}
          </ImageWrapper>
          {caption && <Caption>{caption}</Caption>}
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
            document.body
          )}
      </Fragment>
    );
  }
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
