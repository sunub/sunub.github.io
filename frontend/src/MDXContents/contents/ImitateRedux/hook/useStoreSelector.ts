"use client";

import { useEffect, useState } from "react";
import type { Store } from "../model/store";

export function useStoreSelector<State, Value>(
	store: Store<State>,
	selector: (state: State) => Value,
) {
	const [state, setState] = useState(() => selector(store.get()));

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			const value = selector(store.get());
			setState(value);
		});

		return unsubscribe;
	}, [store, selector]);

	return state;
}
