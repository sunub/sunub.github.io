import { memo } from "react";
import Image from "next/image";
import { markImageAsLoaded, isImageLoaded } from "../model/cache";

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
      <Image
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
            ${isLoading ? "opacity-0" : "opacity-100"}
            ${additionalStyle ?? ""}
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

export { CustomImage };
