import React from "react";
import Card from "@/components/Card";
import Spacer from "@/components/Spacer";
import Wave from "@/components/HeaderContents/Wave";
import * as Styled from "../page.style";
import { allWebPosts } from "contentlayer/generated";

export const metadata = {
  title: "Web에 관한 포스트들",
  description: "Web에 관한 주제를 다룬 포스트를 모아놓은 페이지입니다.",
  category: "Web",
  author: "sun_ub",
};

export async function generateStaticParams() {
  return {
    params: {
      slug: "web",
    },
  };
}

function WebPage() {
  const posts = allWebPosts.sort((a, b) => {
    if (new Date(a.date ?? "") > new Date(b.date ?? "")) {
      return -1;
    }
    return 1;
  });

  return (
    <section>
      <Styled.Title>
        <h1>Web</h1>
      </Styled.Title>
      <Wave />
      <Styled.Background>
        <Styled.Wrapper>
          <Spacer size={48} axis={"vertical"} />
          {posts.map((post) => {
            const frontMatter = {
              title: post.title,
              date: post.date,
              slug: post.slug,
            };
            return <Card key={frontMatter.slug} frontMatter={frontMatter} />;
          })}
        </Styled.Wrapper>
      </Styled.Background>
    </section>
  );
}

export default WebPage;
