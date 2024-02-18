import React from "react";
import Blog from "@/db/blog";
import Card from "@/components/Card";
import * as Styled from "../page.style";
import Spacer from "@/components/Spacer";
import Wave from "@/components/HeaderContents/Wave";

export const metadata = {
  title: "Code Category Page",
  description: "code에 관한 주제를 다룬 포스트를 모아놓은 페이지입니다.",
};

function CodePage() {
  const allBlogs = Blog.findByCategory("algorithm");

  return (
    <section>
      <Styled.Title>
        <h1>Algorithm</h1>
      </Styled.Title>
      <Wave />
      <Styled.Background>
        <Spacer size={48} axis={"vertical"} />
        <Styled.Wrapper>
          {allBlogs
            ?.sort((a, b) => {
              if (
                new Date(a.metadata.date ?? "") >
                new Date(b.metadata.date ?? "")
              ) {
                return -1;
              }
              return 1;
            })
            .map(({ metadata }) => (
              <Card key={metadata.slug} frontMatter={metadata} />
            ))}
        </Styled.Wrapper>
      </Styled.Background>
    </section>
  );
}

export default CodePage;
