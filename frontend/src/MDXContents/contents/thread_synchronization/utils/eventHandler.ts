import type { LoopCallbackFunction } from "../type";

export function waitSync(milliseconds: number) {
	const start = Date.now();
	while (Date.now() - start < milliseconds) {
		// 아무 작업도 하지 않음
	}
}

export function handleCount() {
	const clickCount = document.getElementById("clickCount");
	if (clickCount) {
		clickCount.innerText = String(Number(clickCount.innerText) + 1);
	}
}

export const handleLoopStart: LoopCallbackFunction = (
	disabled,
	setDisabled,
	_,
) => {
	if (disabled) return;
	setDisabled(true);
	const items = Array.from({ length: 100 }, (_, i) => i);
	const loopCount = document.getElementById("loopCount");
	for (let i = 0; i < items.length; i++) {
		if (loopCount) {
			loopCount.innerText = String(Number(loopCount.innerText) + 1);
			waitSync(25);
		}
	}
};

export const imporveLoopByTimeout: LoopCallbackFunction = (
	disabled,
	setDisabled,
	timerRef,
) => {
	if (disabled) return;
	setDisabled(true);
	const items = Array.from({ length: 100 }, (_, i) => i);
	const loopCount = document.getElementById("loopCount");
	for (let i = 0; i < items.length; i++) {
		const timer = setTimeout(() => {
			if (loopCount) {
				loopCount.innerText = String(Number(loopCount.innerText) + 1);
			}
			waitSync(25);
		}, 0);
		if (timerRef) timerRef.current = timer;
	}
};

export const improveLoopByAsync: LoopCallbackFunction = async (
	disabled,
	setDisabled,
	timerRef,
) => {
	if (disabled) return;
	setDisabled(true);
	const items = Array.from({ length: 100 }, (_, i) => i);
	const loopCount = document.getElementById("loopCount");

	for (let i = 0; i < items.length; i++) {
		await new Promise((resolve) => {
			const timer = setTimeout(() => {
				if (loopCount) {
					loopCount.innerText = String(Number(loopCount.innerText) + 1);
				}
				waitSync(25);
				resolve("");
			}, 0);
			if (timerRef) timerRef.current = timer;
		});
	}
};
