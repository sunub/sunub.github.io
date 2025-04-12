"use client";

import { useCallback } from "react";
import { gsap } from "gsap";

export function useAnimations(elementRef: React.RefObject<HTMLElement>) {
  const initOpenAnimation = useCallback(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [elementRef]);

  const closeAnimation = useCallback(() => {
    if (!elementRef.current) return Promise.resolve();

    return gsap.to(elementRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.2,
    });
  }, [elementRef]);

  return {
    initOpenAnimation,
    closeAnimation,
  };
}
