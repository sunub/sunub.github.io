import React, { RefObject } from "react";

interface ReturnValue {
  ref: RefObject<HTMLDivElement | null>;
  locInfo: DOMRect | null;
}

function useMeasure(isMounted: boolean): ReturnValue {
  const ref = React.useRef<HTMLDivElement>(null);
  let locInfo: DOMRect | null = null;

  if (isMounted && ref.current) {
    locInfo = ref.current.getBoundingClientRect();
  }

  return { ref, locInfo };
}

export default useMeasure;
