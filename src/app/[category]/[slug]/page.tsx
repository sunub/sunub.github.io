import React from 'react';
import { getPost, findPostByCategoryAndSlug } from '@/utils/Post';
import PostCardContent from '@/components/Main/PostCard/Content/index';

export async function generateStaticParams() {
    const [, description] = await getPost();
    const params: any[] = [];

    for (const descript of description.values()) {
        for (const tag of descript) {
            params.push({ category: tag.category, slug: tag.slug })
        }
    }

    return params.map(param => ({
        category: param.category,
        slug: param.slug,
    }));
}

export default async function Page({ params }: { params: { category: string, slug: string } }) {
    const blogpost = await getPost();
    const { category, slug } = params;
    const posts = findPostByCategoryAndSlug(category, slug, blogpost[1]);

    return (
        <PostCardContent posts={posts} />
    );
}
