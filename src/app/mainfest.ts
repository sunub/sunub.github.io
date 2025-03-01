import type { MetadataRoute } from "next";

export default function mnifest(): MetadataRoute.Manifest {
  return {
    name: "sunub blog",
    short_name: "sunub",
    description: "개발자 sunub의 블로그입니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdf3f1",
    theme_color: "#fecece",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
  };
}
