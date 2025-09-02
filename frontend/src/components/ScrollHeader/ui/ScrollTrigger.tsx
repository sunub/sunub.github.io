'use client';

import { useEffect } from 'react';

export function ScrollTrigger({ children }: { children: React.ReactNode }) {
  function scrollHandler(e: Event) {
    if (!e.target || !(e.target instanceof Document)) {
      return;
    }
    const scrollTop = e.target.documentElement.scrollTop;
    const header = document.querySelector('.blog-main__scroll-header');
    if (header) {
      if (scrollTop > 120) {
        header.setAttribute('data-is-scrolled', 'true');
      } else {
        header.setAttribute('data-is-scrolled', 'false');
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return <>{children}</>;
}
