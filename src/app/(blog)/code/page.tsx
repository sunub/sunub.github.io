import React from "react";
import Card from "@/components/Card";
import * as Styled from "../page.style";
import Spacer from "@/components/Spacer";
import Wave from "@/components/HeaderContents/Wave";
import { allCodePosts } from "contentlayer/generated";

export const metadata = {
  title: "Code Category Page",
  description: "code에 관한 주제를 다룬 포스트를 모아놓은 페이지입니다.",
};

function CodePage() {
  const frontmatters = allCodePosts.map((post) => ({
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    category: post.category,
    slug: post.slug,
    completed: post.completed,
  }));

  return (
    <section>
      <Styled.Title>
        <h1>Code</h1>
      </Styled.Title>
      <Wave />
      <Styled.Background>
        <Spacer size={48} axis={"vertical"} />
        <Styled.Wrapper>
          {frontmatters.map((frontmatter) => (
            <Card key={frontmatter.slug} frontMatter={frontmatter} />
          ))}
        </Styled.Wrapper>
      </Styled.Background>
    </section>
  );
}

export default CodePage;
