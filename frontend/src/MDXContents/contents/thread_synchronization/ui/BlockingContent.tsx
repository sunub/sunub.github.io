"use client";

import { MDXCompoRoot } from "@/MDXContents/shared/components/MDXCompoRoot/ui/MDXCompoRoot";
import { handleLoopStart } from "../utils/eventHandler";
import { Content } from "./Content";

function BlockingContent() {
	return (
		<MDXCompoRoot>
			<Content loopCallback={handleLoopStart} />
		</MDXCompoRoot>
	);
}

export { BlockingContent };
