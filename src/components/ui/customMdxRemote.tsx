import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";
import { PostArticleComponents } from "./PostArticleComponents";
import { convertMarkdownTables } from "./table";

const components = PostArticleComponents;

function CustomMDXRemote(props: MDXRemoteProps) {
  const processedSource = convertMarkdownTables(props.source as string);

  return (
    <MDXRemote
      source={processedSource}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}

export default CustomMDXRemote;
