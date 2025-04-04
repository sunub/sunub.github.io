"use client";

import Link from "next/link";
import * as Styled from "../Header.style";
import React, { memo } from "react";
import useToggle from "@/hooks/use-toggle";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { CpuIcon, GlobeIcon, BinaryIcon, PiIcon } from "lucide-react";

function Navigation() {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const portalRef = React.useRef<HTMLDivElement | null>(null);
  const [isOpen, toggleOpen] = useToggle(false);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      const currTarget = e.target as Node;
      if (
        portalRef.current &&
        !portalRef.current.contains(currTarget) &&
        !buttonRef.current?.contains(currTarget)
      ) {
        toggleOpen();
      }
    }

    if (isOpen) {
      window.addEventListener("click", handleClick);
    } else {
      window.removeEventListener("click", handleClick);
    }

    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <NavigationWrapper id="blog-main__post-navigation" className="pl-4">
      <Styled.PostNaviation>
        <Button
          disabled={isOpen}
          onClick={toggleOpen}
          ref={buttonRef}
          className="select-none"
        >
          카테고리들
          <UnderLineWaveIcon />
          <PortalRef id="post-dropdown-portal" ref={portalRef} />
        </Button>
        {isOpen &&
          createPortal(
            <DropDownMenu toggleOpen={toggleOpen} />,
            portalRef.current!
          )}
      </Styled.PostNaviation>
    </NavigationWrapper>
  );
}

function DropDownMenu({ toggleOpen }: { toggleOpen: () => void }) {
  return (
    <DropDownMenuWrapper>
      <LinkTag href={"/post/cs"} onClick={toggleOpen}>
        <CpuIcon size={16} />
        cs
      </LinkTag>
      <LinkTag href={"/post/web"} onClick={toggleOpen}>
        <GlobeIcon size={16} />
        web
      </LinkTag>
      <LinkTag href={"/post/code"} onClick={toggleOpen}>
        <BinaryIcon size={16} />
        code
      </LinkTag>
      <LinkTag href={"/post/algorithm"} onClick={toggleOpen}>
        <PiIcon size={16} />
        algorithm
      </LinkTag>
    </DropDownMenuWrapper>
  );
}

const NavigationWrapper = styled.nav`
  font-size: 1.25rem;
`;

const UnderLineWaveIcon = memo(
  ({
    width = 3,
    scale = "1.25, 1",
    length = 0.6,
    delay = 0.5,
  }: {
    width?: number;
    scale?: string;
    length?: number;
    delay?: number;
  }) => {
    return (
      <UnderLineWaveSVG
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="11"
        fill="none"
      >
        <UnderLineWavePath
          d="M3 5.19c4-1.69 14-4.31 16.5 0s4.833 3.747 8.5 0c2.684-2.742 6.472-3.093 9.5 0 3.667 3.747 6.26 3.31 9.5 0 2.633-2.69 6 3.31 11 0 3.459-2.29 5.333 3.747 9 0 3.667-3.746 5.292 5.81 13 0 4.896-3.69 5.248 4.566 11.5 0"
          strokeWidth={width}
          transform={`scale(${scale})`}
          pathLength={length}
          $delay={delay}
        />
      </UnderLineWaveSVG>
    );
  }
);

const UnderLineWaveSVG = styled.svg`
  /* position: absolute;
  top: 35px;
  left: -5px; */

  stroke: var(--color-text);
  stroke-width: 2.5;
  stroke-linecap: round;
`;

const UnderLineWavePath = styled.path<{ $delay: number }>`
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1);

  stroke-dashoffset: 1;
  transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
  transition-duration: 350ms;
  stroke: color-mix(in oklch, var(--color-text), transparent);
`;

const Button = styled.button`
  :hover {
    ${UnderLineWavePath} {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
`;

const PortalRef = styled.div`
  position: absolute;
  z-index: 1000;
`;

const DropDownMenuWrapper = styled.div`
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 32px;
  border-radius: 12px;
  will-change: transform;
  background-color: var(--color-frontWave);
  border-radius: 1rem;
  padding: 1rem 1.5rem;

  filter: drop-shadow(0 -5.9px 2.7px oklch(21.18% 0 12 / 0.025))
    drop-shadow(0 -1.2px 6.9px oklch(21.18% 0 12 / 0.025))
    drop-shadow(0 8px 14.2px oklch(21.18% 0 12 / 0.05))
    drop-shadow(0 21.9px 29.2px oklch(21.18% 0 12 / 0.05))
    drop-shadow(0 49px 80px oklch(21.18% 0 12 / 0.07));

  ::before {
    width: 32px;
    height: 14px;
    background-color: var(--color-frontWave);
    content: "";
    position: absolute;
    top: -14px;
    left: 41px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
`;

const LinkTag = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 200ms cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    background: color-mix(in oklch, var(--color-highlight), transparent 80%);
  }
`;

export default Navigation;
