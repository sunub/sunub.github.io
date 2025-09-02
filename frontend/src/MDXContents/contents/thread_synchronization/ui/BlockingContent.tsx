'use client';

import { MDXCompoRoot } from '@/MDXContents/shared/components/MDXCompoRoot/ui/MDXCompoRoot';
import { Content } from './Content';
import { handleLoopStart } from '../utils/eventHandler';

function BlockingContent() {
  return (
    <MDXCompoRoot>
      <Content loopCallback={handleLoopStart} />
    </MDXCompoRoot>
  );
}

export { BlockingContent };
