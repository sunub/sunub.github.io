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
  const imageRef = useRef<HTMLDivElement>(null);
  return (
    <figure className="relative max-w-2xl mx-auto my-2">
      <div ref={imageRef} className="relative aspect-auto w-full min-h-[300px]">
        <Image
          src={src}
          alt={alt}
          fill
          className={`
                object-contain
                transition-opacity duration-300
                ${isLoading ? "blur-sm" : "blur-none"}
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
          onLoad={() => setIsLoading(false)}
        />
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
