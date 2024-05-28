import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

export default function ImageCompo(props: ImageProps) {
  return (
    <span className="image_wrapper">
      <Image
        sizes="(max-width: 886px) 100vw, 856px"
        width={450}
        height={200}
        objectFit="contain"
        className={"image_compo"}
        quality={70}
        {...props}
        priority
      />
    </span>
  );
}
