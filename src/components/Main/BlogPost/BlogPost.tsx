import * as Styled from "./BlogPost.style";
import Link from "next/link";
import { getRecentPosts } from "db/blog";

async function BlogPost() {
  try {
    const recentlyPublished = await getRecentPosts(10);
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
          return (
            <Styled.BlogPostListItem
              key={`${post.slug}-${Math.floor(Math.random() * 10000 + 1)}`}
            >
              <Styled.BlogPostWrapper>
                <Link href={`/${category}/${slug}`} scroll={true}>
                  <Styled.BlogPostTitle>
                    <Styled.Title>{title}</Styled.Title>
                    <Styled.TitleDot />
                    <UnderLineWaveSVG />
                  </Styled.BlogPostTitle>
                  <Styled.BlogPostContent>{summary}</Styled.BlogPostContent>
                </Link>
              </Styled.BlogPostWrapper>
              <Styled.Footer>
                <Styled.Date>{localeDate}</Styled.Date>
              </Styled.Footer>
            </Styled.BlogPostListItem>
          );
        })}
      </Styled.BlogPostList>
    );
  } catch (error) {
    console.error(error);
    return <div>포스트를 불러오는 중 오류가 발생했습니다.</div>;
  }
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
