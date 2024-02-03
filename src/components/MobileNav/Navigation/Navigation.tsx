import useToggle from "@/hooks/use-toggle";
import React from "react";
import { Category, Theme } from "type";
import NavigationList from "./NavigationList";
import * as Styled from "./Navigation.style";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

interface NavigationProps {
  toggleOpen: () => void;
}

function Navigation(props: NavigationProps) {
  const { toggleOpen } = props;
  return (
    <FocusLock>
      <RemoveScroll>
        <Styled.NavigationWrapper>
          <NavigationList toggleOpen={toggleOpen} />
        </Styled.NavigationWrapper>
        <Styled.Backdrop onClick={toggleOpen} />
      </RemoveScroll>
    </FocusLock>
  );
}

export default Navigation;
