'use client';

/* eslint-disable */
import gsap from 'gsap';
import { CustomEase } from 'gsap/all';
import { useEffect, useRef } from 'react';
import { Article } from './page.style';

gsap.registerPlugin(CustomEase);

export function ClientArticle({ children }: { children: React.ReactNode }) {
  const animationExecutedRef = useRef(false);

  useEffect(() => {
    if (animationExecutedRef.current) return;
    CustomEase.create(
      'slide-enter',
      'M0,0 C0.126,0.882 0.226,1.318 0.39,1.18 0.522,1.07 0.574,0.668 0.718,0.852 0.82,0.98 0.895,1.008 1,1'
    );

    const animationTimer = setTimeout(() => {
      const elements = gsap.utils.toArray('#blog-post__article-content > *');
      if (elements.length === 0) return;

      gsap.to(elements, {
        duration: 0.8,
        x: 0,
        opacity: 1,
        delay: 0.1,
        stagger: 0.05,
        ease: 'power2.out',
        force3D: true,
      });
      animationExecutedRef.current = true;
    }, 150);

    return () => clearTimeout(animationTimer);
  }, []);

  return <Article id="blog-post__article-content">{children}</Article>;
}
