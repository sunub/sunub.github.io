"use client";

import { MDXCompoRoot } from "@/MDXContents/shared/components/MDXCompoRoot/ui/MDXCompoRoot";
import { imporveLoopByTimeout } from "../utils/eventHandler";
import { Content } from "./Content";

function BlockingContent() {
	return (
		<MDXCompoRoot>
			<Content loopCallback={imporveLoopByTimeout} />
		</MDXCompoRoot>
	);
}

export { BlockingContent };
