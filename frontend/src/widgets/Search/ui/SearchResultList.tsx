"use client";

import { useAtomValue } from "jotai";
import { useRef } from "react";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import { ListIndicator } from "@/shared/style/List";
import { useKeyPress } from "../hook/useKeyPress";
import { searchResultsAtom } from "../store/search.atom";
import {
	ResultDescription,
	ResultItem,
	ResultLink,
	ResultTitle,
} from "../styles/index";
import type { SearchResult } from "@sunub/types";
import { handleKeyArrowDown } from "../utils/handleKeyArrowDown";
import { handleKeyUp } from "../utils/handleKeyArrowUp";

interface SearchResultsListProps {
	onResultClick: () => Promise<void>;
}

export function SearchResultsList({ onResultClick }: SearchResultsListProps) {
	const indexRef = useRef(-1);
	const results = useAtomValue(searchResultsAtom);

	useKeyPress("ArrowDown", handleKeyArrowDown, indexRef);
	useKeyPress("ArrowUp", handleKeyUp, indexRef);

	const handleResultActivate = () => {
		onResultClick();
	};

	return (
		<>
			{results.map(({ postKey, post }: SearchResult) => {
				const { frontmatter } = post;
				const url = `/post/${frontmatter.category}/${frontmatter.slug}`;

				return (
					<ResultItem role="option" key={`${postKey}-${frontmatter.title}`}>
						<VisuallyHidden>{`${frontmatter.title}로 이동하는 링크`}</VisuallyHidden>
						<ListIndicator />
						<ResultLink
							prefetch={false}
							href={url}
							onClick={handleResultActivate}
							tabIndex={0}
						>
							<ResultTitle>{frontmatter.title}</ResultTitle>
							<ResultDescription>{frontmatter.summary}</ResultDescription>
						</ResultLink>
					</ResultItem>
				);
			})}
		</>
	);
}
