"use client";

import type { FrontMatter } from "@sunub/types";
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useSyncExternalStore,
	useTransition,
} from "react";
import { InfiniteScrollStatus } from "@/components/ui/InfiniteScrollStatus";
import { useWindowedRange } from "../../NewestPostList/hooks/useWindowedRange";
import { useWindowedRangeLoadMore } from "../../NewestPostList/hooks/useWindowedRangeLoadMore";
import {
	createVirtualScrollConfig,
	createVirtualSpacerStyle,
} from "../../NewestPostList/utils/virtualListUtils";
import { useArchiveAutoLoadGate } from "../hooks/useArchiveAutoLoadGate";
import { useArchiveFeed } from "../hooks/useArchiveFeed";
import { useArchiveScrollRestore } from "../hooks/useArchiveScrollRestore";
import { useArchiveViewState } from "../hooks/useArchiveViewState";
import {
	ArchiveContentRail,
	ArchiveEmptyState,
	ArchiveFilterBar,
	ArchiveFilterButton,
	ArchiveFilterCount,
	ArchiveFilterLabel,
	ArchiveList,
	ArchiveMeta,
	ArchiveRow,
	ArchiveRowGrid,
	ArchiveSectionDescription,
	ArchiveSectionEyebrow,
	ArchiveSectionHeader,
	ArchiveSectionRoot,
	ArchiveSectionTitle,
} from "../style";
import type {
	ArchiveSummary,
	PostArchiveCardMediaResolver,
	PostArchiveCategoryFilter,
	PostArchivePageData,
} from "../types";
import {
	chunkPostsIntoRows,
	getPostArchiveCardKey,
	getPostArchiveColumnCount,
	getPostArchiveLoadMoreTriggerDistancePx,
	getPostArchiveLoadMoreViewportThresholdPx,
	getPostArchiveRemainingDistancePx,
	POST_ARCHIVE_CATEGORY_OPTIONS,
	POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
	POST_ARCHIVE_LOAD_MORE_COUNT,
	POST_ARCHIVE_MIN_RENDER_COUNT,
	POST_ARCHIVE_OVERSCAN,
	POST_ARCHIVE_WINDOWING_ROW_THRESHOLD,
	resolvePostArchiveMedia,
} from "../utils";
import { getNextArchiveRestoreVisibleCount } from "../utils/archiveViewState";
import { PostArchiveCard } from "./PostArchiveCard";

const ARCHIVE_LIST_TEST_ID = "post-archive-list";

function subscribeToViewportWidth(callback: () => void) {
	window.addEventListener("resize", callback);
	return () => {
		window.removeEventListener("resize", callback);
	};
}

function getArchiveColumnSnapshot() {
	return getPostArchiveColumnCount(window.innerWidth);
}

function getArchiveServerSnapshot() {
	return 1;
}

export function PostArchiveSection({
	initialCategory = "all",
	initialData,
	summary,
	title = "Full Post Archive",
	eyebrow = "All Categories",
	description = "카테고리를 이동하지 않고도 전체 포스트를 훑어볼 수 있는 아카이브입니다. 필터를 전환하면 같은 페이지에서 각 주제의 흐름을 이어서 탐색할 수 있어요.",
	mediaOverrides,
}: {
	initialCategory?: PostArchiveCategoryFilter;
	initialData: PostArchivePageData;
	summary: ArchiveSummary;
	title?: string;
	eyebrow?: string;
	description?: string;
	mediaOverrides?: PostArchiveCardMediaResolver;
}) {
	const [isFilterPending, startFilterTransition] = useTransition();
	const listRef = useRef<HTMLUListElement>(null);
	const columnCount = useSyncExternalStore(
		subscribeToViewportWidth,
		getArchiveColumnSnapshot,
		getArchiveServerSnapshot,
	);
	const {
		selectedCategory,
		setSelectedCategory,
		visibleCount,
		setVisibleCount,
		pendingRestore,
		completeRestore,
		captureAnchor,
	} = useArchiveViewState(initialCategory);
	const { hasUserScrolled, markManagedScroll } = useArchiveAutoLoadGate({
		selectedCategory,
		hasPendingRestore: pendingRestore !== null,
	});
	const {
		posts,
		totalCount,
		isFetchingMore,
		loadMoreError,
		isVisibleRangeReady,
		retryLoadMore,
	} = useArchiveFeed({
		initialCategory,
		initialData,
		counts: summary.counts,
		selectedCategory,
		visibleCount,
	});

	const safeVisibleCount = Math.min(visibleCount, totalCount);
	const visiblePosts = useMemo(
		() => posts.slice(0, Math.min(safeVisibleCount, posts.length)),
		[posts, safeVisibleCount],
	);
	const rows = useMemo(
		() => chunkPostsIntoRows(visiblePosts, columnCount),
		[columnCount, visiblePosts],
	);
	const hasMore = posts.length < totalCount;
	const preloadThresholdPx = getPostArchiveLoadMoreViewportThresholdPx();
	const preloadReservePx =
		getPostArchiveLoadMoreTriggerDistancePx(preloadThresholdPx);
	const rangeConfig = useMemo(
		() =>
			createVirtualScrollConfig({
				itemHeight: POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
				overscan: POST_ARCHIVE_OVERSCAN,
				minRenderCount: POST_ARCHIVE_MIN_RENDER_COUNT,
				viewportHeightPx: preloadThresholdPx,
				// Avoid making freshly fetched archive cards look "missing" while the
				// list is still short; only enable windowing once the row count is
				// meaningfully larger than the initial render window + overscan.
				enabled: rows.length > POST_ARCHIVE_WINDOWING_ROW_THRESHOLD,
			}),
		[preloadThresholdPx, rows.length],
	);
	const {
		visibleRange,
		topSpacerPx,
		bottomSpacerPx,
		registerItemElement,
		remainingPx,
	} = useWindowedRange(listRef, rows.length, rangeConfig);
	const renderedRows = useMemo(() => {
		if (!rangeConfig.enabled) {
			return rows;
		}

		return rows.slice(visibleRange.start, visibleRange.end);
	}, [rangeConfig.enabled, rows, visibleRange.end, visibleRange.start]);

	const selectedCategoryOption = POST_ARCHIVE_CATEGORY_OPTIONS.find(
		(option) => option.value === selectedCategory,
	);
	const archiveMeta =
		selectedCategory === "all"
			? `총 ${summary.totalCount}개의 포스트를 한 페이지에서 탐색하고 있습니다.`
			: `${selectedCategoryOption?.description ?? selectedCategory} 카테고리의 포스트 ${summary.counts[selectedCategory]}개를 보고 있습니다.`;

	const loadMore = useCallback(() => {
		if (isFetchingMore || !hasMore) {
			return;
		}

		setVisibleCount((currentVisibleCount) =>
			Math.min(currentVisibleCount + POST_ARCHIVE_LOAD_MORE_COUNT, totalCount),
		);
	}, [hasMore, isFetchingMore, setVisibleCount, totalCount]);

	const archiveRemainingPx = rangeConfig.enabled
		? remainingPx
		: getPostArchiveRemainingDistancePx(listRef.current);

	useEffect(() => {
		if (!pendingRestore || isFetchingMore) {
			return;
		}

		const nextVisibleCount = getNextArchiveRestoreVisibleCount({
			snapshot: pendingRestore,
			currentVisibleCount: visibleCount,
			totalCount,
		});
		if (nextVisibleCount === null) {
			return;
		}

		setVisibleCount(nextVisibleCount);
	}, [
		isFetchingMore,
		pendingRestore,
		setVisibleCount,
		totalCount,
		visibleCount,
	]);

	useWindowedRangeLoadMore({
		canLoadMore:
			hasUserScrolled && hasMore && !isFetchingMore && loadMoreError === null,
		postsLength: rows.length,
		visibleRangeEnd: visibleRange.end,
		remainingPx: archiveRemainingPx,
		preloadReservePx,
		loadMore,
		enableRemainingItemsCheck: rangeConfig.enabled,
	});

	useArchiveScrollRestore({
		listRef,
		filteredPosts: visiblePosts,
		columnCount,
		estimatedRowHeight: POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
		pendingRestore,
		isRestoreReady: isVisibleRangeReady,
		getPostKey: getPostArchiveCardKey,
		onBeforeScroll: markManagedScroll,
		onComplete: completeRestore,
	});

	const handleSelectCategory = useCallback(
		(nextCategory: PostArchiveCategoryFilter) => {
			if (nextCategory === selectedCategory) {
				return;
			}

			markManagedScroll();
			window.scrollTo({
				top: 0,
				behavior: "auto",
			});

			startFilterTransition(() => {
				setSelectedCategory(nextCategory);
			});
		},
		[markManagedScroll, selectedCategory, setSelectedCategory],
	);

	const handleCardNavigate = useCallback(
		(post: FrontMatter, index: number) => {
			captureAnchor(getPostArchiveCardKey(post), index);
		},
		[captureAnchor],
	);

	const showEmptyState =
		totalCount === 0 && !isFetchingMore && loadMoreError === null;

	return (
		<ArchiveSectionRoot data-testid="post-archive-section">
			<ArchiveSectionHeader>
				<ArchiveSectionEyebrow>{eyebrow}</ArchiveSectionEyebrow>
				<ArchiveSectionTitle>{title}</ArchiveSectionTitle>
				<ArchiveSectionDescription>{description}</ArchiveSectionDescription>
			</ArchiveSectionHeader>

			<ArchiveContentRail>
				<ArchiveFilterBar aria-busy={isFilterPending}>
					{POST_ARCHIVE_CATEGORY_OPTIONS.map((option) => {
						const isActive = selectedCategory === option.value;

						return (
							<ArchiveFilterButton
								key={option.value}
								type="button"
								$active={isActive}
								$pending={isFilterPending && !isActive}
								onClick={() => handleSelectCategory(option.value)}
								aria-pressed={isActive}
								data-testid={`post-archive-filter-${option.value}`}
							>
								<ArchiveFilterLabel>{option.label}</ArchiveFilterLabel>
								<ArchiveFilterCount>
									{summary.counts[option.value]}
								</ArchiveFilterCount>
							</ArchiveFilterButton>
						);
					})}
				</ArchiveFilterBar>
			</ArchiveContentRail>

			<ArchiveContentRail>
				<ArchiveMeta>{archiveMeta}</ArchiveMeta>
			</ArchiveContentRail>

			{showEmptyState ? (
				<ArchiveContentRail>
					<ArchiveEmptyState>
						선택한 카테고리에 표시할 포스트가 아직 없습니다.
					</ArchiveEmptyState>
				</ArchiveContentRail>
			) : (
				<ArchiveList
					ref={listRef}
					data-testid={ARCHIVE_LIST_TEST_ID}
					aria-label="통합 포스트 아카이브 목록"
				>
					{rangeConfig.enabled && topSpacerPx > 0 ? (
						<li
							style={createVirtualSpacerStyle(topSpacerPx)}
							aria-hidden="true"
							role="presentation"
						/>
					) : null}

					{renderedRows.map((row, rowIndex) => {
						const absoluteRowIndex = rangeConfig.enabled
							? visibleRange.start + rowIndex
							: rowIndex;

						return (
							<ArchiveRow
								key={`${columnCount}-${row.startIndex}`}
								ref={(element) => {
									registerItemElement(absoluteRowIndex, element);
								}}
								data-testid={`post-archive-row-${absoluteRowIndex}`}
							>
								<ArchiveRowGrid $columns={columnCount}>
									{row.posts.map((post, columnIndex) => {
										const absoluteCardIndex = row.startIndex + columnIndex;

										return (
											<PostArchiveCard
												key={`${post.category}-${post.slug}`}
												post={post}
												index={absoluteCardIndex}
												media={resolvePostArchiveMedia(
													post,
													absoluteCardIndex,
													mediaOverrides,
												)}
												onNavigate={handleCardNavigate}
											/>
										);
									})}
								</ArchiveRowGrid>
							</ArchiveRow>
						);
					})}

					{rangeConfig.enabled && bottomSpacerPx > 0 ? (
						<li
							style={createVirtualSpacerStyle(bottomSpacerPx)}
							aria-hidden="true"
							role="presentation"
						/>
					) : null}

					{isFetchingMore ? (
						<InfiniteScrollStatus
							mode="loading"
							caption="Loading Older Posts"
							detail="다음 아카이브 조각을 불러오고 있습니다."
						/>
					) : null}

					{!isFetchingMore && loadMoreError ? (
						<InfiniteScrollStatus
							mode="error"
							caption="Archive Loading Paused"
							detail={loadMoreError}
							onRetry={retryLoadMore}
						/>
					) : null}
				</ArchiveList>
			)}
		</ArchiveSectionRoot>
	);
}
