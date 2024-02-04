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
  const closeTimeline = getMoblieCloseAnimationTimeline(refObjects, setOpen);

  return (
    <React.Fragment>
      <FocusLock>
        <RemoveScroll>
          <Styled.NavigationWrapper>
            <Styled.Wrapper $isOpen={isOpen}>
              <Styled.ListWrapper>
                <Item name="latest" onClick={() => closeTimeline.play()} />
                <Styled.List>
                  posts
                  <Styled.ListWrapper>
                    <Spacer size={4} axis={"vertical"} />
                    {CATEGORIES.map((category: string) => (
                      <Item
                        name={category}
                        key={`${category}-page`}
                        onClick={() => closeTimeline.play()}
                      />
                    ))}
                  </Styled.ListWrapper>
                </Styled.List>
                <Item name="about" onClick={() => closeTimeline.play()} />
              </Styled.ListWrapper>

              <Styled.ThemeWrapper>
                <ThemeToggler maskId="mobile-nav__theme-toggler" />
              </Styled.ThemeWrapper>
            </Styled.Wrapper>
          </Styled.NavigationWrapper>
          <Styled.Backdrop onClick={() => closeTimeline.play()} />
        </RemoveScroll>
      </FocusLock>
    </React.Fragment>
  );
}

function Item({
  name,
  onClick,
  ...delegated
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <Styled.List {...delegated}>
      <Styled.Item href={`${name}`} onClick={onClick}>
        {name}
      </Styled.Item>
    </Styled.List>
  );
}

export default Navigation;
