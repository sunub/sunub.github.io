"use client";

import { createElement } from "react";
import { MDXComponents } from "@/MDXContents";
import { Blockquote } from "./BlockQuote";
import { InlineCode } from "./CodeBlock";
import DynamicCodeBlock from "./CodeBlock/ui/DynamicCodeBlock";
import { CustomLink } from "./CustomLink";
import { ListItem } from "./ListItem";
import {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	LinkAnchor,
	LinkSVG,
	P,
} from "./PostArticleComponents.style";
import { PostImage } from "./PostImage";
import { UnOrderedList } from "./UnOrderedList";
import { Video } from "./Video";

function LinkIcon() {
	return (
		<LinkSVG
			xmlns="http://www.w3.org/2000/svg"
			width="36"
			height="36"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="feather feather-hash"
		>
			<line x1="4" y1="9" x2="20" y2="9"></line>
			<line x1="4" y1="15" x2="20" y2="15"></line>
			<line x1="10" y1="3" x2="8" y2="21"></line>
			<line x1="16" y1="3" x2="14" y2="21"></line>
		</LinkSVG>
	);
}

function slugify(str: string) {
	return str.toString().trim().replace(/ /g, "-");
}

const headers = [H1, H2, H3, H4, H5, H6];

function getHeaderByLevel(level: number) {
	return headers[level - 1] || H1;
}

function createHeadingComponent(level: number) {
	const HeadingComponent = ({ children }: { children: string }) => {
		const slug = slugify(children);
		const header = getHeaderByLevel(level);
		return createElement(header, { id: slug }, [
			createElement(LinkAnchor, { href: `#${slug}`, key: `${slug}` }, [
				createElement(LinkIcon, { key: `${slug}-icon` }),
			]),
			createElement(
				"span",
				{ key: `${slug}-content`, className: "post-heading-titles" },
				children,
			),
		]);
	};

	HeadingComponent.displayName = `HeadingComponent${level}`;
	return HeadingComponent;
}

type CodeProps = {
	className: string;
	children: React.ReactNode;
};

const PostArticleComponents = {
	h1: createHeadingComponent(1),
	h2: createHeadingComponent(2),
	h3: createHeadingComponent(3),
	h4: createHeadingComponent(4),
	h5: createHeadingComponent(5),
	h6: createHeadingComponent(6),
	p: ({ children }: { children: React.ReactNode }) => <P>{children}</P>,
	img: PostImage,
	Video,
	pre: ({ children }: { children: React.ReactNode }) => children,
	code: ({ className, ...props }: CodeProps) => {
		if (className?.startsWith("language-")) {
			return <DynamicCodeBlock className={className} {...props} />;
		}
		return <InlineCode className={className} {...props} />;
	},
	ul: UnOrderedList,
	li: ListItem,
	blockquote: Blockquote,
	a: CustomLink,
	...MDXComponents,
};

export { PostArticleComponents };
