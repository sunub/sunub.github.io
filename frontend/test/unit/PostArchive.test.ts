import type { FrontMatter } from "@sunub/types";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
	preferLongerArchivePageData,
	syncArchiveSeedData,
} from "@/components/Main/PostArchive/store/archive.atom";
import {
	persistArchiveViewState,
	readArchiveCategoryFromLocation,
	readPersistedArchiveViewState,
	resolveArchiveAnchorIndex,
} from "@/components/Main/PostArchive/utils/archiveViewState";
import {
	shouldBootstrapPostArchiveLoad,
	shouldEnablePostArchiveLoadMore,
} from "@/components/Main/PostArchive/utils/postArchiveViewport";

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

describe("archive feed cache helpers", () => {
	test("syncArchiveSeedData 는 같은 totalCount에서도 최신 seed prefix를 우선한다", () => {
		const currentData = {
			totalCount: 4,
			frontmatters: [
				createPost(0),
				createPost(1),
				createPost(2),
				createPost(3),
			],
		};
		const seedData = {
			totalCount: 4,
			frontmatters: [
				{
					...createPost(0),
					title: "Updated Post 0",
					summary: "Updated Summary 0",
				},
				createPost(1),
			],
		};

		expect(syncArchiveSeedData(currentData, seedData)).toEqual({
			totalCount: 4,
			frontmatters: [
				seedData.frontmatters[0],
				seedData.frontmatters[1],
				createPost(2),
				createPost(3),
			],
		});
	});

	test("preferLongerArchivePageData 는 같은 totalCount라면 더 긴 canonical range를 유지한다", () => {
		const currentData = {
			totalCount: 4,
			frontmatters: [createPost(0), createPost(1), createPost(2)],
		};
		const shorterData = {
			totalCount: 4,
			frontmatters: [createPost(0), createPost(1)],
		};
		const longerData = {
			totalCount: 4,
			frontmatters: [
				createPost(0),
				createPost(1),
				createPost(2),
				createPost(3),
			],
		};

		expect(preferLongerArchivePageData(currentData, shorterData)).toBe(
			currentData,
		);
		expect(preferLongerArchivePageData(currentData, longerData)).toEqual(
			longerData,
		);
	});
});

describe("archive viewport policy helpers", () => {
	test("shouldBootstrapPostArchiveLoad 는 초기 자동 로드 조건이 모두 맞을 때만 true 를 반환한다", () => {
		expect(
			shouldBootstrapPostArchiveLoad({
				hasPendingRestore: false,
				hasUserScrolled: false,
				isInitialLayoutReady: true,
				scrollOffsetY: 0,
				listHeightPx: 640,
				remainingPx: 120,
				preloadReservePx: 200,
			}),
		).toBe(true);

		expect(
			shouldBootstrapPostArchiveLoad({
				hasPendingRestore: true,
				hasUserScrolled: false,
				isInitialLayoutReady: true,
				scrollOffsetY: 0,
				listHeightPx: 640,
				remainingPx: 120,
				preloadReservePx: 200,
			}),
		).toBe(false);

		expect(
			shouldBootstrapPostArchiveLoad({
				hasPendingRestore: false,
				hasUserScrolled: true,
				isInitialLayoutReady: true,
				scrollOffsetY: 0,
				listHeightPx: 640,
				remainingPx: 120,
				preloadReservePx: 200,
			}),
		).toBe(false);
	});

	test("shouldEnablePostArchiveLoadMore 는 부트스트랩 또는 사용자 스크롤 이후에만 추가 로드를 허용한다", () => {
		expect(
			shouldEnablePostArchiveLoadMore({
				hasUserScrolled: false,
				canBootstrapLoad: true,
				hasMore: true,
				isFetchingMore: false,
				loadMoreError: null,
			}),
		).toBe(true);

		expect(
			shouldEnablePostArchiveLoadMore({
				hasUserScrolled: true,
				canBootstrapLoad: false,
				hasMore: true,
				isFetchingMore: false,
				loadMoreError: null,
			}),
		).toBe(true);

		expect(
			shouldEnablePostArchiveLoadMore({
				hasUserScrolled: false,
				canBootstrapLoad: false,
				hasMore: true,
				isFetchingMore: false,
				loadMoreError: null,
			}),
		).toBe(false);

		expect(
			shouldEnablePostArchiveLoadMore({
				hasUserScrolled: true,
				canBootstrapLoad: false,
				hasMore: false,
				isFetchingMore: false,
				loadMoreError: null,
			}),
		).toBe(false);
	});
});
