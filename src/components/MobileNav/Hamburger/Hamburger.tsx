"use client";

import React from "react";
import * as Styled from "./Hamburger.style";

interface HamburgerProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

function Hamburger(props: HamburgerProps) {
  const { isOpen, toggleOpen } = props;

  return (
    <Styled.Btn
      id="hamburger-btn"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      onClick={toggleOpen}
    >
      <Icon />
    </Styled.Btn>
  );
}

function Icon() {
  return (
    <Styled.Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Styled.Open>
        <path
          id="top"
          d="M6.12 9.5L25.88 9.5"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          id="bottom"
          d="M6.12 23H25.88"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path id="center" d="M3 16H29" strokeWidth="4" strokeLinecap="round" />
      </Styled.Open>
      <Styled.Close>
        <Styled.Close
          id="Rectangle 91"
          x="2.5"
          y="2.5"
          width="27"
          height="27"
          rx="13.5"
          strokeWidth="2"
        />
        <Styled.Cross1
          id="cross2"
          d="M9 16H23.6601"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Styled.Cross2
          id="cross1"
          d="M9 16H23.6601"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </Styled.Close>
    </Styled.Svg>
  );
}

export default Hamburger;
