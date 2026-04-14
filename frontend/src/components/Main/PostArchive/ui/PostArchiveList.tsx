"use client";

import { memo, type RefObject } from "react";
import { InfiniteScrollStatus } from "@/components/ui/InfiniteScrollStatus";
import { createVirtualSpacerStyle } from "../../NewestPostList/utils/virtualListUtils";
import {
	ArchiveContentRail,
	ArchiveEmptyState,
	ArchiveList,
	ArchiveRow,
	ArchiveRowGrid,
} from "../style";
import type {
	PostArchiveCardMediaResolver,
	PostArchiveRowData,
} from "../types";
import { resolvePostArchiveMedia } from "../utils";
import { PostArchiveCard } from "./PostArchiveCard";

const ARCHIVE_LIST_TEST_ID = "post-archive-list";

interface RenderedRow extends PostArchiveRowData {
	key: string;
	absoluteRowIndex: number;
}

const VirtualArchiveRow = memo(function VirtualArchiveRow({
	row,
	columnCount,
	registerItemElement,
	mediaOverrides,
}: {
	row: RenderedRow;
	columnCount: number;
	registerItemElement: (index: number, element: HTMLElement | null) => void;
	mediaOverrides?: PostArchiveCardMediaResolver;
}) {
	return (
		<ArchiveRow
			ref={(el) => registerItemElement(row.absoluteRowIndex, el)}
			data-testid={`post-archive-row-${row.absoluteRowIndex}`}
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
						/>
					);
				})}
			</ArchiveRowGrid>
		</ArchiveRow>
	);
});

export const PostArchiveListView = memo(function PostArchiveListView({
	listRef,
	renderedRows,
	topSpacerPx,
	bottomSpacerPx,
	columnCount,
	registerItemElement,
	windowingEnabled,
	isFetchingMore,
	loadMoreError,
	retryLoadMore,
	mediaOverrides,
}: {
	listRef: RefObject<HTMLUListElement | null>;
	renderedRows: RenderedRow[];
	topSpacerPx: number;
	bottomSpacerPx: number;
	columnCount: number;
	registerItemElement: (index: number, element: HTMLElement | null) => void;
	windowingEnabled: boolean;
	isFetchingMore: boolean;
	loadMoreError: string | null;
	retryLoadMore: () => void;
	mediaOverrides?: PostArchiveCardMediaResolver;
}) {
	if (renderedRows.length === 0 && !isFetchingMore && loadMoreError === null) {
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
			ref={listRef}
			data-testid={ARCHIVE_LIST_TEST_ID}
			aria-label="통합 포스트 아카이브 목록"
		>
			{windowingEnabled && topSpacerPx > 0 ? (
				<li
					style={createVirtualSpacerStyle(topSpacerPx)}
					aria-hidden="true"
					role="presentation"
				/>
			) : null}

			{renderedRows.map((row) => {
				return (
					<VirtualArchiveRow
						key={row.key}
						row={row}
						columnCount={columnCount}
						registerItemElement={registerItemElement}
						mediaOverrides={mediaOverrides}
					/>
				);
			})}

			{windowingEnabled && bottomSpacerPx > 0 ? (
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
	);
});
