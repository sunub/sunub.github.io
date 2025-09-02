'use client';

import { VisuallyHidden } from '@/components/VisuallyHidden';
import { ResultItem } from '../styles/index';

export function NoResult() {
  return (
    <ResultItem
      data-testid="search-no-results"
      key="no-results"
      style={{
        pointerEvents: 'none',
      }}
    >
      <VisuallyHidden>{'어떠한 결과도 발견 되지 않았습니다.'}</VisuallyHidden>
      {'어떠한 결과도 발견 되지 않았습니다.'}
    </ResultItem>
  );
}
