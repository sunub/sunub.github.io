import type { FrontMatter } from "@sunub/types";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
	persistArchiveViewState,
	readArchiveCategoryFromLocation,
	readPersistedArchiveViewState,
	resolveArchiveAnchorIndex,
} from "@/components/Main/PostArchive/utils/archiveViewState";

const ARCHIVE_VIEW_STATE_STORAGE_KEY = "post-archive:view:v1";

function createPost(index: number): FrontMatter {
	return {
		title: `Post ${index}`,
		date: "2024-01-01T00:00:00.000Z",
		summary: `Summary ${index}`,
		category: index % 2 === 0 ? "web" : "cs",
		tags: ["tag"],
		slug: `post-${index}`,
		completed: true,
	};
}

describe("archive view state utilities", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-03-23T00:00:00.000Z"));
		window.sessionStorage.clear();
		window.history.replaceState({}, "", "/archive");
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test("persistArchiveViewState 는 URL, history.state, sessionStorage 를 함께 갱신한다", () => {
		persistArchiveViewState({
			category: "web",
			visibleCount: 18,
			anchorPostKey: "web/post-8",
			anchorIndex: 8,
		});

		expect(window.location.pathname).toBe("/archive");
		expect(window.location.search).toBe("?category=web");
		expect(window.history.state.__postArchiveViewState).toMatchObject({
			category: "web",
			visibleCount: 18,
			anchorPostKey: "web/post-8",
			anchorIndex: 8,
			pathname: "/archive",
			version: 1,
		});

		expect(
			JSON.parse(
				window.sessionStorage.getItem(ARCHIVE_VIEW_STATE_STORAGE_KEY) ?? "null",
			),
		).toMatchObject({
			category: "web",
			visibleCount: 18,
			anchorPostKey: "web/post-8",
			anchorIndex: 8,
			pathname: "/archive",
			version: 1,
		});
	});

	test("readPersistedArchiveViewState 는 현재 URL category 와 일치하는 상태만 복원한다", () => {
		persistArchiveViewState({
			category: "cs",
			visibleCount: 24,
			anchorPostKey: "cs/post-3",
			anchorIndex: 3,
		});

		expect(readArchiveCategoryFromLocation()).toBe("cs");
		expect(readPersistedArchiveViewState("cs")).toMatchObject({
			category: "cs",
			visibleCount: 24,
			anchorPostKey: "cs/post-3",
			anchorIndex: 3,
		});
		expect(readPersistedArchiveViewState("all")).toBeNull();
	});

	test("readPersistedArchiveViewState 는 오래된 스냅샷을 무시한다", () => {
		window.sessionStorage.setItem(
			ARCHIVE_VIEW_STATE_STORAGE_KEY,
			JSON.stringify({
				version: 1,
				pathname: "/archive",
				category: "all",
				visibleCount: 12,
				anchorPostKey: "web/post-4",
				anchorIndex: 4,
				updatedAt: Date.now() - 1000 * 60 * 31,
			}),
		);

		expect(readPersistedArchiveViewState("all")).toBeNull();
	});

	test("resolveArchiveAnchorIndex 는 key 를 우선 사용하고 없으면 index 로 fallback 한다", () => {
		const posts = [createPost(0), createPost(1), createPost(2), createPost(3)];

		expect(
			resolveArchiveAnchorIndex(
				posts,
				{
					version: 1,
					pathname: "/archive",
					category: "all",
					visibleCount: 12,
					anchorPostKey: "web/post-2",
					anchorIndex: 0,
					updatedAt: Date.now(),
				},
				(post) => `${post.category}/${post.slug}`,
			),
		).toBe(2);

		expect(
			resolveArchiveAnchorIndex(
				posts,
				{
					version: 1,
					pathname: "/archive",
					category: "all",
					visibleCount: 12,
					anchorPostKey: "missing/post",
					anchorIndex: 1,
					updatedAt: Date.now(),
				},
				(post) => `${post.category}/${post.slug}`,
			),
		).toBe(1);
	});
});
