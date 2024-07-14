import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";
import { articleCompos } from "./article";

const components = articleCompos;

function CustomMDXRemote(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}

export default CustomMDXRemote;
