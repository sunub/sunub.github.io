import { getImgSrc } from "../../utils/misc";

type Params = {
  imageId: string;
  altText: string;
};

export default function Img(params: Params) {
  const { imageId, altText } = params;

  return (
    <span className="image_wrapper">
      <img
        src={getImgSrc(imageId)}
        alt={altText}
        className="image_comp"
        width={450}
        height={200}
      />
    </span>
  );
}
