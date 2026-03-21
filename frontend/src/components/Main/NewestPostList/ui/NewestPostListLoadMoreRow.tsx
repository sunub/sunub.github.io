"use client";

import type { CSSProperties } from "react";
import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import { useBlogPostContext } from "../../BlogPost/provider/BlogPostProvider";

const loadingRowStyle: CSSProperties = {
	listStyle: "none",
	margin: "2rem 0 0",
	padding: 0,
	display: "block",
};

const loadingStatusStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "0.75rem",
};

const loadingCaptionStyle: CSSProperties = {
	fontSize: "0.875rem",
	lineHeight: 1.5,
	color: "color-mix(in oklch, var(--color-text) 72%, transparent)",
};

const errorStatusStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: "0.75rem",
	padding: "1rem 0",
};

const errorCaptionStyle: CSSProperties = {
	fontSize: "0.9375rem",
	lineHeight: 1.6,
	color: "var(--color-text)",
};

const retryButtonStyle: CSSProperties = {
	padding: "0.625rem 0.9rem",
	borderRadius: "0.75rem",
	border: "1px solid color-mix(in oklch, var(--color-text) 16%, transparent)",
	background: "transparent",
	color: "var(--color-text)",
	font: "inherit",
	cursor: "pointer",
};

export function NewestPostListLoadMoreRow() {
	const {
		hasMore,
		loadMoreError,
		pendingLoadCount,
		posts,
		retryLoadMore,
		totalCount,
	} = useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;

	if (loadMoreError && canLoadMore) {
		return (
			<li style={loadingRowStyle}>
				<div role="alert" style={errorStatusStyle}>
					<p style={errorCaptionStyle}>{loadMoreError}</p>
					<button
						type="button"
						style={retryButtonStyle}
						onClick={retryLoadMore}
					>
						다시 시도
					</button>
				</div>
			</li>
		);
	}

	if (!(pendingLoadCount > 0 && canLoadMore)) {
		return null;
	}

	const loadingMessage =
		pendingLoadCount > 1
			? `추가 포스트를 불러오는 중입니다. ${pendingLoadCount}개의 로드 작업이 순차적으로 처리되고 있어요.`
			: "추가 포스트를 불러오는 중입니다.";

	return (
		<li style={loadingRowStyle}>
			<div aria-live="polite" style={loadingStatusStyle}>
				<FrontMatterLoading length={1} isListItem />
				<p style={loadingCaptionStyle}>{loadingMessage}</p>
			</div>
		</li>
	);
}
