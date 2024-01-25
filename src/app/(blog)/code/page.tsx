import React from "react";
import Blog from "@/db/blog";

export const metadata = {
  title: "Code Category Page",
  description: "code에 관한 주제를 다룬 포스트를 모아놓은 페이지입니다.",
};

function CodePage() {
  const blog = new Blog();
  const allBlogs = blog.findCategory("code");

  return (
    <section>
      <h1>code</h1>
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

export default CodePage;
