"use client";

import React from "react";
import * as Styled from "./Hamburger.style";
import {
  getMoblieOpenAnimationTimeline,
  getMoblieCloseAnimationTimeline,
} from "../MoblieNav.helper";
import useToggle from "@/hooks/use-toggle";
import MobileNav from "../MobileNav";
import { createPortal } from "react-dom";

interface RefObjects {
  pathStartRef: React.RefObject<SVGPathElement>;
  pathMidRef: React.RefObject<SVGPathElement>;
  pathEndRef: React.RefObject<SVGPathElement>;
  gradientRef: React.RefObject<SVGLinearGradientElement>;
  svgRef: React.RefObject<SVGSVGElement>;
}

function Hamburger() {
  const [isOpen, toggleOpen] = useToggle(false);

  const pathStartRef = React.useRef<SVGPathElement>(null);
  const pathMidRef = React.useRef<SVGPathElement>(null);
  const pathEndRef = React.useRef<SVGPathElement>(null);
  const gradientRef = React.useRef<SVGLinearGradientElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  const refObjects = {
    pathStartRef,
    pathMidRef,
    pathEndRef,
    gradientRef,
    svgRef,
  };

  return (
    <React.Fragment>
      <Styled.RootWrapper>
        <Styled.Btn
          id="hamburger-btn"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            if (!pathStartRef.current) return;

            toggleOpen();
            const openTimeline = getMoblieOpenAnimationTimeline(refObjects);
            const closeTimeline = getMoblieCloseAnimationTimeline(refObjects);
            if (isOpen) {
              closeTimeline.play();
            } else {
              openTimeline.play();
            }
          }}
        >
          <Icon />
        </Styled.Btn>
        {isOpen &&
          createPortal(
            <MobileNav
              isOpen={isOpen}
              toggleOpen={toggleOpen}
              refObjects={refObjects}
            />,
            document.getElementById("mobile-nav-portal") as HTMLDivElement,
          )}
      </Styled.RootWrapper>
      <UnfilledSVG refObjects={refObjects} />
    </React.Fragment>
  );
}

function Icon() {
  return (
    <Styled.Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Styled.Open>
        <path
          id="top"
          d="M6.12 9.5L25.88 9.5"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          id="bottom"
          d="M6.12 23H25.88"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path id="center" d="M3 16H29" strokeWidth="4" strokeLinecap="round" />
      </Styled.Open>
      <Styled.Close>
        <Styled.Close
          id="Rectangle 91"
          x="2.5"
          y="2.5"
          width="27"
          height="27"
          rx="13.5"
          strokeWidth="2"
        />
        <Styled.Cross1
          id="cross2"
          d="M9 16H23.6601"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Styled.Cross2
          id="cross1"
          d="M9 16H23.6601"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </Styled.Close>
    </Styled.Svg>
  );
}

function UnfilledSVG({ refObjects }: { refObjects: RefObjects }) {
  const { pathStartRef, pathMidRef, pathEndRef, gradientRef, svgRef } =
    refObjects;

  return (
    <Styled.FloodSVG
      ref={svgRef}
      width="469"
      height="1133"
      viewBox="0 0 469 1133"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        ref={pathEndRef}
        d="M220.633 985.29C263.219 1053 191.301 1121.94 191.301 1133L6.10352e-05 1133L0.000111061 0.000111468L205.845 0.000120376C205.845 57.5353 220.633 139.965 241.926 237.886C263.219 335.806 167.4 398.32 153.951 521.136C140.503 643.951 243.607 666.634 205.503 749.617C167.4 832.6 167.4 900.647 220.633 985.29Z"
        fill="url(#paint0_linear_178_860)"
      />
      <defs>
        <linearGradient
          ref={gradientRef}
          id="paint0_linear_178_860"
          x1="664.755"
          y1="566.5"
          x2="0.000211223"
          y2="566.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.173412" stopColor="#FCE5E0" />
          <stop offset="0.371085" stopColor="#FEC5BB" />
        </linearGradient>
      </defs>
      <path
        ref={pathMidRef}
        d="M155.759 147.71C198.369 79.996 101.375 11.0644 101.375 -2.92178e-06L0.000106812 -7.30652e-06L5.67612e-05 1133L86.2376 1133C86.2376 1075.46 168.927 1069.95 168.927 969.799C168.927 910.051 116.225 793.874 144.258 761.787C181.384 719.293 66.3265 760.128 89.0409 611.864C107.754 489.721 89.0409 430.407 140.621 383.383C208.443 321.553 102.497 232.353 155.759 147.71Z"
        fill="#FADCD6"
      />
      <path
        ref={pathStartRef}
        d="M103.142 147.71C145.772 79.996 48.7316 11.0644 48.7316 -3.40841e-06L-3.05176e-05 -5.51618e-06L-8.05679e-05 1133L33.5865 1133C33.5865 1075.46 103.141 993.034 124.457 895.114C145.772 797.194 49.8534 734.679 36.3912 611.864C22.9289 489.049 126.14 466.367 87.9965 383.383C49.8534 300.4 49.8534 232.353 103.142 147.71Z"
        fill="#FDF3F1"
      />
    </Styled.FloodSVG>
  );
}

export default Hamburger;
