"use client";

import useToggle from "@/hooks/use-toggle";
import React from "react";
import { Category, Theme } from "type";
import Hamburger from "../Hamburger";
import NavigationList from "./NavigationList";
import * as Styled from "./Navigation.style";

interface NavigationProps {
  categories: Category[];
  colorTheme: Theme;
}

function Navigation(props: NavigationProps) {
  const { categories, colorTheme } = props;
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <Styled.RootWrapper>
      <Hamburger isOpen={isOpen} toggleOpen={toggleOpen} />
      {isOpen && (
        <>
          <Styled.NavigationWrapper>
            <NavigationList categories={categories} colorTheme={colorTheme} />
          </Styled.NavigationWrapper>
          <Styled.Backdrop onClick={toggleOpen} />
        </>
      )}
    </Styled.RootWrapper>
  );
}

export default Navigation;