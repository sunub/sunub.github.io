"use client";

import { InfiniteScrollStatus } from "@/components/ui/InfiniteScrollStatus";
import { createVirtualSpacerStyle } from "../../NewestPostList/utils/virtualListUtils";
import type { PostArchiveDataControllerState } from "../hooks/usePostArchiveDataController";
import type { PostArchiveViewportControllerState } from "../hooks/usePostArchiveViewportController";
import {
	ArchiveContentRail,
	ArchiveEmptyState,
	ArchiveList,
	ArchiveRow,
	ArchiveRowGrid,
} from "../style";
import type { PostArchiveCardMediaResolver } from "../types";
import { resolvePostArchiveMedia } from "../utils";
import { PostArchiveCard } from "./PostArchiveCard";

const ARCHIVE_LIST_TEST_ID = "post-archive-list";

export function PostArchiveListView({
	viewport,
	feed,
	mediaOverrides,
}: {
	viewport: PostArchiveViewportControllerState;
	feed: Pick<
		PostArchiveDataControllerState,
		"showEmptyState" | "isFetchingMore" | "loadMoreError" | "retryLoadMore"
	>;
	mediaOverrides?: PostArchiveCardMediaResolver;
}) {
	if (feed.showEmptyState) {
		return (
			<ArchiveContentRail>
				<ArchiveEmptyState>
					선택한 카테고리에 표시할 포스트가 아직 없습니다.
				</ArchiveEmptyState>
			</ArchiveContentRail>
		);
	}

	return (
		<ArchiveList
			ref={viewport.list.ref}
			data-testid={ARCHIVE_LIST_TEST_ID}
			aria-label="통합 포스트 아카이브 목록"
		>
			{viewport.list.windowing.enabled &&
			viewport.list.windowing.topSpacerPx > 0 ? (
				<li
					style={createVirtualSpacerStyle(viewport.list.windowing.topSpacerPx)}
					aria-hidden="true"
					role="presentation"
				/>
			) : null}

			{viewport.list.rows.map((row) => {
				return (
					<ArchiveRow
						key={row.key}
						ref={row.registerElement}
						data-testid={`post-archive-row-${row.absoluteRowIndex}`}
					>
						<ArchiveRowGrid $columns={viewport.list.columnCount}>
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
										onNavigate={viewport.navigation.handleCardNavigate}
									/>
								);
							})}
						</ArchiveRowGrid>
					</ArchiveRow>
				);
			})}

			{viewport.list.windowing.enabled &&
			viewport.list.windowing.bottomSpacerPx > 0 ? (
				<li
					style={createVirtualSpacerStyle(
						viewport.list.windowing.bottomSpacerPx,
					)}
					aria-hidden="true"
					role="presentation"
				/>
			) : null}

			{feed.isFetchingMore ? (
				<InfiniteScrollStatus
					mode="loading"
					caption="Loading Older Posts"
					detail="다음 아카이브 조각을 불러오고 있습니다."
				/>
			) : null}

			{!feed.isFetchingMore && feed.loadMoreError ? (
				<InfiniteScrollStatus
					mode="error"
					caption="Archive Loading Paused"
					detail={feed.loadMoreError}
					onRetry={feed.retryLoadMore}
				/>
			) : null}
		</ArchiveList>
	);
}
