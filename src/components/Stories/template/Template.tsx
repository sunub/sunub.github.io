"use client"

import styles from "./Template.module.css";
import Articles from "../Articles/index";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import React from "react";
import { createApi } from "unsplash-js";
import styled from "styled-components";
import DirectionBtn from "../DirectinoBtn/index"

/**
 * Styled components
 */

const Container = styled.div`
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;
`

const Stories = styled.div`
    display: grid;
    position: relative;

    grid: 1fr / auto-flow 100%;

    scroll-snap-type: x mandatory;
    overflow-x: auto;

    max-width: 320px;
    max-height: 620px;
    
    scroll-timeline: --gallery__scrollcontainer inline;
`

const StoriesContainer = styled.div`
    @keyframes grow-progress {
        to { transform: scaleX(1); }
    }
`

const ProgressBar = styled.div<{ $size: number }>`
    background-color: red;
    position: sticky;
    left: 0;
    top: 0;
    width: 100%;
    height: 1em;
    transform: scaleX(${props => (1 / props.$size)});
    transform-origin: 0 50%;

    animation: auto grow-progress linear forwards;
    animation-timeline: --gallery__scrollcontainer;
`

/**
 * React Components
 */

const unsplash = createApi({
    accessKey: "T3_66syLWZsKMMOwHmHkoFj9lGYvI-Fpqe1DNkhubmE",
});

export default async function Template() {
    const [data, setPostData] = React.useState<Photos>();

    React.useEffect(() => {
        (async () => {
            await unsplash.search.getPhotos({
                query: "cat",
                orientation: "portrait",
                page: 1,
                perPage: 10,
            }).then(res => {
                setPostData(res.response)
            })
        })()
    }, [])


    return (
        <Container>
            {data ?
                (<>
                    <DirectionBtn direction="prev" />
                    <StoriesContainer>
                        <ProgressBar $size={data.results.length} />
                        <Stories className="stories__container" >
                            <Articles data={data} />
                        </Stories>
                    </StoriesContainer>
                    <DirectionBtn direction="next" />
                </>) : null}
        </Container>
    )
}