import { chunk, flatMap } from "@fxts/core";
import { filter } from "./filter";
import { forEach } from "./forEach";
import { map } from "./map";
import { reduce } from "./reduce";
import { take } from "./take";
import { fromAsync } from "./utils/fromAsync";
import { isIterable } from "./utils/isIterable";
import { toAsync } from "./utils/toAsync";

class FxIterableSync<T> {
	constructor(private iterable: Iterable<T>) {}

	[Symbol.iterator](): Iterator<T> {
		return this.iterable[Symbol.iterator]();
	}

	map<R>(fn: (a: T) => R): FxIterableSync<R> {
		return fx(map(fn, this.iterable));
	}

	filter(fn: (a: T) => boolean): FxIterableSync<T> {
		return fx(filter(fn, this.iterable));
	}

	reduce<Acc>(fn: (acc: Acc, a: T) => Acc, acc: Acc): Acc;

	reduce<Acc>(fn: (acc: Acc, a: T) => Acc): Acc;

	reduce<Acc>(fn: (acc: Acc, a: T) => Acc, acc?: Acc): IterableIterator<Acc> {
		if (acc === undefined) {
			return reduce(fn, this.iterable);
		}
		return reduce(fn, acc, this.iterable);
	}

	take(limit: number): FxIterableSync<T> {
		return fx(take(limit, this));
	}

	toArray() {
		return [...this];
	}

	toAsync() {
		return fx(toAsync(this));
	}

	chunk(size: number) {
		return fx(chunk(size, this));
	}

	forEach(fn: (a: T) => void) {
		return fx(forEach(fn, this));
	}

	flatMap<R>(fn: (a: T) => R) {
		return fx(flatMap(fn, this));
	}
}

class FxIterableAsync<T> {
	constructor(private asyncIterable: AsyncIterable<T>) {}

	[Symbol.asyncIterator]() {
		return this.asyncIterable[Symbol.asyncIterator]();
	}

	map<R>(fn: (a: T) => R | Promise<R>): FxIterableAsync<R> {
		return fx(map(fn, this));
	}

	filter(fn: (a: T) => boolean | Promise<boolean>): FxIterableAsync<T> {
		return fx(filter(fn, this));
	}

	reduce<Acc>(
		fn: (acc: Acc, a: T) => Acc | Promise<Acc>,
		acc?: Acc,
	): AsyncIterableIterator<Awaited<Acc>> {
		if (acc === undefined) {
			return reduce(fn, this);
		}
		return reduce(fn, acc, this);
	}

	toArray() {
		return fromAsync(this);
	}

	chunk(size: number) {
		return fx(chunk(size, this));
	}

	forEach(fn: (a: T) => void | Promise<void>) {
		return fx(forEach(fn, this));
	}

	flatMap<R>(fn: (a: T) => R | Promise<R>) {
		return fx(flatMap(fn, this));
	}
}

export function fx<T>(iterable: Iterable<T>): FxIterableSync<T>;

export function fx<T>(asyncIterable: AsyncIterable<T>): FxIterableAsync<T>;

export function fx<T>(
	iterable: Iterable<T> | AsyncIterable<T>,
): FxIterableSync<T> | FxIterableAsync<T> {
	return isIterable(iterable)
		? new FxIterableSync(iterable)
		: new FxIterableAsync(iterable);
}
