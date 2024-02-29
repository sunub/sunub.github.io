'use client';

import * as Styled from './Header.style';
import Spacer from '@/components/Spacer';
import ThemeToggler from '@/components/Theme/Toggler/ThemeToggler';
import Logo from './Logo';
import Navigation from './Navigation';
import React from 'react';
import Hamburger from '../MobileNav/Hamburger';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap/gsap-core';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
import useToggle from '@/hooks/use-toggle';

function Header() {
  const container = React.useRef<HTMLDivElement>(null);
  const [isBlur, toggleBlur] = useToggle();
  const [a, b] = React.useState();

  let animating: boolean | null;
  React.useEffect(() => {
    gsap.registerPlugin(Observer);

    function scrollAnimation(dir: 'up' | 'down') {
      animating = true;
      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut' },
        onComplete: () => {
          animating = false;
        },
      });

      if (dir === 'up') {
      } else if (dir === 'down') {
      }
    }

    Observer.create({
      target: window,
      type: 'scroll',
      onUp: () => !animating && scrollAnimation('up'),
      onDown: () => !animating && scrollAnimation('down'),
    });
  }, []);

  // useGSAP(() => {
  // });
  return (
    <React.Fragment>
      <Styled.RootWrapper $isBlur={isBlur} ref={container}>
        <Spacer size={60} axis={'vertical'} />
        <Styled.HeaderWrapper id="blog-main__header-contents">
          <Styled.Header>
            <Styled.LogoAndNavWrapper>
              <Logo />
              <Navigation />
            </Styled.LogoAndNavWrapper>
            <Styled.ThemeWrapper>
              <ThemeToggler maskId="desktop-header-theme-toggler" />
            </Styled.ThemeWrapper>
          </Styled.Header>
        </Styled.HeaderWrapper>
      </Styled.RootWrapper>
      <Hamburger />
    </React.Fragment>
  );
}

export default Header;

// gsap.registerPlugin(Observer);

// let sections = document.querySelectorAll("section"),
//   images = document.querySelectorAll(".bg"),
//   headings = gsap.utils.toArray(".section-heading"),
//   outerWrappers = gsap.utils.toArray(".outer"),
//   innerWrappers = gsap.utils.toArray(".inner"),
//   splitHeadings = headings.map(heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })),
//   currentIndex = -1,
//   wrap = gsap.utils.wrap(0, sections.length),
//   animating;

// gsap.set(outerWrappers, { yPercent: 100 });
// gsap.set(innerWrappers, { yPercent: -100 });

// function gotoSection(index, direction) {
//   index = wrap(index); // make sure it's valid
//   animating = true;
//   let fromTop = direction === -1,
//       dFactor = fromTop ? -1 : 1,
//       tl = gsap.timeline({
//         defaults: { duration: 1.25, ease: "power1.inOut" },
//         onComplete: () => animating = false
//       });
//   if (currentIndex >= 0) {
//     // The first time this function runs, current is -1
//     gsap.set(sections[currentIndex], { zIndex: 0 });
//     tl.to(images[currentIndex], { yPercent: -15 * dFactor })
//       .set(sections[currentIndex], { autoAlpha: 0 });
//   }
//   gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
//   tl.fromTo([outerWrappers[index], innerWrappers[index]], {
//       yPercent: i => i ? -100 * dFactor : 100 * dFactor
//     }, {
//       yPercent: 0
//     }, 0)
//     .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
//     .fromTo(splitHeadings[index].chars, {
//         autoAlpha: 0,
//         yPercent: 150 * dFactor
//     }, {
//         autoAlpha: 1,
//         yPercent: 0,
//         duration: 1,
//         ease: "power2",
//         stagger: {
//           each: 0.02,
//           from: "random"
//         }
//       }, 0.2);

//   currentIndex = index;
// }

// Observer.create({
//   type: "wheel,touch,pointer",
//   wheelSpeed: -1,
//   onDown: () => !animating && gotoSection(currentIndex - 1, -1),
//   onUp: () => !animating && gotoSection(currentIndex + 1, 1),
//   tolerance: 10,
//   preventDefault: true
// });

// gotoSection(0, 1);
