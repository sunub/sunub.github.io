"use client"

import React, { useState } from "react"
import styled from "styled-components"
import { observingOfTheView } from "./Articles.helper"
import { Photos } from "unsplash-js/dist/methods/search/types/response"
import { FocusingContext } from "../Context/FocusProvider"

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
    const [index, setIndex] = useState(0);
    const { focusState, setFocusState } = React.useContext(FocusingContext);

    React.useEffect(() => {
        observingOfTheView(setIndex);
    }, [])

    React.useEffect(() => {
        if (focusState.includes(true)) {
            const prevIndex = focusState.findIndex((v: any) => v === true);

            const newFocusState = [...focusState];
            newFocusState[prevIndex] = false;
            newFocusState[index] = true
            setFocusState(newFocusState);
        }
    }, [index])

    return (<>
        {
            data?.results.map((photo, i) => {
                return (
                    <Section className="story" key={photo.id} aria-label={`${i}`}>
                        <Article $bg={photo.urls.regular} />
                    </Section>
                )
            })
        }
    </>)
}