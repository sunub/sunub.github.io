"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type ImageLayout = "default" | "wide" | "full" | "float-left" | "float-right";

interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  layout?: ImageLayout;
  caption?: string;
  quality?: number;
}

function PostImage({
  src,
  alt,
  priority = false,
  caption,
  quality = 75,
}: PostImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: "50px 0px",
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        const { width } = imageRef.current.getBoundingClientRect();
        const aspectRatio = 16 / 9;
        setDimensions({
          width: Math.round(width),
          height: Math.round(width / aspectRatio),
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <figure className="relative max-w-2xl mx-auto my-8" ref={ref}>
      <div ref={imageRef} className="relative aspect-auto w-full min-h-[300px]">
        {(inView || priority) && (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={src}
              alt={alt}
              fill
              className={`
                object-contain
                transition-opacity duration-300
                ${isLoading ? "opacity-0" : "opacity-100"}
              `}
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
              onLoadingComplete={() => setIsLoading(false)}
            />
          </>
        )}
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export { PostImage };
