"use client";

import React from "react";
import styled from "styled-components";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import { getMoblieCloseAnimationTimeline } from "./MoblieNav.helper";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import * as Styled from "./MoblieNav.style";
import gsap from "gsap";

const CATEGORIES = ["algorithm", "code", "cs", "web"];

export interface RefObjects {
  pathStartRef: React.RefObject<SVGPathElement>;
  pathMidRef: React.RefObject<SVGPathElement>;
  pathEndRef: React.RefObject<SVGPathElement>;
  gradientRef: React.RefObject<SVGLinearGradientElement>;
  svgRef: React.RefObject<SVGSVGElement>;
}

interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
  refObjects: RefObjects;
}

function MobileNav(props: Props) {
  const { isOpen, toggleOpen, refObjects } = props;

  function handleClick() {
    if (!refObjects.pathStartRef.current) return;

    const closeTimeline = getMoblieCloseAnimationTimeline(refObjects);
    toggleOpen();
    closeTimeline.play();
  }
  React.useEffect(() => {
    const listItemTimeline = gsap
      .timeline({ paused: true })
      .set(".mobile-nav__link-items", {
        autoAlpha: 0,
        filter: "blur(5px)",
        textShadow: "20px 0px 0px rgba(0, 0, 0, 0.5)",
      })
      .to(".mobile-nav__link-items", {
        autoAlpha: 1,
        duration: 0.95,
        ease: "ease.in",
        filter: "blur(0px)",
        textShadow: "0px 0px 0px rgba(0, 0, 0, 0.5)",
      });

    listItemTimeline.play();
  }, []);

  return (
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

            <Styled.ThemeWrapper className="mobile-nav__link-items">
              <ThemeToggler maskId="mobile-nav__theme-toggler" />
            </Styled.ThemeWrapper>
          </Styled.Wrapper>
        </Styled.NavigationWrapper>
        <Styled.Backdrop $isOpen={isOpen} onClick={handleClick} />
      </RemoveScroll>
    </FocusLock>
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

export default MobileNav;
