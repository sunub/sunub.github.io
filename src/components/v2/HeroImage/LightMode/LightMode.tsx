import React from "react";
import * as Styled from "../HeroImage.style";

import bridge from "@/public/image/hero-image__light-bridge.avif";
import clouds from "@/public/image/hero-image__light-clouds.avif";
import baseImage from "@/public/image/hero-image__light-base-scene.avif";
import softClouds from "@/public/image/hero-image__light-clouds-soft.avif";
import { Theme } from "type";

function LightMode({ colorTheme }: { colorTheme: Theme }) {
  return (
    <React.Fragment>
<<<<<<< HEAD
      <Styled.Picture>
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          src={clouds}
          alt={"메인 히어로 이미지중 구름"}
          style={{
            zIndex: 3,
          }}
        />
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          src={softClouds}
          alt={"메인 히어로 이미지중 뒷 배경 투명한 구름"}
          style={{
=======
      <picture style={{ display: "contents" }}>
        <Styled.HeroImage
          src={clouds}
          alt={"메인 히어로 이미지중 구름"}
          style={{
            opacity: `${colorTheme === "light" ? 1 : 0}`,
            transition: "opacity 350ms ease 0s",
            zIndex: 3,
          }}
        />
        <Styled.HeroImage
          src={softClouds}
          alt={"메인 히어로 이미지중 뒷 배경 투명한 구름"}
          style={{
            opacity: `${colorTheme === "light" ? 1 : 0}`,
            transition: "opacity 350ms ease 0s",
>>>>>>> refs/remotes/origin/sunub
            filter: "blur(5px)",
            mixBlendMode: "soft-light",
            zIndex: 1,
          }}
        />
<<<<<<< HEAD
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          src={baseImage}
          alt={"메인 히어로 이미지중 메인"}
          style={{
            zIndex: 2,
          }}
        />
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
=======
        <Styled.HeroImage
          src={baseImage}
          alt={"메인 히어로 이미지중 메인"}
          style={{
            opacity: `${colorTheme === "light" ? 1 : 0}`,
            transition: "opacity 350ms ease 0s",
            zIndex: 2,
          }}
        />
        <Styled.HeroImage
>>>>>>> refs/remotes/origin/sunub
          src={bridge}
          alt={"메인 히어로 이미지중 물에 비친 다리"}
          $mirrored={true}
          style={{
<<<<<<< HEAD
            zIndex: 2,
          }}
        />
      </Styled.Picture>
=======
            opacity: `${colorTheme === "light" ? 1 : 0}`,
            transition: "opacity 350ms ease 0s",
            zIndex: 2,
          }}
        />
      </picture>
>>>>>>> refs/remotes/origin/sunub
    </React.Fragment>
  );
}

export default LightMode;
