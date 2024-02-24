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
              {isOpen && createPortal(<DropDownMenu />, portalRef.current!)}
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

function DropDownMenu() {
  return (
    <DropDownMenuWrapper>
      <Menu>
        <Link href={"/cs"}>cs</Link>
        <Link href={"/web"}>web</Link>
      </Menu>
      <Menu>
        <Link href={"/code"}>code</Link>
        <Link href={"/algorithm"}>algorithm</Link>
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
  background-color: red;
  padding: 1rem;
  gap: 1rem;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Navigation;
