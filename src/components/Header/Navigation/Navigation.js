"use client";

import React from "react";
import styled from "styled-components";
import * as Icons from "../icon/Icons";
import { animated } from "@react-spring/web";
import Link from "next/link";

const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AnimateIcon = styled(animated.span)`
  width: 64px;
  height: 64px;

  border: 1px solid var("--default-border-color");
<<<<<<< HEAD
=======
  box-shadow: var(--short-shadow);
>>>>>>> dev-v2
  border-radius: 16px;
  background: var(--color-elevation);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  outline-offset: 4px;
  padding: 4px;

  transition: box-shadow 300ms ease;
  &:hover {
    box-shadow: var(--mid-shadow);
  }
`;

function Navigation({ navMenus }) {
  return (
    <MenuWrapper>
      {navMenus.map((menu) => {
        return (
          <Link
            aria-label={`Move to sunub's ${menu} web page.`}
            key={`header_nav_${menu}`}
            href={`/${menu}`}
          >
            <MenuIcon name={menu} />
          </Link>
        );
      })}
    </MenuWrapper>
  );
}

function MenuIcon({ name, translateY, opacity, ...delegated }) {
  const key = String(name).toUpperCase();
  const Icon = Icons[key];
  return (
    <AnimateIcon
      // style={{
      // 	translateY,
      // 	opacity,
      // }}
      {...delegated}
    >
      <Icon {...delegated} />
    </AnimateIcon>
  );
}

export default Navigation;
