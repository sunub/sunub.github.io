"use client";

import React from "react";
import * as Styled from "./Navigation/Navigation.style";
import Hamburger from "./Hamburger";
import useToggle from "@/hooks/use-toggle";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import NavigationList from "./Navigation/NavigationList";

function MobileNav() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div id="mobile-nav-portal">
      <Styled.RootWrapper>
        <Hamburger isOpen={isOpen} toggleOpen={toggleOpen} />
        {isOpen && (
          <FocusLock>
            <RemoveScroll>
              <Styled.NavigationWrapper>
                <NavigationList toggleOpen={toggleOpen} />
              </Styled.NavigationWrapper>
              <Styled.Backdrop onClick={toggleOpen} />
            </RemoveScroll>
          </FocusLock>
        )}
      </Styled.RootWrapper>
    </div>
  );
}

export default MobileNav;
