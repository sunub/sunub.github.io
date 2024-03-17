'use client';

import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function NewestPostScroll() {
  React.useEffect(() => {
    const newestPost = document.getElementById(
      'blog-post__link-list',
    ) as HTMLElement;
    const container = document.getElementById(
      'blog-main__recently-post-list',
    ) as HTMLElement;

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(newestPost, {
      y: () => window.innerHeight - newestPost.clientHeight - 64,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: 'top top',
        end: () => `+=${newestPost.clientHeight}`,
        scrub: true,
        invalidateOnRefresh: true,
        markers: true,
      },
    });
  }, []);

  return <React.Fragment />;
}

export default NewestPostScroll;
