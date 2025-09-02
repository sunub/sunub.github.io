import { vi } from 'vitest';
import React from 'react';

export const mockPush = vi.fn();
export const mockReplace = vi.fn();
export const mockPrefetch = vi.fn();
export const mockSearchParams = new URLSearchParams();
export const mockPathname = '/';

export const NOT_FOUND_SYMBOL = '__NEXT_NOT_FOUND__';

vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({
      href,
      children,
      onClick,
    }: {
      href: string | { pathname?: string };
      children: React.ReactNode;
      onClick?: (e: React.MouseEvent) => void;
    }) => {
      const resolved: string = typeof href === 'string' ? href : href?.pathname || '';
      return (
        <a
          href={resolved}
          onClick={e => {
            e.preventDefault();
            if (onClick) {
              onClick(e);
            }
            mockPush(resolved);
          }}
        >
          {children}
        </a>
      );
    },
  };
});
