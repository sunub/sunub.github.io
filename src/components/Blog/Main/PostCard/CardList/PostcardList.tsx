'use client';

import React from 'react';
import { baseURL } from '@/utils/getBaseUrl';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { PostCardContext } from '../PostCardContext';
import styled from 'styled-components';
import styles from "./PostCardList.module.css";

const List = styled.li`
    position: relative;
    transform-origin: center top;

    overflow-wrap: break-word;
    white-space: normal;
`;


const Icon = styled(Image)`
    grid-area: icon;

    align-self: center;
    justify-self: center;

    visibility: visible;
    opacity: 1;
`;

const Header = styled.header`
    grid-area: header;

    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: var(--size4);
    text-align: left;
    word-break: break-all;

    & > time {
        justify-self: flex-start;
        font-size: calc(1.375rem);
    }
    
    @media ( max-width: 768px ) {
        flex-direction: column;
        & > time {
            font-size: calc(0.575rem);
        }
    }
`;

const Description = styled.section`
    grid-area: content;
    display: inline-flex;
`;

const Content = styled(Link)`
    display: grid;
    grid-template:
        'icon header'
        'empty content' / 50px minmax(1ch, 1fr);
    position: relative;


    background: var(--color-primary);
    transition: background 350ms ease 0s;
    border: none 0px transparent;
    border-radius: var(--size-5);
    background-color: var(--color-primary);

    padding: 2rem 2rem 3rem 2rem;
    gap: clamp(1rem, 1.25rem, 1.5rem);

    cursor: pointer;
    touch-action: manipulation;
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

    @media ( max-width: 768px ) {
        grid-template: 
            'header'
            'content' / 1fr;

        ${Icon} {
            display: none;
            visibility: hidden;
            opacity: 0;
        }
    }

    @media ( max-width: 320px ) {
        padding: 16px;
        column-gap: 0;

        ${Header} {
            flex-direction: column;

            h1 {
                font-size: 1.25rem;
            }

            time {
                font-size: 4px;
            }
        }

        ${Description} {
            font-size: 8px;
            justify-self: center;
        }
    }
`;

function CardContent({ category, slug, tags, title, date, summary }: Description) {
    return (
        <Content href={`${baseURL}/${category}/${slug}`} tabIndex={1}>
            <Icon src={`/icon_${tags}.png`} width={24} height={24} alt={`Image ${category}`} />
            <Header>
                <h3>{title}</h3>
                <time>{date}</time>
            </Header>
            <Description>
                <p>{summary}</p>
            </Description>
        </Content>
    );
}

export default function PostCardList({ categorizedPost }: { categorizedPost: Map<string, Description[]> }) {
    const { category } = useContext(PostCardContext);
    categorizedPost = new Map(categorizedPost);
    const posts = categorizedPost.get(category) ?? [];

    return (<>
        <div className={styles.PostCardListContainer}>
            {
                posts.map(desc => {
                    return (<>
                        <List key={`${desc.tags}${Math.random() * 100}`}>
                            <article>
                                <CardContent
                                    category={desc.category}
                                    date={desc.date}
                                    summary={desc.summary}
                                    slug={desc.slug}
                                    title={desc.title}
                                    tags={desc.tags}
                                />
                            </article>
                        </List>
                    </>)
                })
            }
        </div>
    </>);
}
