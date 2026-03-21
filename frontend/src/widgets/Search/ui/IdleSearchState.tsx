"use client";

import { VisuallyHidden } from "@/components/VisuallyHidden";
import { ResultItem } from "../styles/index";

export function IdleSearchState() {
	return (
		<ResultItem
			data-testid="search-idle-state"
			key="idle-search-state"
			style={{
				pointerEvents: "none",
			}}
		>
			<VisuallyHidden>
				{"검색어를 입력해 주세요. 제목, 태그, 카테고리로 검색할 수 있습니다."}
			</VisuallyHidden>
			{"검색어를 입력해 주세요."}
		</ResultItem>
	);
}
