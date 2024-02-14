import { FrontMatter } from "type";
import * as Styled from "./BlogPost.style";
import Link from "next/link";
import Blog from "@/db/blog";

type PublishedPost = FrontMatter;

function getRecentlyPublished(): PublishedPost[] {
  const recentlyPublished = Blog.getMetadata().slice(0, 10);

  return recentlyPublished;
}

async function BlogPost() {
  const recentlyPublished = await getRecentlyPublished();

  return (
    <div>
      {recentlyPublished &&
        recentlyPublished.map((frontmatter) => {
          const { slug, title, summary, tags } = frontmatter;
          return (
            <Styled.BlogPostWrapper
              key={`${frontmatter.slug}-${Math.floor(
                Math.random() * 10000 + 1,
              )}`}
            >
              <Link href={`/${slug}`}>
                <Styled.BlogPostTitle>
                  <Styled.Title>{title}</Styled.Title>
                  <Styled.TitleDot />
                  <UnderLineWaveSVG />
                </Styled.BlogPostTitle>
                <Styled.BlogPostContent>{summary}</Styled.BlogPostContent>
              </Link>
            </Styled.BlogPostWrapper>
          );
        })}
    </div>
  );
}

function UnderLineWaveSVG() {
  return (
    <Styled.UnderLineWaveSVG
      xmlns="http://www.w3.org/2000/svg"
      width="94"
      height="11"
      fill="none"
    >
      <Styled.UnderLineWavePath
        d="M3 5.19c4-1.69 14-4.31 16.5 0s4.833 3.747 8.5 0c2.684-2.742 6.472-3.093 9.5 0 3.667 3.747 6.26 3.31 9.5 0 2.633-2.69 6 3.31 11 0 3.459-2.29 5.333 3.747 9 0 3.667-3.746 5.292 5.81 13 0 4.896-3.69 5.248 4.566 11.5 0"
        pathLength=".9"
      />
    </Styled.UnderLineWaveSVG>
  );
}
export default BlogPost;
