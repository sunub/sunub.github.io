"use client";

import { useEffect, useRef } from "react";

export function useKeyPress<Args extends unknown[]>(
	targetKey: string,
	callback: (e: KeyboardEvent, ...args: Args) => void | Promise<void>,
	...args: Args
) {
	const cbRef = useRef(callback);
	const argsRef = useRef<Args>(args);

	cbRef.current = callback;
	argsRef.current = args;

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === targetKey) {
				cbRef.current(event, ...argsRef.current);
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [targetKey]);
}
