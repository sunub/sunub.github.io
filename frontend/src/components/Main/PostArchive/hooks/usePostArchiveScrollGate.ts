"use client";

import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import type { PostArchiveCategoryFilter } from "../types";
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
}): PostArchiveScrollGateState {
	const [hasUserScrolled, setHasUserScrolled] = useState(false);
	const managedScrollUntilRef = useRef(0);

	const markManagedScroll = useCallback(() => {
		managedScrollUntilRef.current = getNow() + MANAGED_SCROLL_LOCK_MS;
	}, []);

	useLayoutEffect(() => {
		const resetKey = `${category}:${hasPendingRestore ? "restore" : "idle"}`;

		if (resetKey.length > 0) {
			setHasUserScrolled(false);
		}
	}, [category, hasPendingRestore]);

	useEffect(() => {
		const handleScroll = () => {
			if (getNow() <= managedScrollUntilRef.current || hasPendingRestore) {
				return;
			}

			setHasUserScrolled(true);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [hasPendingRestore]);

	return {
		hasUserScrolled: !hasPendingRestore && hasUserScrolled,
		markManagedScroll,
	};
}
