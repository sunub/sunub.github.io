"use client";

type Initializer<T> = T extends unknown ? T | ((prev: T) => T) : never;

export type Store<State> = {
  get: () => State;
  set: (action: Initializer<State>) => State;
  subscribe: (callback: () => void) => () => void;
};

export const createStore = <State>(
  initialState: Initializer<State>,
): Store<State> => {
  let state =
    typeof initialState === "function" ? initialState() : initialState;

  const get = () => state;
  const callbacks = new Set<() => void>();

  const set = (updateState: State | ((prev: State) => State)) => {
    state =
      typeof updateState === "function"
        ? (updateState as (prev: State) => State)(state)
        : updateState;
    callbacks.forEach((cb) => cb());
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
