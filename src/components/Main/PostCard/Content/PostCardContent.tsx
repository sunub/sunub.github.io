'use client';

import React from 'react';
import { SpacerBar } from '@/components/Spacer';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 1100px;

    margin-left: auto;
    margin-right: auto;
`;

const Article = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;

    word-spacing: 0.2ch;
    text-align: left;

    background-color: var(--color-primary);
    box-shadow: var(--box-shadow-2);
    border-radius: 15dvw;

    text-align: left;
`;

const Header = styled.header`
    & > h1 {
        color: var(--color-highlightColor);
        font-size: 4rem;
        text-align: center;
    }
`;

const Date = styled.dl`
    text-align: center;
    font-size: var(--size-4);
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    max-width: 800px;

    row-gap: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    padding-left: 32px;
    padding-right: 32px;
`;

export default function PostCardContent({ posts }: { posts: PostData }) {
    const desc = posts.description
    const post = posts.content;

    return (
        <Container key={desc.title}>
            <Article>
                <SpacerBar axis="vertical" size={144} />
                <Header>
                    <h1>{desc.title}</h1>
                    <Date className="post__article__header--date">
                        <dd>{desc.date}</dd>
                    </Date>
                </Header>
                <SpacerBar axis="vertical" size={120} />
                <Main className="post__article__main" dangerouslySetInnerHTML={{ __html: `${post}` }} />
                <SpacerBar axis='vertical' size={144} />
            </Article>
        </Container>
    );
}
