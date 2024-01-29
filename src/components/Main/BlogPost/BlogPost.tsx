import { FrontMatter } from "type";
import * as Styled from "./BlogPost.style";
import Link from "next/link";

type PublishedPost = FrontMatter;

function BlogPost({
  recentlyPublished,
}: {
  recentlyPublished: PublishedPost[];
}) {
  return (
    <Styled.Wrapper>
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
    </Styled.Wrapper>
  );
}

function UnderLineWaveSVG() {
  return (
    <Styled.UnderLineWaveSVG
      width="94"
      height="11"
      viewBox="0 0 94 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Styled.UnderLineWavePath
        d="M3 5.19021C7 3.50001 17 0.880417 19.5 5.19021C22 9.5 24.3334 8.9366 28 5.19021C30.6837 2.44819 34.4725 2.09696 37.5 5.19021C41.1667 8.9366 43.7607 8.50001 47 5.19021C49.633 2.50001 53 8.5 58 5.19021C61.4587 2.90068 63.3333 8.9366 67 5.19021C70.6666 1.44381 72.2917 11 80 5.19021C84.8961 1.50001 85.2477 9.75613 91.5 5.19021"
        pathLength={0.9}
      />
    </Styled.UnderLineWaveSVG>
  );
}

export default BlogPost;
