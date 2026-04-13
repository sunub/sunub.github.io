"use client";

import type { ArchiveCategoryFilter as PostArchiveCategoryFilter } from "@sunub/types";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import type { PostArchiveScrollGateState } from "./postArchiveViewportPorts";

const MANAGED_SCROLL_LOCK_MS = 160;

function getNow() {
	return typeof performance === "undefined" ? Date.now() : performance.now();
}

export function usePostArchiveScrollGate({
	category,
	hasPendingRestore,
}: {
	category: PostArchiveCategoryFilter;
	hasPendingRestore: boolean;
}): PostArchiveScrollGateState & { scrollSignal: number } {
	const [hasUserScrolled, setHasUserScrolled] = useState(false);
	const [scrollSignal, setScrollSignal] = useState(0);
	const managedScrollUntilRef = useRef(0);
	const rafIdRef = useRef<number | null>(null);

	const markManagedScroll = useCallback(() => {
		managedScrollUntilRef.current = getNow() + MANAGED_SCROLL_LOCK_MS;
	}, []);

	useLayoutEffect(() => {
		const resetKey = `${category}:${hasPendingRestore ? "restore" : "idle"}`;

		if (resetKey.length > 0) {
			setHasUserScrolled(false);
			setScrollSignal(0);
		}
	}, [category, hasPendingRestore]);

	useEffect(() => {
		const handleScroll = () => {
			if (getNow() <= managedScrollUntilRef.current) {
				return;
			}

			if (!hasUserScrolled && !hasPendingRestore) {
				setHasUserScrolled(true);
			}

			if (rafIdRef.current !== null) return;

			rafIdRef.current = window.requestAnimationFrame(() => {
				rafIdRef.current = null;
				setScrollSignal((prev) => prev + 1);
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			if (rafIdRef.current !== null)
				window.cancelAnimationFrame(rafIdRef.current);
			window.removeEventListener("scroll", handleScroll);
		};
	}, [hasUserScrolled, hasPendingRestore]);

	return {
		hasUserScrolled: !hasPendingRestore && hasUserScrolled,
		scrollSignal,
		markManagedScroll,
	};
}
