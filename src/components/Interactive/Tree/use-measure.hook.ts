import React, { RefObject } from "react";

interface ReturnValue {
	ref: RefObject<HTMLDivElement>;
	locInfo: DOMRect;
}

function useMeasure(isMounted: boolean): ReturnValue {
	const ref = React.useRef<HTMLDivElement>(null);
	let locInfo: DOMRect | any;

	if (isMounted) {
		locInfo = ref.current?.getBoundingClientRect();
	}

	return { ref, locInfo };
}

export default useMeasure;
