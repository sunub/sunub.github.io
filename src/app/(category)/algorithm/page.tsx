import React from "react";
import Blog from "@/db/blog";

export const metadata = {
  title: "Algorithm Category Page",
  description: "algorithm에 관한 주제를 다룬 포스트를 모아놓은 페이지입니다.",
};

function AlgorithmPage() {
  const blog = new Blog();
  const allBlogs = blog.getPostByCategory("algorithm");

  return (
    <section>
      <h1>algorithm</h1>
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
            <p>{metadata.description}</p>
            <p>{metadata.date}</p>
          </div>
        ))}
    </section>
  );
}

export default AlgorithmPage;
