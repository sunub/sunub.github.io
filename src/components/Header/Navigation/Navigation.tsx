"use client";

import Link from "next/link";
import * as Styled from "../Header.style";
import Spacer from "@/components/Spacer";
import React from "react";
import useToggle from "@/hooks/use-toggle";
import styled from "styled-components";
import { createPortal } from "react-dom";

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
    <React.Fragment>
      <nav>
        <Styled.NavigationWrapper>
          {/* <Styled.NavigationItem>
            <Link href={"/latest"}>latest</Link>
          </Styled.NavigationItem> */}
          <Styled.NavigationItem>
            <Styled.PostNaviation>
              <Link href={"/post"}>post</Link>
              <Spacer axis={"horizonal"} size={8} />
              <button onClick={toggleOpen} ref={buttonRef}>
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.73438 1.98438L6.32019 6.59402C7.10063 7.37852 8.36978 7.38018 9.15226 6.59771L13.7656 1.9845"
                    stroke="var(--color-navlink)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <PortalRef id="post-dropdown-portal" ref={portalRef} />
              {isOpen &&
                createPortal(
                  <DropDownMenu toggleOpen={toggleOpen} />,
                  portalRef.current!,
                )}
            </Styled.PostNaviation>
          </Styled.NavigationItem>
          {/* <Styled.NavigationItem>
            <Link href={"/about"}>about</Link>
          </Styled.NavigationItem> */}
        </Styled.NavigationWrapper>
      </nav>
    </React.Fragment>
  );
}

function DropDownMenu({ toggleOpen }: { toggleOpen: () => void }) {
  return (
    <DropDownMenuWrapper>
      <LinkTag href={"/cs"} onClick={toggleOpen}>
        cs
      </LinkTag>
      <LinkTag href={"/web"} onClick={toggleOpen}>
        web
      </LinkTag>
      <LinkTag href={"/code"} onClick={toggleOpen}>
        code
      </LinkTag>
      <LinkTag href={"/algorithm"} onClick={toggleOpen}>
        algorithm
      </LinkTag>
    </DropDownMenuWrapper>
  );
}

const PortalRef = styled.div`
  position: absolute;
  top: calc(40px + 1rem);
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
    left: 49px;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
`;

const LinkTag = styled(Link)`
  &:hover {
    font-weight: 700;
    color: var(--color-highlight);
  }
`;

export default Navigation;
