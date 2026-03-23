"use client";

import { memo } from "react";
import styled from "styled-components";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import {
	HeaderActionIconWrapper,
	headerActionButtonStyles,
	headerActionIconWiggle,
} from "@/shared/style/HeaderActionButton";

const SearchIcon = memo(() => {
	return (
		<SearchIconWrapper aria-hidden="true">
			<SearchSvg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="lucide lucide-search-icon lucide-search"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.3-4.3" />
			</SearchSvg>
		</SearchIconWrapper>
	);
});
SearchIcon.displayName = "SearchIcon";

const SearchButton = memo(
	({ isOpen, toggleOpen }: { isOpen: boolean; toggleOpen: () => void }) => {
		return (
			<StyledSearchButton
				type="button"
				disabled={isOpen}
				onClick={toggleOpen}
				aria-label="검색"
			>
				<VisuallyHidden>검색</VisuallyHidden>
				<SearchIcon />
			</StyledSearchButton>
		);
	},
);

SearchButton.displayName = "SearchButton";

const SearchIconWrapper = styled(HeaderActionIconWrapper)``;

const SearchSvg = styled.svg`
  display: block;
  inline-size: 100%;
  block-size: 100%;
  overflow: visible;
  pointer-events: none;
`;

const StyledSearchButton = styled.button`
  ${headerActionButtonStyles}
  z-index: 10000;

  &:is(:hover, :focus-visible) ${SearchIconWrapper} {
    animation: ${headerActionIconWiggle} 420ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:disabled {
    cursor: default;
    color: var(--color-text);
    background-color: transparent;
    transform: translateY(0);
  }
`;

export { SearchButton };
