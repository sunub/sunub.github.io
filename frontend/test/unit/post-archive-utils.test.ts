import { describe, expect, test } from "vitest";
import { getPostArchiveRemainingDistancePx } from "@/components/Main/PostArchive/utils";

describe("post archive utils", () => {
	test("list가 없으면 남은 거리를 무한대로 취급한다", () => {
		expect(getPostArchiveRemainingDistancePx(null)).toBe(
			Number.POSITIVE_INFINITY,
		);
	});

	test("viewport 기준으로 실제 남은 거리를 계산한다", () => {
		const originalInnerHeight = window.innerHeight;
		Object.defineProperty(window, "innerHeight", {
			configurable: true,
			value: 720,
		});

		const list = document.createElement("ul");
		list.getBoundingClientRect = () =>
			({
				bottom: 980,
			}) as DOMRect;

		expect(getPostArchiveRemainingDistancePx(list)).toBe(260);

		Object.defineProperty(window, "innerHeight", {
			configurable: true,
			value: originalInnerHeight,
		});
	});

	test("viewport 아래로 남은 거리가 없으면 0으로 고정한다", () => {
		const originalInnerHeight = window.innerHeight;
		Object.defineProperty(window, "innerHeight", {
			configurable: true,
			value: 720,
		});

		const list = document.createElement("ul");
		list.getBoundingClientRect = () =>
			({
				bottom: 640,
			}) as DOMRect;

		expect(getPostArchiveRemainingDistancePx(list)).toBe(0);

		Object.defineProperty(window, "innerHeight", {
			configurable: true,
			value: originalInnerHeight,
		});
	});
});
