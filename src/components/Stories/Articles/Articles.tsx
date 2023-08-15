"use client"

import React from "react"
import styled from "styled-components"
import { Photos } from "unsplash-js/dist/methods/search/types/response"

/**
 * Articles type declartions
 */
interface ArticlesProps {
    data: Photos | undefined
}

/**
 * Articles styled components
 */
const Section = styled.section`
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: grid;
    grid: [story] 1fr / [story] 1fr;
`

const Article = styled.article<{ $bg: string }>`
    grid-area: story;

    background-image: url(${props => props.$bg});
    background-size: cover;
    user-select: none;
    touch-action: manipulation;
`

/**
 * Components
 */
export default function Articles({ data }: ArticlesProps) {
    return (<>
        {
            data?.results.map(photo => (
                <Section key={photo.id}>
                    <Article $bg={photo.urls.regular} />
                </Section>
            ))
        }
    </>)
}