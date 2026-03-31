import { describe, expect, test } from "vitest";
import {
	normalizePublicImageSource,
	resolvePostImageSource,
	transformObsidianImageEmbeds,
} from "@/components/ui/PostArticleComponents/ui/PostImage/model/imageSource";

describe("post image source helpers", () => {
	test("normalizes public image sources without a leading slash", () => {
		expect(normalizePublicImageSource("images/cs/cpu_structure.png")).toBe(
			"/images/cs/cpu_structure.png",
		);
	});

	test("resolves obsidian image embeds that already point to the public images root", () => {
		expect(
			transformObsidianImageEmbeds(
				"![[images/web/브라우저 아키텍처/about-browser-architecture-02.png]]",
				{ category: "web" },
			),
		).toBe(
			"![about browser architecture 02](/images/web/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98/about-browser-architecture-02.png)",
		);
	});

	test("resolves relative obsidian image embeds against the post category", () => {
		expect(resolvePostImageSource("./stream.png", { category: "web" })).toBe(
			"/images/web/stream.png",
		);
		expect(
			resolvePostImageSource("session_based_authenticate.png", {
				category: "web",
			}),
		).toBe("/images/web/session_based_authenticate.png");
	});

	test("keeps a textual embed modifier as alt text", () => {
		expect(
			transformObsidianImageEmbeds("![[./stream.png|스트림 다이어그램]]", {
				category: "web",
			}),
		).toBe("![스트림 다이어그램](/images/web/stream.png)");
	});
});
