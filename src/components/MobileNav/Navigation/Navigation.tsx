"use client";

import useToggle from "@/hooks/use-toggle";
import React from "react";
import { Category, Theme } from "type";
import Hamburger from "../Hamburger";
import NavigationList from "./NavigationList";
import * as Styled from "./Navigation.style";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
<<<<<<< HEAD
import { ThemeContext } from "@/components/Theme/ThemeProvider";

interface NavigationProps {
  categories: Category[];
}

function Navigation(props: NavigationProps) {
  const { colorTheme } = React.useContext(ThemeContext);
  const { categories } = props;
=======

interface NavigationProps {
  categories: Category[];
  colorTheme: Theme;
}

function Navigation(props: NavigationProps) {
  const { categories, colorTheme } = props;
>>>>>>> refs/remotes/origin/sunub
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <Styled.RootWrapper>
      <Hamburger isOpen={isOpen} toggleOpen={toggleOpen} />
      {isOpen && (
        <FocusLock>
          <RemoveScroll>
            <Styled.NavigationWrapper>
<<<<<<< HEAD
              <NavigationList
                categories={categories}
                colorTheme={colorTheme}
                toggleOpen={toggleOpen}
              />
=======
              <NavigationList categories={categories} colorTheme={colorTheme} />
>>>>>>> refs/remotes/origin/sunub
            </Styled.NavigationWrapper>
            <Styled.Backdrop onClick={toggleOpen} />
          </RemoveScroll>
        </FocusLock>
      )}
    </Styled.RootWrapper>
  );
}

export default Navigation;
