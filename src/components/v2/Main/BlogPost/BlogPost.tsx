"use client";

import { FrontMatter } from "type";
import * as Styled from "./BlogPost.style";
import * as Icons from "@/components/LandingPage/Icons/Icons";
import Link from "next/link";

type PublishedPost = FrontMatter;

const ICONS_BY_VARIANT: { [key: string]: JSX.Element } = {
  web: Icons.WEB,
  algorithm: Icons.ALGORITHM,
  code: Icons.CODE,
  cs: Icons.CS,
};

function BlogPost({
  recentlyPublished,
}: {
  recentlyPublished: PublishedPost[];
}) {
  return (
    <Styled.Wrapper>
      {recentlyPublished &&
        recentlyPublished.map((frontmatter) => {
          const IconComponent = ICONS_BY_VARIANT[frontmatter.category];
          const { category, slug, title, summary, tags } = frontmatter;

          return (
<<<<<<< HEAD
            <Styled.BlogPostWrapper
              key={`${frontmatter.slug}-${Math.floor(
                Math.random() * 10000 + 1,
              )}`}
            >
=======
            <Styled.BlogPostWrapper key={frontmatter.slug}>
>>>>>>> refs/remotes/origin/sunub
              <Link href={`/${category}/${slug}`}>
                <Styled.BlogPostTitle>
                  <Styled.BlogPostIcons>{IconComponent}</Styled.BlogPostIcons>
                  <h2>{title}</h2>
<<<<<<< HEAD
                  <UnderLineWaveSVG />
=======
>>>>>>> refs/remotes/origin/sunub
                </Styled.BlogPostTitle>
                <Styled.BlogPostContent>{summary}</Styled.BlogPostContent>
              </Link>
              <Styled.BlogTagsWrapper>
                {tags.length > 0 &&
<<<<<<< HEAD
                  tags.map((tag: any) => (
                    <Styled.BlogTag
                      key={`blog-post-${tag}-${Math.floor(
                        Math.random() * 10000,
                      )}`}
                    >
=======
                  tags.map((tag) => (
                    <Styled.BlogTag key={`blog-post-${tag}`}>
>>>>>>> refs/remotes/origin/sunub
                      {tag}
                    </Styled.BlogTag>
                  ))}
              </Styled.BlogTagsWrapper>
            </Styled.BlogPostWrapper>
          );
        })}
    </Styled.Wrapper>
  );
}

<<<<<<< HEAD
function UnderLineWaveSVG() {
  return (
    <Styled.UnderLineWaveSVG
      width="93"
      height="13"
      viewBox="0 0 93 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Styled.UnderLineWavePath
        d="M3 4.5C3.33333 5.5 4.8 7.5 8 7.5C12 7.5 11 5.5 13 5.5C15 5.5 15 9 18 8.5C21 8 20.5 5 23 5C25.5 5 27.5 10.5 31 10C34.5 9.5 37 2.5 42 3.5C48 3.5 47 10 52 10C57 10 58 3 63 3C68 3 69.5 10 74.5 10C79.5 10 79 4 82.5 4C86 4 85 6 90.5 6"
        pathLength={0.9}
      />
    </Styled.UnderLineWaveSVG>
  );
}

=======
>>>>>>> refs/remotes/origin/sunub
export default BlogPost;
