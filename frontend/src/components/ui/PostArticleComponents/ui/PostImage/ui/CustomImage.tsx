import { memo } from 'react';
import { isImageLoaded, markImageAsLoaded } from '../model/cache';
import { CustomImageStyle } from '../style';

interface CustomImageProps {
  src: string;
  alt: string;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  type?: 'responsive' | 'wide';
  additionalStyle?: string;
  quality?: number;
  priority?: boolean;
}

const CustomImage = memo(
  ({ src, alt, isLoading, setIsLoading, type = 'responsive', quality = 75, priority = false }: CustomImageProps) => (
    <CustomImageStyle
      src={src}
      alt={alt}
      {...(type === 'responsive'
        ? {
            width: 800,
            height: 500,
            style: { width: '100%', height: 'auto' },
          }
        : { fill: true })}
      $isLoading={isLoading}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      quality={quality}
      sizes="
        (max-width: 640px) 100vw,
        (max-width: 1024px) 75vw,
        (max-width: 1280px) 50vw,
        33vw
      "
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAvM1P7YAAAAASUVORK5CYII="
      onLoad={() => {
        if (!isImageLoaded(src)) {
          markImageAsLoaded(src);
          setIsLoading(false);
        }
      }}
    />
  ),
  (prev, next) =>
    prev.src === next.src &&
    prev.alt === next.alt &&
    prev.priority === next.priority &&
    prev.type === next.type &&
    prev.additionalStyle === next.additionalStyle &&
    prev.isLoading === next.isLoading &&
    prev.quality === next.quality
);

CustomImage.displayName = 'CustomImage';

export { CustomImage };
