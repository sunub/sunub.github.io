import React from "react";
// import Spacer from "../Spacer";
import { MDXRemote, compileMDX } from "next-mdx-remote/rsc";
import styles from "./PostContent.module.css";

// const Container = styled.div`
// 	grid-area: main-content;

// 	position: relative;
// 	width: 100%;
// 	max-width: 1100px;

// 	margin-left: auto;
// 	margin-right: auto;
// `;

// const Article = styled.article`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;

// 	word-spacing: 0.2ch;
// 	text-align: left;

// 	background-color: var(--color-background);
// 	box-shadow: var(--box-shadow-2);

// 	text-align: left;
// `;

// const Header = styled.header`
// 	text-align: center;
// `;

// const Title = styled.h1`
// 	font-size: calc(2.76rem);
// 	text-align: center;
// 	color: color-mix(in oklch, var(--color-highlightColor) 90%, transparent);
// `;
// const Date = styled.dl`
// 	text-align: center;
// 	color: color-mix(in oklch, var(--color-text) 50%, transparent);
// 	font-size: var(--size-4);
// `;

// const Main = styled.main`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;

// 	width: 100%;
// 	max-width: 800px;

// 	row-gap: 1.5rem;
// 	margin-left: auto;
// 	margin-right: auto;
// 	padding-left: 32px;
// 	padding-right: 32px;
// `;

async function PostContent({ postcontent }) {
	const { content, frontmatter } = await compileMDX({
		source: postcontent,
		options: { parseFrontmatter: true },
	});
	return (
		<div className={styles.Wrapper} key={crypto.randomUUID()}>
			<h1>{frontmatter.title}</h1>
			{content}
		</div>
	);
}

export default PostContent;

// <article>
// 	<Spacer axis="vertical" size={144} />
// 	<header>
// 		<h1>{frontMatter.title}</h1>
// 		<time className="post__article__header--date">
// 			<dd>{frontMatter.date}</dd>
// 		</time>
// 	</header>
// 	<Spacer axis="vertical" size={120} />
// 	<main
// 		className="post__article__main"
// 		dangerouslySetInnerHTML={{ __html: `${content}` }}
// 	/>
// 	<Spacer axis="vertical" size={144} />
// </article>
