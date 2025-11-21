"use client";

import React, { useContext, useMemo, useState } from "react";

type SomeContextType = {
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
};

const SomeContext = React.createContext<SomeContextType | undefined>(undefined);

function SomeProvider({ children }: { children: React.ReactNode }) {
	const [count, setCount] = useState(0);
	const [text, setText] = useState("hello");

	const contextValue = useMemo(
		() => ({
			count,
			setCount,
			text,
			setText,
		}),
		[text, count],
	);

	return (
		<SomeContext.Provider value={contextValue}>{children}</SomeContext.Provider>
	);
}

const SomChildDisplay = React.memo(() => {
	const context = useContext(SomeContext);
	if (!context) {
		throw new Error("SomChildDisplay must be used within a SomeProvider");
	}
	const { count } = context;
	return <p>Count1: {count}</p>;
});

SomChildDisplay.displayName = "SomChildDisplay";

function SomeChildComponent() {
	const context = useContext(SomeContext);
	if (!context) {
		throw new Error("SomeChildComponent must be used within a SomeProvider");
	}
	const { setCount } = context;
	return (
		<div>
			<button
				type="button"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => setCount((count) => count + 1)}
			>
				Increment
			</button>
		</div>
	);
}

function TextEditor() {
	const context = useContext(SomeContext);
	if (!context) {
		throw new Error(
			"DoNotRenderingComponent must be used within a SomeProvider",
		);
	}
	const { setText } = context;

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setText(e.target.value);
	}

	return (
		<div>
			<h3>Text Editor</h3>
			<input
				type="text"
				value={context.text}
				onChange={handleChange}
				className="border-2 border-gray-500"
			/>
		</div>
	);
}

function ContextApiProblem() {
	return (
		<SomeProvider>
			<div className="flex flex-col items-center justify-center gap-4 py-4 border-2 border-gray-500 rounded-md mb-4">
				<div className="flex  items-center justify-center  gap-4">
					<div className="flex items-center justify-center flex-col">
						<SomChildDisplay />
						<SomeChildComponent />
					</div>
					<div className="flex items-center justify-center flex-col">
						<TextEditor />
					</div>
				</div>
				<p>위의 버튼을 클릭하면서 랜더링이 어떻게 일어나는지 확인 해주세요!</p>
			</div>
		</SomeProvider>
	);
}

export { ContextApiProblem };
