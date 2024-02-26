"use client";

import Link from "next/link";
import * as Styled from "../Header.style";
import Spacer from "@/components/Spacer";
import React from "react";
import useToggle from "@/hooks/use-toggle";
import styled from "styled-components";
import { createPortal } from "react-dom";

function Navigation() {
  const portalRef = React.useRef(null);
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <React.Fragment>
      <nav>
        <Styled.NavigationWrapper>
          <Styled.NavigationItem>
            <Link href={"/latest"}>latest</Link>
          </Styled.NavigationItem>
          <Styled.NavigationItem>
            <Styled.PostNaviation>
              <Link href={"/post"}>post</Link>
              <Spacer axis={"horizonal"} size={8} />
              <button onClick={toggleOpen}>
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
          <Styled.NavigationItem>
            <Link href={"/about"}>about</Link>
          </Styled.NavigationItem>
        </Styled.NavigationWrapper>
      </nav>
    </React.Fragment>
  );
}

function DropDownMenu({ toggleOpen }: { toggleOpen: () => void }) {
  return (
    <DropDownMenuWrapper>
      <Menu>
        <Link href={"/cs"} onClick={toggleOpen}>
          cs
        </Link>
        <Link href={"/web"} onClick={toggleOpen}>
          web
        </Link>
      </Menu>
      <Menu>
        <Link href={"/code"} onClick={toggleOpen}>
          code
        </Link>
        <Link href={"/algorithm"} onClick={toggleOpen}>
          algorithm
        </Link>
      </Menu>
    </DropDownMenuWrapper>
  );
}

const PortalRef = styled.div`
  position: absolute;
  top: calc(40px + 1rem);
  z-index: 1000;
`;

const DropDownMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--color-frontWave);
  border-radius: 1rem;
  padding-left: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-right: 2rem;
  gap: 2rem;
  filter: drop-shadow(
      0 -5.9px 2.7px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.025)
    )
    drop-shadow(
      0 -1.2px 6.9px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.025)
    )
    drop-shadow(
      0 8px 14.2px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.05)
    )
    drop-shadow(
      0 21.9px 29.2px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.05)
    )
    drop-shadow(
      0 49px 80px hsl(var(--dropdown-shadow-color, 0deg 0% 0%) / 0.07)
    );

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

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Navigation;
