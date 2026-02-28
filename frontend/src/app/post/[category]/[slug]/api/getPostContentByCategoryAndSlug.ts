"use server";

import { API_PATHS } from "@/shared/api/endpoints";
import { apiGet } from "@/shared/api/http";
import { SpecificPostInfoSchema } from "@sunub/types";
import { NotFoundError } from "@/shared/error";
import type {
	PostCategory,
	SpecificPostInfo,
	PostFrontMatter,
} from "@sunub/types";

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

type ErrorLikeResponse = {
	statusCode?: unknown;
	error?: unknown;
	message?: unknown;
};

function isErrorLikeResponse(value: unknown): value is ErrorLikeResponse {
	return (
		isObject(value) &&
		("statusCode" in value || "error" in value || "message" in value)
	);
}

function getResponseErrorMessage(
	value: unknown,
): { statusCode?: number; message?: string; error?: string } | null {
	if (!isErrorLikeResponse(value)) {
		return null;
	}

	const statusCode =
		typeof value.statusCode === "number" ? value.statusCode : undefined;
	const message = typeof value.message === "string" ? value.message : undefined;
	const error = typeof value.error === "string" ? value.error : undefined;

	if (
		statusCode === undefined &&
		message === undefined &&
		error === undefined
	) {
		return null;
	}

	return { statusCode, message, error };
}

function getStringContent(value: unknown): string | undefined {
	if (isObject(value)) {
		if (typeof value.content === "string") {
			return value.content;
		}
		const nestedData = value as {
			data?: unknown;
			post?: unknown;
			result?: unknown;
			payload?: unknown;
		};
		return (
			getStringContent(nestedData.data) ??
			getStringContent(nestedData.post) ??
			getStringContent(nestedData.result) ??
			getStringContent(nestedData.payload)
		);
	}

	if (Array.isArray(value)) {
		for (const item of value) {
			const content = getStringContent(item);
			if (typeof content === "string") {
				return content;
			}
		}
	}

	return undefined;
}

async function getPostsMetadataByCategory(
	category: PostCategory,
): Promise<PostFrontMatter[]> {
	const data = await apiGet<unknown>(API_PATHS.posts.byCategory(category));
	if (!Array.isArray(data)) {
		return [];
	}

	const normalized = data
		.map((item) => {
			if (
				typeof item === "object" &&
				item !== null &&
				"frontmatter" in item &&
				"filePath" in item
			) {
				return item as PostFrontMatter;
			}
			return null;
		})
		.filter((item): item is PostFrontMatter => item !== null);

	return normalized;
}

export async function getPostContentByCategoryAndSlug(
	category: PostCategory,
	slug: string,
): Promise<SpecificPostInfo | null> {
	const data = await apiGet<unknown>(API_PATHS.posts.bySlug(category, slug));

	const responseError = getResponseErrorMessage(data);
	if (
		responseError?.statusCode === 404 ||
		responseError?.error === "Not Found"
	) {
		throw new NotFoundError(
			responseError.message ?? "요청하신 포스트를 찾을 수 없습니다.",
		);
	}
	if (responseError?.statusCode && responseError.statusCode >= 500) {
		throw new Error(
			responseError.message ??
				responseError.error ??
				"서버에서 포스트를 정상적으로 읽어오지 못했습니다.",
		);
	}

	const candidates: unknown[] = [];
	const pushCandidate = (value: unknown) => {
		if (value !== undefined && value !== null) {
			candidates.push(value);
		}
	};

	pushCandidate(data);

	if (typeof data === "string") {
		try {
			const parsedAsJson = JSON.parse(data);
			pushCandidate(parsedAsJson);
		} catch {
			// ignore plain text payload
		}
	}

	if (isObject(data)) {
		const nested = data as {
			data?: unknown;
			post?: unknown;
			result?: unknown;
			payload?: unknown;
			response?: unknown;
		};
		pushCandidate(nested.data);
		pushCandidate(nested.post);
		pushCandidate(nested.result);
		pushCandidate(nested.payload);
		pushCandidate(nested.response);
		if (isObject(nested.response)) {
			const responseBody = nested.response as {
				data?: unknown;
				post?: unknown;
				result?: unknown;
				payload?: unknown;
			};
			pushCandidate(responseBody.data);
			pushCandidate(responseBody.post);
			pushCandidate(responseBody.result);
			pushCandidate(responseBody.payload);
		}
	}

	if (Array.isArray(data)) {
		for (const item of data) {
			pushCandidate(item);
		}
	}

	const parsedCandidates = candidates.map((candidate) =>
		SpecificPostInfoSchema.safeParse(candidate),
	);
	const parsedResult = parsedCandidates.find((result) => result.success);

	if (parsedResult) {
		return parsedResult.data;
	}

	const issues = parsedCandidates
		.filter((result) => !result.success)
		.flatMap((result) => result.error.issues);

	const fallback = await (async () => {
		const content = getStringContent(data);
		if (typeof content !== "string") {
			return null;
		}

		const listData = await getPostsMetadataByCategory(category);
		const matched = listData.find(
			({ frontmatter }) => frontmatter.slug === slug,
		);
		if (!matched) {
			return null;
		}

		return {
			frontmatter: matched.frontmatter,
			content,
		} satisfies SpecificPostInfo;
	})();

	if (fallback) {
		return fallback;
	}

	const responseMeta =
		responseError &&
		([responseError.message, responseError.error]
			.filter((value): value is string => typeof value === "string")
			.join(" - ") ||
			null);

	const debugData = isObject(data)
		? {
				keys: Object.keys(data),
				raw: data,
			}
		: { raw: data };

	console.error(
		`post content parse failed for /posts/${category}/${slug}:`,
		issues,
		responseMeta ? `backend-response: ${responseMeta}` : "",
		debugData,
	);
	return null;
}
