import React from 'react';
import Post from '@/utils/post/Post';
import { Tag } from "type";
import PostContent from "@/components/PostContent/index";

const posts = new Post();
export async function generateStaticParams() {
    const params: any[] = [];

    posts.frontMatters.get("all")?.map(frontmatter => {
        params.push({
            category: frontmatter.category,
            slug: frontmatter.slug
        })
    })

    return params.map(param => ({
        category: param.cateogry,
        slug: param.slug
    }))
}

export default async function Page({ params }: { params: { category: Tag, slug: string } }) {
    const { category, slug } = params;
    const content = posts.contents[slug];
    const frontMatter = posts.getSpecificFrontMatter(posts.frontMatters.get(category) ?? [], slug);

    return (
        <PostContent frontMatter={frontMatter} content={content} />
    );
}
