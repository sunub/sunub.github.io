export interface SearchableContent {
	headings: string[];
	bodyText: string;
}

const MARKDOWN_HEADING_PATTERN = /^\s{0,3}#{1,6}\s+(.*)$/;
const CODE_FENCE_PATTERN = /^(```|~~~)/;
const IMPORT_OR_EXPORT_PATTERN = /^(import|export)\s/;
const HORIZONTAL_RULE_PATTERN = /^(\*\s*\*\s*\*|-{3,}|_{3,})$/;

export function normalizeSearchText(text: string): string {
	return text.replace(/\s+/g, " ").trim();
}

export function extractSearchableContent(content: string): SearchableContent {
	const lines = content.split(/\r?\n/);
	const headings: string[] = [];
	const bodyLines: string[] = [];
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

function cleanMarkdownText(text: string): string {
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
