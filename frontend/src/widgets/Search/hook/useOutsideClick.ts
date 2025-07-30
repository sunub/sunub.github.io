"use client";

import { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, callback]);
}
