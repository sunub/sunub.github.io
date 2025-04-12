"use client";

import React from "react";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import { Trash2 } from "lucide-react";
import { UnderLineWaveIcon } from "./UnderLineWaveIcon";
import {
  ContentHeader,
  SearchInput as StyledInput,
  ClearIconButton,
} from "../styles/index";

interface SearchHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  onClear: () => void;
}

export function SearchHeader({
  query,
  onQueryChange,
  onClear,
}: SearchHeaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <ContentHeader>
      <VisuallyHidden>검색창</VisuallyHidden>
      <StyledInput
        type="text"
        placeholder="찾고 싶은 주제를 검색해주세요."
        autoFocus
        value={query}
        onChange={handleChange}
      />
      <UnderLineWaveIcon />
      <ClearIconButton onClick={onClear}>
        <VisuallyHidden>검색어 지우기</VisuallyHidden>
        <Trash2 />
      </ClearIconButton>
    </ContentHeader>
  );
}
