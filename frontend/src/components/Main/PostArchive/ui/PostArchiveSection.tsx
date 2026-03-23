"use client";

import type { FrontMatter } from "@sunub/types";
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
	useTransition,
} from "react";
import { InfiniteScrollStatus } from "@/components/ui/InfiniteScrollStatus";
import { useWindowedRange } from "../../NewestPostList/hooks/useWindowedRange";
import { useWindowedRangeLoadMore } from "../../NewestPostList/hooks/useWindowedRangeLoadMore";
import {
	createVirtualScrollConfig,
	createVirtualSpacerStyle,
	getLoadMoreTriggerDistancePx,
	getLoadMoreViewportThresholdPx,
} from "../../NewestPostList/utils/virtualListUtils";
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
	PostArchiveCardMediaResolver,
	PostArchiveCategoryFilter,
} from "../types";
import {
	chunkPostsIntoRows,
	filterPostsByCategory,
	getPostArchiveCardKey,
	getPostArchiveColumnCount,
	getPostArchiveCounts,
	POST_ARCHIVE_CATEGORY_OPTIONS,
	POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
	POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
	POST_ARCHIVE_LOAD_MORE_COUNT,
	POST_ARCHIVE_MIN_RENDER_COUNT,
	POST_ARCHIVE_OVERSCAN,
	resolvePostArchiveMedia,
} from "../utils";
import { PostArchiveCard } from "./PostArchiveCard";

const ARCHIVE_LIST_TEST_ID = "post-archive-list";
const LOAD_MORE_DELAY_MS = 180;

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
	posts,
	title = "Full Post Archive",
	eyebrow = "All Categories",
	description = "카테고리를 이동하지 않고도 전체 포스트를 훑어볼 수 있는 아카이브입니다. 필터를 전환하면 같은 페이지에서 각 주제의 흐름을 이어서 탐색할 수 있어요.",
	mediaOverrides,
}: {
	posts: FrontMatter[];
	title?: string;
	eyebrow?: string;
	description?: string;
	mediaOverrides?: PostArchiveCardMediaResolver;
}) {
	const [isFilterPending, startFilterTransition] = useTransition();
	const listRef = useRef<HTMLUListElement>(null);
	const loadMoreTimeoutRef = useRef<number | null>(null);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
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
	} = useArchiveViewState();

	const counts = useMemo(() => getPostArchiveCounts(posts), [posts]);
	const filteredPosts = useMemo(
		() => filterPostsByCategory(posts, selectedCategory),
		[posts, selectedCategory],
	);
	const safeVisibleCount = Math.min(visibleCount, filteredPosts.length);
	const visiblePosts = useMemo(
		() => filteredPosts.slice(0, safeVisibleCount),
		[filteredPosts, safeVisibleCount],
	);
	const rows = useMemo(
		() => chunkPostsIntoRows(visiblePosts, columnCount),
		[columnCount, visiblePosts],
	);
	const hasMore = safeVisibleCount < filteredPosts.length;
	const preloadThresholdPx = getLoadMoreViewportThresholdPx();
	const rangeConfig = useMemo(
		() =>
			createVirtualScrollConfig({
				itemHeight: POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
				overscan: POST_ARCHIVE_OVERSCAN,
				minRenderCount: POST_ARCHIVE_MIN_RENDER_COUNT,
				viewportHeightPx: preloadThresholdPx,
				enabled: rows.length > POST_ARCHIVE_MIN_RENDER_COUNT,
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

	const selectedCategoryOption = useMemo(
		() =>
			POST_ARCHIVE_CATEGORY_OPTIONS.find(
				(option) => option.value === selectedCategory,
			),
		[selectedCategory],
	);
	const archiveMeta = useMemo(() => {
		if (selectedCategory === "all") {
			return `총 ${counts.all}개의 포스트를 한 페이지에서 탐색하고 있습니다.`;
		}

		return `${selectedCategoryOption?.description ?? selectedCategory} 카테고리의 포스트 ${counts[selectedCategory]}개를 보고 있습니다.`;
	}, [counts, selectedCategory, selectedCategoryOption]);

	const clearPendingLoadMore = useCallback(() => {
		if (loadMoreTimeoutRef.current !== null) {
			window.clearTimeout(loadMoreTimeoutRef.current);
			loadMoreTimeoutRef.current = null;
		}
		setIsLoadingMore(false);
	}, []);

	useEffect(() => {
		return () => {
			clearPendingLoadMore();
		};
	}, [clearPendingLoadMore]);

	const loadMore = useCallback(() => {
		if (isLoadingMore || !hasMore) {
			return;
		}

		setIsLoadingMore(true);
		loadMoreTimeoutRef.current = window.setTimeout(() => {
			setVisibleCount((currentVisibleCount) =>
				Math.min(
					currentVisibleCount + POST_ARCHIVE_LOAD_MORE_COUNT,
					filteredPosts.length,
				),
			);
			setIsLoadingMore(false);
			loadMoreTimeoutRef.current = null;
		}, LOAD_MORE_DELAY_MS);
	}, [filteredPosts.length, hasMore, isLoadingMore, setVisibleCount]);

	useWindowedRangeLoadMore({
		canLoadMore: hasMore && !isLoadingMore,
		postsLength: rows.length,
		visibleRangeEnd: visibleRange.end,
		remainingPx,
		preloadReservePx: getLoadMoreTriggerDistancePx(preloadThresholdPx),
		loadMore,
	});

	useArchiveScrollRestore({
		listRef,
		filteredPosts,
		columnCount,
		estimatedRowHeight: POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
		pendingRestore,
		getPostKey: getPostArchiveCardKey,
		onComplete: completeRestore,
	});

	const handleSelectCategory = useCallback(
		(nextCategory: PostArchiveCategoryFilter) => {
			if (nextCategory === selectedCategory) {
				return;
			}

			clearPendingLoadMore();
			startFilterTransition(() => {
				setSelectedCategory(nextCategory);
				setVisibleCount(POST_ARCHIVE_INITIAL_VISIBLE_COUNT);
			});
		},
		[
			clearPendingLoadMore,
			selectedCategory,
			setSelectedCategory,
			setVisibleCount,
		],
	);
	const handleCardNavigate = useCallback(
		(post: FrontMatter, index: number) => {
			captureAnchor(getPostArchiveCardKey(post), index);
		},
		[captureAnchor],
	);

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
								<ArchiveFilterCount>{counts[option.value]}</ArchiveFilterCount>
							</ArchiveFilterButton>
						);
					})}
				</ArchiveFilterBar>
			</ArchiveContentRail>

			<ArchiveContentRail>
				<ArchiveMeta>{archiveMeta}</ArchiveMeta>
			</ArchiveContentRail>

			{rows.length === 0 ? (
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

					{isLoadingMore ? (
						<InfiniteScrollStatus
							mode="loading"
							caption="Loading Older Posts"
							detail="다음 아카이브 조각을 불러오고 있습니다."
						/>
					) : null}
				</ArchiveList>
			)}
		</ArchiveSectionRoot>
	);
}
