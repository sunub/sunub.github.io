import React from "react";
import Blog from "@/db/blog";
import Wave from "@/components/HeaderContents/Wave";
import * as Styled from "./page.style";

export const metadata = {
  title: "Web Knowledge",
  description:
    "Web Knowledge에 관한 주제를 다룬 포스트를 모아놓은 페이지입니다.",
};

function WebKnowledgePage() {
  const allBlogs = Blog.findByCategory("web");

  return (
    <React.Fragment>
      <Wave />
      <Styled.RootSection>
        <h1>Web Knowledge</h1>
        {allBlogs
          ?.sort((a, b) => {
            if (
              new Date(a.metadata.date ?? "") > new Date(b.metadata.date ?? "")
            ) {
              return -1;
            }
            return 1;
          })
          .map(({ metadata }) => (
            <div key={metadata.slug}>
              <h2>{metadata.title}</h2>
              <p>{metadata.summary}</p>
              <p>{metadata.date}</p>
            </div>
          ))}
      </Styled.RootSection>
    </React.Fragment>
  );
}

export default WebKnowledgePage;
