import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import styles from "./PostContent.module.css";
import CodeSnippet from "../CodeSnippet";
import Blockquote from "../MdxStyling/Blockquote";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import PostContentImage from "./PostContentImage";
import List from "./List";
import ListItem from "./ListItem";
>>>>>>> refs/remotes/origin/sunub

async function PostContent({ postcontent }) {
  const { content, frontmatter } = await compileMDX({
    source: postcontent,
=======
import PostContentImage from "./PostContentImage";
import List from "./List";
import ListItem from "./ListItem";

async function PostContent({ postcontent }) {
  const { content } = await compileMDX({
    source: postcontent.content,
>>>>>>> dev-v2
    options: { parseFrontmatter: true },
    components: {
      pre: CodeSnippet,
      blockquote: Blockquote,
<<<<<<< HEAD
<<<<<<< HEAD
=======
      PostContentImage: PostContentImage,
      ul: List,
      li: ListItem,
>>>>>>> refs/remotes/origin/sunub
    },
  });
  const { title, date } = frontmatter;
  const time = new Intl.DateTimeFormat("ko-KR").format(date);
=======
      PostContentImage: PostContentImage,
      ul: List,
      li: ListItem,
    },
  });

  const { title, date } = postcontent.metadata;
  const time = new Intl.DateTimeFormat("ko-KR").format(new Date(date));
>>>>>>> dev-v2
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
