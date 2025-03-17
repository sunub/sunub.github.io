"use client";

import { imporveLoopByTimeout } from "../utils/eventHandler";
import { MDXCompoRoot } from "@/MDXComponents/shared/components/MDXCompoRoot/ui/MDXCompoRoot";
import { Content } from "./Content";

function BlockingContent() {
  return (
    <MDXCompoRoot>
      <Content loopCallback={imporveLoopByTimeout} />
    </MDXCompoRoot>
  );
}

export { BlockingContent };
