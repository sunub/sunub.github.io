"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface AnimatePresenceWrapperProps {
	children: ReactNode;
	minLoadingTime?: number;
}

export function AnimatePresenceWrapper({
	children,
}: AnimatePresenceWrapperProps) {
	const pathname = usePathname();

	if (process.env.NODE_ENV === "test") {
		return <div key="loading-while-waiting">{children}</div>;
	}

	return (
		<AnimatePresence key={pathname} mode="wait">
			<motion.div key="loading-while-waiting">{children}</motion.div>
		</AnimatePresence>
	);
}
