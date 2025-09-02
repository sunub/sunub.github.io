'use client';

import { MDXCompoRoot } from '@/MDXContents/shared/components/MDXCompoRoot/ui/MDXCompoRoot';
import { Content } from './Content';
import { imporveLoopByTimeout } from '../utils/eventHandler';

function BlockingContent() {
  return (
    <MDXCompoRoot>
      <Content loopCallback={imporveLoopByTimeout} />
    </MDXCompoRoot>
  );
}

export { BlockingContent };
