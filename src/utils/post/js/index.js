import fs from "fs";
import { getLocalTagFiles } from "./Post.helper.js";
import { POST_ROOT_PATH } from "./Post.constant.js";
import Post from "./Post.js";

const post = new Post();

const fronmatter = post.frontmatters;

console.log(fronmatter);
