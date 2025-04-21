"use client";

import { imporveLoopByTimeout } from "../utils/eventHandler";
import { MDXCompoRoot } from "@/MDXContents/shared/components/MDXCompoRoot/ui/MDXCompoRoot";
import { Content } from "./Content";

function BlockingContent() {
  return (
    <MDXCompoRoot>
      <Content loopCallback={imporveLoopByTimeout} />
    </MDXCompoRoot>
  );
}

export { BlockingContent };
