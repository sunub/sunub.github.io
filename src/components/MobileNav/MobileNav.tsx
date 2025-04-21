"use client";

import React from "react";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import { getMoblieCloseAnimationTimeline } from "./MoblieNav.helper";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import * as Styled from "./MoblieNav.style";
import gsap from "gsap";

const CATEGORIES = [
  {
    name: "cs",
    href: "/post/cs",
  },
  {
    name: "web",
    href: "/post/web",
  },
  {
    name: "code",
    href: "/post/code",
  },
  {
    name: "algorithm",
    href: "/post/algorithm",
  },
];
export interface RefObjects {
  pathStartRef: React.RefObject<SVGPathElement | null>;
  pathMidRef: React.RefObject<SVGPathElement | null>;
  pathEndRef: React.RefObject<SVGPathElement | null>;
  gradientRef: React.RefObject<SVGLinearGradientElement | null>;
  svgRef: React.RefObject<SVGSVGElement | null>;
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
              <Item name="latest" href={"/"} onClick={handleClick} />
              <Item name="posts" href="" onClick={handleClick} />
              {CATEGORIES.map(({ name, href }) => (
                <Item
                  name={name}
                  key={`${href}-page`}
                  href={href}
                  onClick={handleClick}
                />
              ))}
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

function Item({
  name,
  href,
  onClick,
}: {
  name: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <Styled.List className="mobile-nav__link-items">
      <Styled.Item href={href} onClick={onClick}>
        {name}
      </Styled.Item>
    </Styled.List>
  );
}

export default MobileNav;
