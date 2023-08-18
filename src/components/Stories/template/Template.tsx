"use client"

import Articles from "../Articles/index";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import React from "react";
import { createApi } from "unsplash-js";
import styled from "styled-components";
import DirectionBtn from "../DirectinoBtn/index"
import ProgressBar from "../ProgressBar/index"
import FocusProvider from "../Context/FocusProvider";
import { DayBirdIcon } from "@/components/Blog/icon/BirdIcon";

/**
 * Styled components
 */

const Container = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
`
const StoriesRoot = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;

    justify-content: center;
    align-items: center;
`
const StoriesContainer = styled.div`
    position: relative;
    box-shadow: var(--shadow-elevation-high);
    `

const Stories = styled.div`
    display: grid;

    grid: 1fr / auto-flow 100%;

    overflow-x: scroll;
    scroll-timeline: --time-line inline;
    scroll-snap-type: x mandatory;

    max-width: 320px;
    max-height: 620px;

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
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
            <DayBirdIcon />
            {data ?
                (<>
                    <StoriesRoot>
                        <DirectionBtn direction="prev" />
                        <StoriesContainer>
                            <Stories className="stories__container" >
                                <FocusProvider barSize={data.results.length}>
                                    <ProgressBar barSize={data.results.length} />
                                    <Articles data={data} />
                                </FocusProvider>
                            </Stories>
                        </StoriesContainer>
                        <DirectionBtn direction="next" />
                    </StoriesRoot>
                </>) : null}
        </Container>
    )
}