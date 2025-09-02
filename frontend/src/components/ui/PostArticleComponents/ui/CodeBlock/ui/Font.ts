'use client';

import { Source_Code_Pro } from 'next/font/google';

export const codeFont = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-code',
  display: 'swap',
});
