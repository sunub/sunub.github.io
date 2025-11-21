"use client";

type Initializer<T> = T | ((prev: T) => T);

export type Store<State> = {
	get: () => State;
	set: (action: Initializer<State>) => State;
	subscribe: (callback: () => void) => () => void;
};

export const createStore = <State>(
	initialState: Initializer<State>,
): Store<State> => {
	let state =
		typeof initialState === "function"
			? (initialState as () => State)()
			: initialState;

	const get = () => state;
	const callbacks = new Set<() => void>();

	const set = (updateState: Initializer<State>): State => {
		state =
			typeof updateState === "function"
				? (updateState as (prev: State) => State)(state)
				: updateState;
		callbacks.forEach((cb) => {
			cb();
		});
		return state;
	};

	const subscribe = (callback: () => void) => {
		callbacks.add(callback);
		return () => {
			callbacks.delete(callback);
		};
	};

	return { get, set, subscribe };
};
