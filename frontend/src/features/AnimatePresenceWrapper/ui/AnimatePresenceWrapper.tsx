'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface AnimatePresenceWrapperProps {
  children: ReactNode;
  minLoadingTime?: number;
}

export function AnimatePresenceWrapper({ children }: AnimatePresenceWrapperProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence key={pathname} mode="wait">
      <motion.div key="loading-while-waiting">{children}</motion.div>
    </AnimatePresence>
  );
}
