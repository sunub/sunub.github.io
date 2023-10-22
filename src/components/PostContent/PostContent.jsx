import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import styles from "./PostContent.module.css";
import CodeSnippet from "../CodeSnippet";
import Blockquote from "../MdxStyling/Blockquote";

async function PostContent({ postcontent }) {
	const { content, frontmatter } = await compileMDX({
		source: postcontent,
		options: { parseFrontmatter: true },
		components: {
			pre: CodeSnippet,
			blockquote: Blockquote,
		},
	});
	const { title, date } = frontmatter;
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
