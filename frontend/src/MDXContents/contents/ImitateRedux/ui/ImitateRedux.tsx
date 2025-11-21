"use client";

import { memo, useCallback } from "react";
import { useStoreSelector } from "../hook/useStoreSelector";
import { createStore } from "../model/store";

const selectStore = createStore({
	count: 0,
	text: "Hello",
});

function SelectorCounter() {
	const count = useStoreSelector(
		selectStore,
		useCallback((state: ReturnType<typeof selectStore.get>) => state.count, []),
	);

	function handleClick() {
		selectStore.set((prev) => ({ ...prev, count: prev.count + 1 }));
	}

	return (
		<div>
			<h3>Counter: {count}</h3>
			<button type="button" onClick={handleClick}>
				Increment
			</button>
		</div>
	);
}

const TextEditor = memo(() => {
	const text = useStoreSelector(
		selectStore,
		useCallback((state: ReturnType<typeof selectStore.get>) => state.text, []),
	);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		selectStore.set((prev) => ({ ...prev, text: e.target.value }));
	}

	return (
		<div>
			<h3>Text Editor</h3>
			<input value={text} onChange={handleChange} />
		</div>
	);
});

TextEditor.displayName = "TextEditor";

function ImitateRedux() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-4 border-2 border-gray-500 rounded-md mb-4">
			<div className="flex  items-center justify-center  gap-4">
				<div className="flex items-center justify-center flex-col">
					<SelectorCounter />
				</div>
				<div className="flex items-center justify-center flex-col">
					<TextEditor />
				</div>
			</div>
			<p>위의 버튼을 클릭하면서 랜더링이 어떻게 일어나는지 확인 해주세요!</p>
		</div>
	);
}

export { ImitateRedux };
