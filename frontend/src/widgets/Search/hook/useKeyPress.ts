'use client';

import { useEffect, useRef } from 'react';

export function useKeyPress(targetKey: string, callback: (e: KeyboardEvent, ...rest: any[]) => void, ...args: any[]) {
  const cbRef = useRef(callback);
  const argsRef = useRef(args);

  cbRef.current = callback;
  argsRef.current = args;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        // eslint-disable-next-line
        cbRef.current(event, ...(argsRef.current || []));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [targetKey]);
}
