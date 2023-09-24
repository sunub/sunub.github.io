import React from 'react';
import Post from '@/utils/post/Post';
import { findPostByCategoryAndSlug } from '@/components/Blog/Main/PostCard/Content/PostCardContent.helper';
import PostCardContent from '@/components/Blog/Main/PostCard/Content/PostCardContent';
import { Tag } from "type";

const post = new Post();
export async function generateStaticParams() {
    const params: any[] = [];

    const cateogrizedPost = post.frontMatters;
    cateogrizedPost.get("all")?.map(desc => {
        params.push({
            category: desc.category,
            slug: desc.slug,
        })
    })

    return params.map(param => ({
        category: param.category,
        slug: param.slug,
    }));
}

export default async function Page({ params }: { params: { category: Tag, slug: string } }) {
    const { category, slug } = params;
    const posts = findPostByCategoryAndSlug(category, slug, post.allTagPost);

    return (
        <PostCardContent posts={posts} />
    );
}
