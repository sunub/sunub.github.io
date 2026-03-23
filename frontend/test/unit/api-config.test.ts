import { describe, expect, test, vi } from "vitest";

describe("api-config", () => {
	test("rewrite target은 서버 backend url을 우선 사용해 브라우저 same-origin proxy와 SSR이 같은 backend를 바라본다", async () => {
		vi.resetModules();
		vi.stubEnv("BACKEND_API_URL", "http://internal-backend:4008");
		vi.stubEnv("NEXT_PUBLIC_BACKEND_URL", "https://public-backend.example.com");
		try {
			const { resolveBrowserBackendUrl, resolveRewriteTargetUrl } =
				await import("@sunub/contracts");

			expect(resolveBrowserBackendUrl({ env: process.env })).toBe(
				"https://public-backend.example.com",
			);
			expect(resolveRewriteTargetUrl({ env: process.env })).toBe(
				"http://internal-backend:4008",
			);
		} finally {
			vi.unstubAllEnvs();
		}
	});

	test("브라우저에서는 same-origin rewrite 경로만 fetch 후보로 사용한다", async () => {
		vi.resetModules();
		vi.stubEnv("NODE_ENV", "production");
		try {
			const { buildApiRequestCandidates } = await import("@/shared/api/config");

			expect(
				buildApiRequestCandidates(
					"/posts/archive/range?category=all&start=9&end=15",
				),
			).toEqual(["/posts/archive/range?category=all&start=9&end=15"]);
		} finally {
			vi.unstubAllEnvs();
		}
	});

	test("서버에서는 절대 URL 후보를 함께 구성한다", async () => {
		vi.resetModules();
		const originalWindow = globalThis.window;
		// Simulate a server runtime for this module-level helper.
		vi.stubGlobal("window", undefined);

		try {
			const { buildApiRequestCandidates } = await import("@/shared/api/config");
			const candidates = buildApiRequestCandidates("/posts/archive/summary");

			expect(candidates[0]).toMatch(/^https?:\/\/.+\/posts\/archive\/summary$/);
			expect(
				candidates.some((candidate) => candidate.includes("localhost:4008")),
			).toBe(true);
		} finally {
			vi.stubGlobal("window", originalWindow);
		}
	});
});
