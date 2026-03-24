/**
 * @typedef {import("@sunub/types").PostCategory} PostCategory
 * @typedef {import("@sunub/types").PublicPostFrontMatter} PublicPostFrontMatter
 * @typedef {import("@sunub/types").SearchResult} SearchResult
 * @typedef {import("@sunub/types").StaticSearchIndexEntry} StaticSearchIndexEntry
 */

const MAX_MATCHES_PER_FIELD = 5;
const EXACT_TITLE_MATCH_PRIORITY = 0;
const TITLE_MATCH_PRIORITY = 1;
const TAG_OR_CATEGORY_MATCH_PRIORITY = 2;
const SUMMARY_MATCH_PRIORITY = 3;
const HEADING_MATCH_PRIORITY = 4;
const BODY_MATCH_PRIORITY = 5;

export const CATEGORY_SEARCH_TERMS =
	/** @type {Record<PostCategory, string[]>} */ ({
		web: ["web", "웹"],
		algorithm: ["algorithm", "알고리즘"],
		code: ["code", "코드"],
		cs: [
			"cs",
			"computer science",
			"computer-science",
			"컴퓨터 과학",
			"컴퓨터사이언스",
		],
	});

const MARKDOWN_HEADING_PATTERN = /^\s{0,3}#{1,6}\s+(.*)$/;
const CODE_FENCE_PATTERN = /^(```|~~~)/;
const IMPORT_OR_EXPORT_PATTERN = /^(import|export)\s/;
const HORIZONTAL_RULE_PATTERN = /^(\*\s*\*\s*\*|-{3,}|_{3,})$/;

export function normalizeSearchText(text) {
	return text.replace(/\s+/g, " ").trim();
}

export function extractSearchableContent(content) {
	const lines = content.split(/\r?\n/);
	const headings = [];
	const bodyLines = [];
	let isInsideCodeFence = false;

	for (const line of lines) {
		const trimmedLine = line.trim();
		if (!trimmedLine) {
			continue;
		}

		if (CODE_FENCE_PATTERN.test(trimmedLine)) {
			isInsideCodeFence = !isInsideCodeFence;
			continue;
		}

		if (isInsideCodeFence) {
			continue;
		}

		if (
			IMPORT_OR_EXPORT_PATTERN.test(trimmedLine) ||
			HORIZONTAL_RULE_PATTERN.test(trimmedLine)
		) {
			continue;
		}

		const headingMatch = line.match(MARKDOWN_HEADING_PATTERN);
		if (headingMatch) {
			const headingText = normalizeSearchText(
				cleanMarkdownText(headingMatch[1]),
			);
			if (headingText) {
				headings.push(headingText);
			}
			continue;
		}

		const cleanedLine = normalizeSearchText(cleanMarkdownText(line));
		if (cleanedLine) {
			bodyLines.push(cleanedLine);
		}
	}

	return {
		headings,
		bodyText: normalizeSearchText(bodyLines.join(" ")),
	};
}

function cleanMarkdownText(text) {
	return text
		.replace(/!\[([^\]]*)\]\([^)]+\)/g, " $1 ")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, " $1 ")
		.replace(/`([^`]+)`/g, " $1 ")
		.replace(/<[^>]+>/g, " ")
		.replace(/^>\s?/g, "")
		.replace(/^\s*[-*+]\s+/g, "")
		.replace(/^\s*\d+\.\s+/g, "")
		.replace(/\|/g, " ")
		.replace(/[*_~]/g, " ");
}

function isKr(char) {
	const code = char.charCodeAt(0);
	return (
		("ㄱ".charCodeAt(0) <= code && code <= "ㅎ".charCodeAt(0)) ||
		("가".charCodeAt(0) <= code && code <= "힣".charCodeAt(0))
	);
}

function krNum(char) {
	return char.charCodeAt(0) - "가".charCodeAt(0);
}

function krList(char) {
	const jaeumList = [
		"ㄱ",
		"ㄲ",
		"ㄴ",
		"ㄷ",
		"ㄸ",
		"ㄹ",
		"ㅁ",
		"ㅂ",
		"ㅃ",
		"ㅅ",
		"ㅆ",
		"ㅇ",
		"ㅈ",
		"ㅉ",
		"ㅊ",
		"ㅋ",
		"ㅌ",
		"ㅍ",
		"ㅎ",
	];
	const result = [char];
	const index = krNum(char);

	if (index >= 0) {
		if (index % 28 !== 0) {
			result.push(
				String.fromCharCode(Math.floor(index / 28) * 28 + "가".charCodeAt(0)),
			);
		}
		result.push(jaeumList[Math.floor(index / 588)]);
	}

	return result;
}

function eqKr(source, destination) {
	if (isKr(source) && isKr(destination)) {
		return krList(destination).includes(source);
	}

	return source.toLowerCase() === destination.toLowerCase();
}

function eqKrPos(source, destination, nextDestination = "") {
	const isFullSyllable = (char) =>
		char.charCodeAt(0) >= "가".charCodeAt(0) &&
		char.charCodeAt(0) <= "힣".charCodeAt(0);

	if (
		!(
			isFullSyllable(source) &&
			isFullSyllable(destination) &&
			(nextDestination === "" || isFullSyllable(nextDestination))
		)
	) {
		return false;
	}

	const jaeumList = [
		"ㄱ",
		"ㄲ",
		"ㄴ",
		"ㄷ",
		"ㄸ",
		"ㄹ",
		"ㅁ",
		"ㅂ",
		"ㅃ",
		"ㅅ",
		"ㅆ",
		"ㅇ",
		"ㅈ",
		"ㅉ",
		"ㅊ",
		"ㅋ",
		"ㅌ",
		"ㅍ",
		"ㅎ",
	];
	const krPos = [
		[0, 0],
		[1, 0],
		[2, 1],
		[2, 9],
		[4, 2],
		[1, 12],
		[2, 18],
		[7, 3],
		[8, 5],
		[1, 0],
		[2, 6],
		[3, 7],
		[4, 9],
		[5, 16],
		[6, 17],
		[7, 18],
		[16, 6],
		[17, 7],
		[1, 9],
		[19, 9],
		[20, 10],
		[21, 11],
		[22, 12],
		[23, 14],
		[24, 15],
		[25, 16],
		[26, 17],
		[27, 18],
	];

	const index = krNum(source);
	const jong = index % 28;
	const [leadDiff, nextChoIdx] = krPos[jong];
	const leadChar = String.fromCharCode(source.charCodeAt(0) - leadDiff);
	const choChar = jaeumList[nextChoIdx];

	return leadChar === destination && krList(nextDestination).includes(choChar);
}

export function findMatches(query, data, options = {}) {
	const { limit = Number.POSITIVE_INFINITY } = options;

	if (!query || !data || limit <= 0) {
		return [];
	}

	const qLower = query.toLowerCase();
	const dLower = data.toLowerCase();
	const results = [];
	const qLength = qLower.length;
	const dLength = dLower.length;

	for (let index = 0; index <= dLength - qLength; index += 1) {
		let isMatch = true;

		for (let cursor = 0; cursor < qLength; cursor += 1) {
			const queryChar = qLower[cursor];
			const dataChar = dLower[index + cursor];

			if (cursor === qLength - 1) {
				const originalQueryChar = query[cursor];
				const originalDataChar = data[index + cursor];
				const originalNextDataChar = data[index + cursor + 1] ?? "";

				if (isKr(originalQueryChar) && isKr(originalDataChar)) {
					if (!eqKr(originalQueryChar, originalDataChar)) {
						if (
							eqKrPos(originalQueryChar, originalDataChar, originalNextDataChar)
						) {
							continue;
						}

						isMatch = false;
						break;
					}
				} else if (queryChar !== dataChar) {
					isMatch = false;
					break;
				}
			} else if (queryChar !== dataChar) {
				isMatch = false;
				break;
			}
		}

		if (isMatch) {
			results.push(data.slice(index, index + qLength));
			if (results.length >= limit) {
				return results;
			}
		}
	}

	return results;
}

function findMatchesInTexts(query, texts) {
	const uniqueMatches = [];
	const seen = new Set();

	for (const text of texts) {
		const remainingLimit = MAX_MATCHES_PER_FIELD - uniqueMatches.length;
		if (remainingLimit <= 0) {
			break;
		}

		const matches = findMatches(query, text, { limit: remainingLimit });
		for (const match of matches) {
			if (seen.has(match)) {
				continue;
			}

			seen.add(match);
			uniqueMatches.push(match);

			if (uniqueMatches.length >= MAX_MATCHES_PER_FIELD) {
				return uniqueMatches;
			}
		}
	}

	return uniqueMatches;
}

function normalizeForExactMatch(text) {
	return text.trim().replace(/\s+/g, " ");
}

function isExactTitleMatch(query, result) {
	if (result.titleMatches.length === 0) {
		return false;
	}

	const normalizedQuery = normalizeForExactMatch(query);
	const normalizedTitle = normalizeForExactMatch(result.post.frontmatter.title);

	if (normalizedQuery.length !== normalizedTitle.length) {
		return false;
	}

	return findMatches(normalizedQuery, normalizedTitle, { limit: 1 }).length > 0;
}

function getMatchPriority(query, result) {
	if (isExactTitleMatch(query, result)) {
		return EXACT_TITLE_MATCH_PRIORITY;
	}

	if (result.titleMatches.length > 0) {
		return TITLE_MATCH_PRIORITY;
	}

	if (result.tagMatches.length > 0 || result.categoryMatches.length > 0) {
		return TAG_OR_CATEGORY_MATCH_PRIORITY;
	}

	if (result.summaryMatches.length > 0) {
		return SUMMARY_MATCH_PRIORITY;
	}

	if (result.headingMatches.length > 0) {
		return HEADING_MATCH_PRIORITY;
	}

	return BODY_MATCH_PRIORITY;
}

function shouldSearchBody(query) {
	return query.length >= 2;
}

function getPublishedAt(result) {
	const publishedAt = new Date(result.post.frontmatter.date).getTime();
	return Number.isNaN(publishedAt) ? 0 : publishedAt;
}

/**
 * @param {string} query
 * @param {StaticSearchIndexEntry[]} entries
 * @returns {SearchResult[]}
 */
export function searchEntries(query, entries) {
	const normalizedQuery = query.trim();
	if (!normalizedQuery) {
		return [];
	}

	/** @type {SearchResult[]} */
	const results = [];

	for (const entry of entries) {
		const { title, summary, tags, category } = entry.post.frontmatter;
		const titleMatches = findMatches(normalizedQuery, title, {
			limit: MAX_MATCHES_PER_FIELD,
		});
		const summaryMatches = findMatches(normalizedQuery, summary, {
			limit: MAX_MATCHES_PER_FIELD,
		});
		const tagMatches = findMatchesInTexts(normalizedQuery, tags);
		const categoryMatches = findMatchesInTexts(
			normalizedQuery,
			CATEGORY_SEARCH_TERMS[category],
		);

		const hasFrontmatterMatch =
			titleMatches.length > 0 ||
			summaryMatches.length > 0 ||
			tagMatches.length > 0 ||
			categoryMatches.length > 0;

		let headingMatches = [];
		let bodyMatches = [];

		if (!hasFrontmatterMatch) {
			headingMatches = findMatchesInTexts(normalizedQuery, entry.headings);

			if (!headingMatches.length && shouldSearchBody(normalizedQuery)) {
				bodyMatches = findMatches(normalizedQuery, entry.bodyText, {
					limit: MAX_MATCHES_PER_FIELD,
				});
			}
		}

		if (
			!hasFrontmatterMatch &&
			headingMatches.length === 0 &&
			bodyMatches.length === 0
		) {
			continue;
		}

		results.push({
			postKey: entry.postKey,
			post: entry.post,
			titleMatches,
			summaryMatches,
			tagMatches,
			categoryMatches,
			headingMatches,
			bodyMatches,
		});
	}

	return results.sort((left, right) => {
		const priorityDiff =
			getMatchPriority(normalizedQuery, left) -
			getMatchPriority(normalizedQuery, right);

		if (priorityDiff !== 0) {
			return priorityDiff;
		}

		return getPublishedAt(right) - getPublishedAt(left);
	});
}
