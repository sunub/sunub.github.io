import gsap from 'gsap';
import { useEffect } from 'react';

export function useLoadPostAnimation(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current?.children) return;

    const elements = Array.from(containerRef.current.children);

    gsap.set(elements, {
      y: -10,
      opacity: 0,
    });

    const animation = gsap.to(elements, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      delay: 0.1,
      stagger: 0.05,
      ease: 'power2.out',
      force3D: true,
    });
    
    return () => {
      animation.kill();
    }
  }, [containerRef]);
}
