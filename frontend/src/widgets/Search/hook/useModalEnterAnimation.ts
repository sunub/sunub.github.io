import { useEffect } from 'react';

export function useModalEnterAnimation(initOpenAnimation: () => void) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    initOpenAnimation();

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [initOpenAnimation]);
}
