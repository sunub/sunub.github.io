'use client';

import React from 'react';
import { baseURL } from '@/utils/getBaseUrl';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { PostCardContext } from '../PostCardContext';
import styled from 'styled-components';

const Container = styled.div`
    grid-area: main;
    display: flex;
    flex-direction: column;

    gap: clamp(1.5rem, 1.75rem, 2rem);
    max-inline-size: 60ch;
    min-block-size: 100vh;
    width: 100%;
`;

const List = styled.li`
    position: sticky;
    transform-origin: center top;
`;

const Content = styled(Link)`
    display: grid;
    grid-template:
        'icon header'
        'empty content' / 50px minmax(1ch, 1fr);

    background: var(--color-primary);
    transition: background 350ms ease 0s;
    border: none 0px transparent;
    border-radius: var(--size-5);
    background-color: var(--color-primary);

    padding: 2rem 2rem 3rem 2rem;
    gap: clamp(1rem, 1.25rem, 1.5rem);

    &:hover {
        box-shadow: var(--box-shadow-1);

        h1 {
            color: var(--color-highlightColor);
            text-decoration: underline;
            text-decoration-thickness: 6px;
            text-underline-offset: 10px;
        }
    }

    &:active {
        border-radius: 30px;
    }
`;

const Icon = styled(Image)`
    grid-area: icon;

    align-self: center;
    justify-self: center;
`;

const Header = styled.header`
    grid-area: header;

    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    margin-left: var(--size4);

    & > time {
        justify-self: flex-start;
    }
`;

const Description = styled.section`
    grid-area: content;
    display: inline-flex;
`;

function CardContent({ category, slug, tags, title, date, description }: DescriptionKeys) {
    return (
        <Content href={`${baseURL}/${category}/${slug}`}>
            <Icon src={`/icon_${tags}.png`} width={24} height={24} alt={`Image ${category}`} />
            <Header>
                <h1>{title}</h1>
                <time>{date}</time>
            </Header>
            <Description>
                <p>{description}</p>
            </Description>
        </Content>
    );
}

export default function PostCardList({ data }: { data: Map<string, Description[]> }) {
    const { category } = useContext(PostCardContext);
    const postData = new Map(data);
    const posts = postData.get(category) ?? [];
    return (
        <Container>
            {posts.map(description => {
                return (
                    <List key={`${description['tag']}${Math.random() * 100}`}>
                        <article>
                            <CardContent
                                category={description.category}
                                date={description.date}
                                description={description.description}
                                slug={description.slug}
                                title={description.title}
                                tags={description.tags}
                            />
                        </article>
                    </List>
                );
            })}
        </Container>
    );
}
