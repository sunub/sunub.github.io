"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Container = styled.div`
  width: calc(100vw);
  position: relative;
  left: calc(50%);
  margin-left: calc(-50vw);

  @media (min-width: 770px) {
    left: calc(50% + 48px);
    padding-right: 6.5rem;
  }
  @media (min-width: 950px) {
    padding-right: 0rem;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0px auto 48px;
  padding: 0px 24px;
  max-width: 1000px;
`;

function PostContentImage({ src, alt }) {
  const url = new URL(src, "https://sunub.vercel.app");
  const searchParams = url.searchParams;

  return (
    <Container>
      <ImageWrapper>
        <Image
          src={url.pathname}
          width={parseInt(searchParams.get("width"), 10)}
          height={parseInt(searchParams.get("height"), 10)}
          alt={alt}
          sizes="100vw"
          priority={true}
        />
      </ImageWrapper>
    </Container>
  );
}

export default PostContentImage;
