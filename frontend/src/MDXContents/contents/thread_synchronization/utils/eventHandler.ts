import type { LoopCallbackFunction } from "../type";

function waitSync(milliseconds: number) {
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
