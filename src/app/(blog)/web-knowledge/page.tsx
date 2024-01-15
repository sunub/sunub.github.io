import React from "react";
import Blog from "@/db/blog";

export const metadata = {
  title: "Web Knowledge",
  description:
    "Web Knowledge에 관한 주제를 다룬 포스트를 모아놓은 페이지입니다.",
};

export const dynamic = "force-dynamic";

function WebKnowledgePage() {
  const blog = new Blog();
  const allBlogs = blog.getPostByCategory("web");

  return (
    <section>
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
    </section>
  );
}

export default WebKnowledgePage;
