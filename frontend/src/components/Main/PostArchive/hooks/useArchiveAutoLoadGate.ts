"use client";

import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import type { PostArchiveCategoryFilter } from "../types";

const MANAGED_SCROLL_LOCK_MS = 160;

function getNow() {
	return typeof performance === "undefined" ? Date.now() : performance.now();
}

export function useArchiveAutoLoadGate({
	selectedCategory,
	hasPendingRestore,
}: {
	selectedCategory: PostArchiveCategoryFilter;
	hasPendingRestore: boolean;
}) {
	const [hasUserScrolled, setHasUserScrolled] = useState(false);
	const [, setScrollSignal] = useState(0);
	const managedScrollUntilRef = useRef(0);
	const animationFrameIdRef = useRef<number | null>(null);
	const previousResetScopeRef = useRef<string | null>(null);
	const resetScope = `${selectedCategory}:${hasPendingRestore ? "pending" : "ready"}`;

	const markManagedScroll = useCallback(() => {
		managedScrollUntilRef.current = getNow() + MANAGED_SCROLL_LOCK_MS;
	}, []);

	useLayoutEffect(() => {
		if (previousResetScopeRef.current === resetScope) {
			return;
		}

		previousResetScopeRef.current = resetScope;
		setHasUserScrolled(false);
		setScrollSignal(0);
	}, [resetScope]);

	useEffect(() => {
		const handleScroll = () => {
			if (getNow() <= managedScrollUntilRef.current) {
				return;
			}

			if (hasPendingRestore) {
				return;
			}

			setHasUserScrolled(true);

			if (animationFrameIdRef.current !== null) {
				return;
			}

			animationFrameIdRef.current = window.requestAnimationFrame(() => {
				animationFrameIdRef.current = null;
				setScrollSignal((currentSignal) => currentSignal + 1);
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			if (animationFrameIdRef.current !== null) {
				window.cancelAnimationFrame(animationFrameIdRef.current);
				animationFrameIdRef.current = null;
			}
			window.removeEventListener("scroll", handleScroll);
		};
	}, [hasPendingRestore]);

	return {
		hasUserScrolled: !hasPendingRestore && hasUserScrolled,
		markManagedScroll,
	};
}
