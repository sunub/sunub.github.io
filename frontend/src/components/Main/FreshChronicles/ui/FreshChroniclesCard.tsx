import type { FrontMatter } from "@sunub/types";
import { ArrowRight, Binary, Boxes, Cpu, Globe2 } from "lucide-react";
import { createPostCardCssVariables } from "@/components/Main/shared/postCardTheme";
import { getPostDetailHref } from "@/shared/utils/postRoute";
import {
	CardAction,
	CardBadge,
	CardContent,
	CardDate,
	CardEyebrow,
	CardFooter,
	CardLink,
	CardMeta,
	CardMetaRow,
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
	const href = getPostDetailHref(post);
	const formattedDate = formatDate(post.date);

	return (
		<CardLink
			href={href}
			$variant={variant}
			style={createPostCardCssVariables(post)}
			aria-label={`${post.title} 글 보기`}
			data-testid={`fresh-chronicles-card-${index}`}
			data-card-key={`${post.category}/${post.slug}`}
			data-card-variant={variant}
			data-card-category={post.category}
		>
			<CardVisual $variant={variant}>
				{media ? (
					<CardVisualMedia aria-hidden="true">{media}</CardVisualMedia>
				) : (
					<DefaultFreshChroniclesCardMedia post={post} variant={variant} />
				)}
			</CardVisual>
			<CardContent $variant={variant}>
				<CardMeta>
					<CardMetaRow>
						{badge ? <CardBadge>{badge}</CardBadge> : null}
						<CardDate dateTime={new Date(post.date).toISOString()}>
							{formattedDate}
						</CardDate>
					</CardMetaRow>
					<CardEyebrow>{eyebrow}</CardEyebrow>
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
