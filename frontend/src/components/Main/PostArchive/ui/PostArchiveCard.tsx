"use client";

import type { FrontMatter } from "@sunub/types";
import { ArrowRight } from "lucide-react";
import { createPostCardCssVariables } from "@/components/Main/shared/postCardTheme";
import { getCategoryIcon } from "@/shared/utils/icons";
import { getPostDetailHref } from "@/shared/utils/postRoute";
import {
	ArchiveCardAction,
	ArchiveCardCategory,
	ArchiveCardContent,
	ArchiveCardDate,
	ArchiveCardFooter,
	ArchiveCardImage,
	ArchiveCardLink,
	ArchiveCardMedia,
	ArchiveCardMeta,
	ArchiveCardSummary,
	ArchiveCardTitle,
	ArchiveCardVisual,
	ArchiveCardVisualFrame,
	ArchiveCardVisualLayer,
	ArchiveTag,
	ArchiveTagList,
} from "../style";
import type { PostArchiveCardMedia } from "../types";
import {
	formatPostArchiveDate,
	getPostArchiveCategoryLabel,
	getPostArchiveMediaAlt,
} from "../utils";

function DefaultArchiveCardVisual({ post }: { post: FrontMatter }) {
	const Icon = getCategoryIcon(post.category);

	return (
		<>
			<ArchiveCardVisualLayer />
			<ArchiveCardVisualLayer $secondary />
			<ArchiveCardVisualFrame aria-hidden="true">
				<Icon size={72} strokeWidth={1.65} />
			</ArchiveCardVisualFrame>
		</>
	);
}

function ArchiveCardInjectedMedia({
	post,
	media,
}: {
	post: FrontMatter;
	media: PostArchiveCardMedia;
}) {
	return (
		<ArchiveCardMedia $background={media.background}>
			<ArchiveCardImage
				src={media.src}
				alt={getPostArchiveMediaAlt(post, media)}
				loading="lazy"
				decoding="async"
				$objectFit={media.objectFit ?? "cover"}
			/>
		</ArchiveCardMedia>
	);
}

export function PostArchiveCard({
	post,
	index,
	media,
	onNavigate,
}: {
	post: FrontMatter;
	index: number;
	media?: PostArchiveCardMedia;
	onNavigate?: (post: FrontMatter, index: number) => void;
}) {
	const href = getPostDetailHref(post);

	return (
		<ArchiveCardLink
			href={href}
			onClick={() => onNavigate?.(post, index)}
			style={createPostCardCssVariables(post)}
			aria-label={`${post.title} 글 보기`}
			data-testid={`post-archive-card-${index}`}
			data-card-key={`${post.category}/${post.slug}`}
			data-card-category={post.category}
		>
			<ArchiveCardVisual>
				{media ? (
					<ArchiveCardInjectedMedia post={post} media={media} />
				) : (
					<DefaultArchiveCardVisual post={post} />
				)}
			</ArchiveCardVisual>
			<ArchiveCardContent>
				<ArchiveCardMeta>
					<ArchiveCardCategory>
						{getPostArchiveCategoryLabel(post.category)}
					</ArchiveCardCategory>
					<ArchiveCardDate dateTime={new Date(post.date).toISOString()}>
						{formatPostArchiveDate(post.date)}
					</ArchiveCardDate>
				</ArchiveCardMeta>
				<ArchiveCardTitle>{post.title}</ArchiveCardTitle>
				<ArchiveCardSummary>{post.summary}</ArchiveCardSummary>
				<ArchiveCardFooter>
					<ArchiveTagList aria-label={`${post.title} 태그`}>
						{post.tags.slice(0, 2).map((tag) => (
							<ArchiveTag key={`${post.slug}-${tag}`}>#{tag}</ArchiveTag>
						))}
					</ArchiveTagList>
					<ArchiveCardAction>
						Read
						<ArrowRight size={16} strokeWidth={2.2} />
					</ArchiveCardAction>
				</ArchiveCardFooter>
			</ArchiveCardContent>
		</ArchiveCardLink>
	);
}
