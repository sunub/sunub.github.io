import type { FrontMatter } from "@sunub/types";
import { ArrowRight, Binary, Boxes, Cpu, Globe2 } from "lucide-react";
import type { CSSProperties } from "react";
import {
	CardAction,
	CardBadge,
	CardContent,
	CardDate,
	CardEyebrow,
	CardFooter,
	CardLink,
	CardMeta,
	CardSummary,
	CardTitle,
	CardVisual,
	CardVisualFrame,
	CardVisualMedia,
	CardVisualOrb,
	TagItem,
	TagList,
} from "../style";
import type {
	FreshChroniclesCardData,
	FreshChroniclesCardVariant,
} from "../types";

type CategoryTheme = {
	accent: string;
	surface: string;
	visualSurface: string;
};

const CATEGORY_THEME: Record<FrontMatter["category"], CategoryTheme> = {
	code: {
		accent: "oklch(63% 0.21 302)",
		surface: "color-mix(in oklch, var(--color-background) 92%, white 8%)",
		visualSurface: "oklch(95% 0.03 300)",
	},
	web: {
		accent: "oklch(67% 0.16 244)",
		surface: "color-mix(in oklch, var(--color-background) 93%, white 7%)",
		visualSurface: "oklch(95% 0.03 242)",
	},
	cs: {
		accent: "oklch(69% 0.16 165)",
		surface: "color-mix(in oklch, var(--color-background) 92%, white 8%)",
		visualSurface: "oklch(96% 0.03 168)",
	},
	algorithm: {
		accent: "oklch(76% 0.17 82)",
		surface: "color-mix(in oklch, var(--color-background) 92%, white 8%)",
		visualSurface: "oklch(96% 0.04 86)",
	},
};

function formatDate(date: FrontMatter["date"]) {
	return new Intl.DateTimeFormat("ko-KR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
}

function getCategoryIcon(category: FrontMatter["category"]) {
	switch (category) {
		case "algorithm":
			return Binary;
		case "cs":
			return Cpu;
		case "web":
			return Globe2;
		default:
			return Boxes;
	}
}

function createCardCssVariables(post: FrontMatter): CSSProperties {
	const theme = CATEGORY_THEME[post.category];

	return {
		["--fresh-chronicles-accent" as string]: theme.accent,
		["--fresh-chronicles-surface" as string]: theme.surface,
		["--fresh-chronicles-visual-surface" as string]: theme.visualSurface,
	};
}

function DefaultFreshChroniclesCardMedia({
	post,
	variant,
}: {
	post: FrontMatter;
	variant: FreshChroniclesCardVariant;
}) {
	const Icon = getCategoryIcon(post.category);

	return (
		<>
			<CardVisualOrb />
			<CardVisualOrb $secondary />
			<CardVisualFrame $variant={variant} aria-hidden="true">
				<Icon size={variant === "wide" ? 104 : 72} strokeWidth={1.6} />
			</CardVisualFrame>
		</>
	);
}

export function FreshChroniclesCard({
	card,
	index,
}: {
	card: FreshChroniclesCardData;
	index: number;
}) {
	const { post, variant, media, badge, eyebrow } = card;
	const href = `/post/${post.category}/${post.slug}`;
	const formattedDate = formatDate(post.date);

	return (
		<CardLink
			href={href}
			$variant={variant}
			style={createCardCssVariables(post)}
			aria-label={`${post.title} 글 보기`}
			data-testid={`fresh-chronicles-card-${index}`}
			data-card-key={`${post.category}/${post.slug}`}
			data-card-variant={variant}
		>
			<CardVisual $variant={variant}>
				{media ? (
					<CardVisualMedia aria-hidden="true">{media}</CardVisualMedia>
				) : (
					<DefaultFreshChroniclesCardMedia post={post} variant={variant} />
				)}
			</CardVisual>
			<CardContent $variant={variant}>
				{badge ? <CardBadge>{badge}</CardBadge> : null}
				<CardMeta>
					<CardEyebrow>{eyebrow}</CardEyebrow>
					<CardDate dateTime={new Date(post.date).toISOString()}>
						{formattedDate}
					</CardDate>
				</CardMeta>
				<CardTitle $variant={variant}>{post.title}</CardTitle>
				<CardSummary $variant={variant}>{post.summary}</CardSummary>
				<CardFooter>
					<TagList aria-label={`${post.title} 태그`}>
						{post.tags.slice(0, 3).map((tag) => (
							<TagItem key={`${post.slug}-${tag}`}>#{tag}</TagItem>
						))}
					</TagList>
					<CardAction>
						글 읽기
						<ArrowRight size={16} strokeWidth={2.2} />
					</CardAction>
				</CardFooter>
			</CardContent>
		</CardLink>
	);
}
