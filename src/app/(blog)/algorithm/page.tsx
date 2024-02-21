import React from "react";
import Card from "@/components/Card";
import * as Styled from "../page.style";
import Spacer from "@/components/Spacer";
import Wave from "@/components/HeaderContents/Wave";
import { allAlgorithmPosts } from "contentlayer/generated";

export const metadata = {
  title: "Algorithm에 관한 포스트들",
  description: "Algorithm에 관한 주제를 다룬 포스트를 모아놓은 페이지입니다.",
  category: "Algorithm",
  author: "sun_ub",
};

export async function generateStaticParams() {
  return {
    params: {
      slug: "algorithm",
    },
  };
}

function CodePage() {
  const posts = allAlgorithmPosts.sort((a, b) => {
    if (new Date(a.date ?? "") > new Date(b.date ?? "")) {
      return -1;
    }
    return 1;
  });

  return (
    <section>
      <Styled.Title>
        <h1>Algorithm</h1>
      </Styled.Title>
      <Wave />
      <Styled.Background>
        <Spacer size={48} axis={"vertical"} />
        <Styled.Wrapper>
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

export default CodePage;
