"use client";

import styled, { keyframes } from "styled-components";
import { memo } from "react";
import { VisuallyHidden } from "@/components/VisuallyHidden";

function SearchButton({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) {
  return (
    <StyledSearchButton
      disabled={isOpen}
      onClick={toggleOpen}
      aria-label="Search"
    >
      <VisuallyHidden>검색 열기 버튼</VisuallyHidden>
      <SearchIcon />
    </StyledSearchButton>
  );
}

const SearchIcon = memo(() => {
  return (
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
  );
});

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(40deg);
  }

  80% {
    transform  : rotate(-10deg);
  }

  100% {
    transform: rotate(0deg);
  }
`;

const scale = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
`;
const SearchSvg = styled.svg``;

const StyledSearchButton = styled.button`
  width: fit-content;
  height: fit-content;
  outline: none;
  outline-offset: 2px;

  :hover {
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    ${SearchSvg} {
      & > path {
        transform-origin: center;
        animation: ${rotate} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      & > circle {
        transform-origin: center;
        animation: ${scale} 300ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }
    }
  }
`;

export { SearchButton };
