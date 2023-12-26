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
            <Styled.BlogPostWrapper key={frontmatter.slug}>
              <Link href={`/${category}/${slug}`}>
                <Styled.BlogPostTitle>
                  <Styled.BlogPostIcons>{IconComponent}</Styled.BlogPostIcons>
                  <h2>{title}</h2>
                </Styled.BlogPostTitle>
                <Styled.BlogPostContent>{summary}</Styled.BlogPostContent>
              </Link>
              <Styled.BlogTagsWrapper>
                {tags.length > 0 &&
                  tags.map((tag) => (
                    <Styled.BlogTag key={`blog-post-${tag}`}>
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

export default BlogPost;
