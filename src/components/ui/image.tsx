import Image from "next/image";
import { getImgSrc } from "../../utils/misc";

type Params = {
  imageId: string;
  altText: string;
};

export default function Img(params: Params) {
  const { imageId, altText } = params;

  return (
    <span className="image_wrapper">
      <Image
        sizes="(max-width: 886px) 100vw, 856px"
        width={450}
        height={200}
        src={imageId}
        alt={altText}
        className="image_comp"
        quality={70}
        priority
      />
    </span>
  );
}
