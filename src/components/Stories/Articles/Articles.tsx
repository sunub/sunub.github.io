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
 * Articles styled components */
const Section = styled.section`
    display: grid;
    grid: [story] 1fr / [story] 1fr;

    scroll-snap-align: start;
    scroll-snap-stop: always;
`

const Article = styled.article<{ $bg: string }>`
    grid-area: story;

    width: 320px;
    height: 520px;

    background-image: url(${props => props.$bg});
    background-size: cover;
    user-select: none;
    touch-action: manipulation;
`

/**
 * Story image components 
 * */
export default function Articles({ data }: ArticlesProps) {
    React.useEffect(() => {
        const stories = document.querySelector(".stories__container section") as HTMLElement;
        stories.classList.add("current_story")
    }, [])

    return (<>
        {
            data?.results.map(photo => {
                return (
                    <Section key={photo.id}>
                        <Article $bg={photo.urls.regular} />
                    </Section>
                )
            })
        }
    </>)
}