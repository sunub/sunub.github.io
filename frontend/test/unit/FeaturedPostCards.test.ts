import type { FrontMatter } from "@sunub/types";
import { describe, expect, test } from "vitest";
import {
	buildFreshChroniclesCards,
	getFreshChroniclesCardKey,
} from "@/components/Main/FreshChronicles";

function createFrontMatter(
	index: number,
	category: FrontMatter["category"] = "code",
): FrontMatter {
	return {
		title: `테스트 포스트 ${index}`,
		date: "2025-07-18T00:00:00.000Z",
		tags: ["javascript", "vite setup"],
		summary: `요약 ${index}`,
		slug: `post-${index}`,
		category,
		completed: true,
	};
}

describe("buildFreshChroniclesCards", () => {
	test("첫 카드는 기본적으로 wide 변형을 사용한다", () => {
		const cards = buildFreshChroniclesCards([
			createFrontMatter(1),
			createFrontMatter(2, "web"),
		]);

		expect(cards[0]?.variant).toBe("wide");
		expect(cards[1]?.variant).toBe("default");
		expect(cards[0]?.eyebrow).toBe("#javascript #vite-setup");
	});

	test("외부 override map으로 variant와 badge를 주입할 수 있다", () => {
		const firstPost = createFrontMatter(1);
		const secondPost = createFrontMatter(2, "algorithm");
		const cards = buildFreshChroniclesCards([firstPost, secondPost], {
			[getFreshChroniclesCardKey(secondPost)]: {
				variant: "wide",
				badge: "Pinned",
				eyebrow: "#custom",
				media: "custom-media",
			},
		});

		expect(cards[1]).toMatchObject({
			variant: "wide",
			badge: "Pinned",
			eyebrow: "#custom",
			media: "custom-media",
		});
	});
});
