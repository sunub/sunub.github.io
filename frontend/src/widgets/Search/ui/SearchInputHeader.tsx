'use client';

import { Trash2 } from 'lucide-react';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import { UnderLineWaveIcon } from './UnderLineWaveIcon';
import { useSearch } from '../hook/useSearch';
import { ClearIconButton, ContentHeader, SearchInput as StyledInput } from '../styles/index';

interface SearchInputHeaderProps {
  isExpanded: boolean;
  listboxId: string;
}

export function SearchInputHeader({ isExpanded, listboxId }: SearchInputHeaderProps) {
  const { query, handleQueryChange, clearSearch } = useSearch();

  return (
    <ContentHeader data-slot="search-dialog-header">
      <VisuallyHidden>검색창</VisuallyHidden>
      <StyledInput
        id="search-input"
        aria-controls={listboxId}
        role="combobox"
        aria-expanded={isExpanded}
        aria-label="검색창"
        type="text"
        placeholder="찾고 싶은 주제를 검색해주세요."
        autoComplete="off"
        autoFocus
        value={query}
        onChange={handleQueryChange}
      />
      <UnderLineWaveIcon />
      <ClearIconButton aria-label="검색어 지우기" onClick={clearSearch}>
        <Trash2 aria-hidden={true} />
      </ClearIconButton>
    </ContentHeader>
  );
}
