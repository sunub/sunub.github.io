"use client";

import Image from "next/image";

type ImageLayout = "default" | "wide" | "full" | "float-left" | "float-right";

interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  layout?: ImageLayout;
  caption?: string; // 이미지 캡션 추가
}

function PostImage({ src, alt, priority = false, caption }: PostImageProps) {
  return (
    <figure className="relative max-w-2xl mx-auto my-8">
      <div className="relative aspect-auto w-full min-h-[300px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          quality={75}
          sizes="(max-width: 768px) 100vw, 768px"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAvM1P7YAAAAASUVORK5CYII="
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
