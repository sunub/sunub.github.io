import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { Suspense } from "react";
import { PostArticleComponents } from "./PostArticleComponents";
import { convertMarkdownTables } from "./table";
import { ComponentSkeleton } from "../Skeletons";

const components = PostArticleComponents;
function CustomMDXRemote(props: MDXRemoteProps) {
  const processedSource = convertMarkdownTables(props.source as string);

  return (
    <Suspense fallback={<ComponentSkeleton />}>
      <MDXRemote
        source={processedSource}
        components={{ ...components, ...(props.components || {}) }}
      />
    </Suspense>
  );
}

export default CustomMDXRemote;
