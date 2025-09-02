import gsap from 'gsap';
import { useEffect } from 'react';

export function useLoadPostAnimation() {
  useEffect(() => {
    const elements = gsap.utils.toArray('#blog-post__recently-post-list > *');
    gsap.to(elements, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      delay: 0.1,
      stagger: 0.05,
      ease: 'power2.out',
      force3D: true,
    });
  }, []);
}
