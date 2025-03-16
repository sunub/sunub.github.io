"use client";

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

export function ScrollHeader({ children }: { children: React.ReactNode }) {
  // const [isTouching, setIsTouching] = useState(false);

  // useEffect(() => {
  //   const contentStartLine = document.getElementById(
  //     "blog-main__content-startline"
  //   );
  //   if (!contentStartLine) return;
  //   const observer = new IntersectionObserver(
  //     (entires) => {
  //       const entry = entires[0];
  //       console.log(entry.isIntersecting);
  //     },
  //     {
  //       threshold: 0.5,
  //       rootMargin: "1500px 0px -100% 0px",
  //     }
  //   );

  //   observer.observe(contentStartLine);
  // }, []);

  // useEffect(() => {
  //   function checkPosition() {
  //     const scrollTrigger = document.getElementById(
  //       "blog-main__header-scroll-trigger"
  //     );
  //     const contentStartLine = document.getElementById(
  //       "blog-main__content-startline"
  //     );
  //     if (!scrollTrigger || !contentStartLine) return;

  //     const scrollRect = scrollTrigger.getBoundingClientRect();
  //     const contentRect = contentStartLine.getBoundingClientRect();
  //     console.log(scrollRect, contentRect);

  //     const verticalGap = Math.min(
  //       Math.abs(scrollRect.bottom - contentRect.top),
  //       Math.abs(scrollRect.top - contentRect.bottom)
  //     );

  //     if (verticalGap < 1) {
  //       console.log("touching");
  //       setIsTouching(true);
  //     }
  //   }

  //   window.addEventListener(
  //     "scroll",
  //     () => {
  //       requestAnimationFrame(checkPosition);
  //     },
  //     { passive: true }
  //   );

  //   return () => {
  //     window.removeEventListener("scroll", checkPosition);
  //   };
  // }, []);

  return (
    <HeaderWrapper id="blog-main__header-wrapper" $isTouching={false}>
      {children}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div<{ $isTouching: boolean }>`
  /* position: sticky;
  top: 0px;
  z-index: 10000; */

  padding-top: ${({ $isTouching }) => ($isTouching ? "32px" : "60px")};
  transition: padding-top 300ms ease-in-out;
`;
