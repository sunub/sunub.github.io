import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import styles from "./PostContent.module.css";
import CodeSnippet from "../CodeSnippet";

async function PostContent({ postcontent }) {
	const { content, frontmatter } = await compileMDX({
		source: postcontent,
		options: { parseFrontmatter: true },
		components: {
			pre: CodeSnippet,
		},
	});
	const { title, date, tags, summary, slug, category } = frontmatter;
	const time = new Intl.DateTimeFormat("ko-KR").format(date);
	return (
		<div className={styles.Wrapper}>
			<article className={styles.Article}>
				<header className={styles.Header}>
					<h1 className={styles.Title}>{title}</h1>
					<time dateTime={time}>{time}</time>
				</header>
				<main style={{ maxWidth: "675px" }} className={styles.Main}>
					{content}
				</main>
			</article>
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
