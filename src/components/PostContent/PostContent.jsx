import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./PostContent.module.css";
import CodeSnippet from "../CodeSnippet";
import Blockquote from "../MdxStyling/Blockquote";
import PostContentImage from "./PostContentImage";
import List from "./List";
import ListItem from "./ListItem";

function PostContent({ source, ...props }) {
  return <MDXRemote source={source} {...props} />;
}

export default PostContent;
