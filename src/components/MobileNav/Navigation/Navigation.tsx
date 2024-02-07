import React from "react";
import NavigationList from "../NavigationList";
import * as Styled from "./Navigation.style";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import { getMoblieCloseAnimationTimeline } from "../MoblieNav.helper";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import Spacer from "@/components/Spacer";

const CATEGORIES = ["algorithm", "code", "cs", "web"];
interface RefObjects {
  pathStartRef: React.RefObject<SVGPathElement>;
  pathMidRef: React.RefObject<SVGPathElement>;
  pathEndRef: React.RefObject<SVGPathElement>;
  gradientRef: React.RefObject<SVGLinearGradientElement>;
  svgRef: React.RefObject<SVGSVGElement>;
}
interface NavigationProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refObjects: RefObjects;
}

function Navigation(props: NavigationProps) {
  const { isOpen, setOpen, refObjects } = props;

  function handleClick() {
    if (!refObjects.pathStartRef.current) return;

    const closeTimeline = getMoblieCloseAnimationTimeline(refObjects);
    setOpen(!isOpen);
    closeTimeline.play();
  }

  return (
    <React.Fragment>
      <FocusLock>
        <RemoveScroll>
          <Styled.NavigationWrapper>
            <Styled.Wrapper $isOpen={isOpen}>
              <Styled.ListWrapper id="moblie-nav__link-wrapper">
                <Item name="latest" onClick={handleClick} />
                <Item name="posts" onClick={handleClick} />
                {CATEGORIES.map((category: string) => (
                  <Item
                    name={category}
                    key={`${category}-page`}
                    onClick={handleClick}
                  />
                ))}
                <Item name="about" onClick={handleClick} />
              </Styled.ListWrapper>

              <Styled.ThemeWrapper>
                <ThemeToggler maskId="mobile-nav__theme-toggler" />
              </Styled.ThemeWrapper>
            </Styled.Wrapper>
          </Styled.NavigationWrapper>
          <Styled.Backdrop $isOpen={isOpen} onClick={handleClick} />
        </RemoveScroll>
      </FocusLock>
    </React.Fragment>
  );
}

function Item({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <Styled.List className="mobile-nav__link-items">
      <Styled.Item href={`${name}`} onClick={onClick}>
        {name}
      </Styled.Item>
    </Styled.List>
  );
}

export default Navigation;
