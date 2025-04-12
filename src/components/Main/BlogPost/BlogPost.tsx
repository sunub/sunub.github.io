import * as Styled from "./BlogPost.style";
import Link from "next/link";
import { getRecentPostsMetadata } from "db/blog/api";
import { z } from "zod";
import { FrontMatterSchema } from "@/types/schema";
import { VisuallyHidden } from "@/components/VisuallyHidden";

type PostMetadata = z.infer<typeof FrontMatterSchema>;

async function BlogPost({ initialPosts }: { initialPosts?: PostMetadata[] }) {
  const recentlyPublished = initialPosts || (await getRecentPostsMetadata(10));

  if (!recentlyPublished || recentlyPublished.length === 0) {
    return <div>현재 표시할 포스트가 없습니다.</div>;
  }

  return (
    <Styled.BlogPostList>
      {recentlyPublished.map((post) => {
        const { slug, title, summary, category, date } = post;
        const localeDate = new Intl.DateTimeFormat("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(date));
        const webStandardDate = new Date(date).toISOString().split("T")[0];

        return (
          <Styled.BlogPostListItem key={`${category}-${slug}`}>
            <Styled.BlogPostWrapper>
              <Link href={`/post/${category}/${slug}`} scroll={true}>
                <VisuallyHidden>
                  {`${title} 포스트로 이동합니다.`}
                </VisuallyHidden>
                <Styled.BlogPostTitle>
                  <Styled.Title>{title}</Styled.Title>
                  <Styled.TitleDot />
                  <UnderLineWaveSVG />
                </Styled.BlogPostTitle>
                <Styled.BlogPostContent>{summary}</Styled.BlogPostContent>
              </Link>
            </Styled.BlogPostWrapper>
            <Styled.Footer>
              <Styled.Date dateTime={webStandardDate}>{localeDate}</Styled.Date>
            </Styled.Footer>
          </Styled.BlogPostListItem>
        );
      })}
    </Styled.BlogPostList>
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

function BlogPostWithSuspense({
  initialPosts,
}: {
  initialPosts?: PostMetadata[];
}) {
  return <BlogPost initialPosts={initialPosts} />;
}

export default BlogPostWithSuspense;
