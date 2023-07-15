import React from 'react';
import Post from '@/utils/post/Post';
import { findPostByCategoryAndSlug } from '@/components/Main/PostCard/Content/PostCardContent.helper';
import PostCardContent from '@/components/Main/PostCard/Content/index';

const post = new Post();
export async function generateStaticParams() {
    const params: any[] = [];

    const cateogrizedPost = post.categorizedPost;
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
    const posts = findPostByCategoryAndSlug(category, slug, post.allPost);

    return (
        <PostCardContent posts={posts} />
    );
}
