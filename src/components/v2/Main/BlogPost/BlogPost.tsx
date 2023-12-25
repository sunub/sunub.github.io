"use client";

import { FrontMatter } from "type";
import * as Styled from "./BlogPost.style";
import * as Icons from "@/components/LandingPage/Icons/Icons";

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
              <Styled.BlogPost href={`/${category}/${slug}`}>
                <Styled.BlogPostTitle>
                  <Styled.BlogPostIcons>{IconComponent}</Styled.BlogPostIcons>
                  <h2>{title}</h2>
                </Styled.BlogPostTitle>
                <Styled.BlogPostContent>{summary}</Styled.BlogPostContent>
                <Styled.BlogTagsWrapper>
                  {tags.length > 0 &&
                    tags.map((tag) => (
                      <Styled.BlogTag key={`blog-post-${tag}`}>
                        {tag}
                      </Styled.BlogTag>
                    ))}
                </Styled.BlogTagsWrapper>
              </Styled.BlogPost>
            </Styled.BlogPostWrapper>
          );
        })}
    </Styled.Wrapper>
  );
}

export default BlogPost;
