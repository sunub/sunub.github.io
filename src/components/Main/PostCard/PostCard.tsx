import React from "react";
import PostCardList from "./CardList/PostcardList";
import Post from "@/utils/post/index";
import AsideMenu from "./AsideMenu/index";
import PostCardCtx from "./PostCardContext";

export default async function PostCard() {
    const post = new Post();

    return (<>
        <PostCardCtx>
            <AsideMenu categories={post.categories} />
            <PostCardList categorizedPost={post.categorizedPost} />
        </PostCardCtx>
    </>);
}