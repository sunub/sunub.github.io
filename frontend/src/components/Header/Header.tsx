import { cookies } from 'next/headers';
import React from 'react';
import type { Theme } from 'type';
import { ScrollHeader } from '@/components/ScrollHeader/ui/ScrollHeader';
import { ThemeToggler } from '@/components/Theme/Toggler/ThemeToggler';
import { Search } from '@/widgets/Search';
import * as Styled from './Header.style';
import Logo from './Logo';
import Navigation from './Navigation';
import Hamburger from '../MobileNav/Hamburger';

function themeGuard(theme: unknown): asserts theme is Theme {
  if (theme !== 'light' && theme !== 'dark') {
    throw new Error("Invalid theme value. Expected 'light' or 'dark'.");
  }
}

async function Header() {
  const savedTheme = (await cookies()).get('color-theme')?.value || 'light';
  themeGuard(savedTheme);
  return (
    <ScrollHeader>
      <Styled.RootWrapper>
        <Styled.HeaderWrapper id="blog-main__header-contents">
          <Styled.Header>
            <Styled.HeaderLeftSideWrapper>
              <Logo />
              <Navigation />
            </Styled.HeaderLeftSideWrapper>

            <Styled.HeaderRightSideWrapper>
              <Search />
              <Styled.ThemeWrapper>
                <ThemeToggler theme={savedTheme} />
              </Styled.ThemeWrapper>
              <Hamburger theme={savedTheme} />
            </Styled.HeaderRightSideWrapper>
          </Styled.Header>
        </Styled.HeaderWrapper>
      </Styled.RootWrapper>
    </ScrollHeader>
  );
}

export default Header;
