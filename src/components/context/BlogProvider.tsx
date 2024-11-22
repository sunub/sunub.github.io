"use client";

import Blog, { MDXFile } from "db/blog";
import React from "react";

type BlogContext = {
  blogPosts: MDXFile[];
};

const BlogContext = React.createContext<BlogContext | null>(null);

export const useBlog = () => {
  const blog = React.useContext(BlogContext);
  return blog;
};

export const BlogProvider: React.FC<{
  children: React.ReactNode;
  blogPosts: MDXFile[];
}> = ({ children, blogPosts }) => {
  return (
    <BlogContext.Provider value={{ blogPosts: blogPosts }}>
      {children}
    </BlogContext.Provider>
  );
};
