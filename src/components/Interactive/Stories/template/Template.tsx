"use client"

import Articles from "../Articles/index";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import React from "react";
import styled from "styled-components";
import DirectionBtn from "../DirectinoBtn/index"
import ProgressBar from "../ProgressBar/index"
import FocusProvider from "../Context/FocusProvider";
import { DayBirdIcon } from "@/components/icon/BirdIcon";

/**
 * Styled components
 */

const Container = styled.div`
    grid-area: stories;

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
    display: flex;
    flex-direction: column;
    gap: 1rem;

    position: relative;
    `

const Stories = styled.div`
    display: grid;

    grid: 1fr / auto-flow 100%;

    overflow-x: scroll;
    scroll-timeline: --time-line inline;
    scroll-snap-type: x mandatory;

    max-width: 320px;
    max-height: 620px;
    box-shadow: var(--shadow-elevation-high);

    ::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }
`

/**
 * React Components
 */

export default async function Template({ images }: { images: Photos | any }) {

    return (
        <Container>
            <DayBirdIcon />
            {images ?
                (<>
                    <StoriesRoot>
                        <DirectionBtn direction="prev" />
                        <FocusProvider barSize={images.results.length}>
                            <StoriesContainer>
                                <Stories className="stories__container" >
                                    <Articles data={images} />
                                </Stories>
                                <ProgressBar barSize={images.results.length} />
                            </StoriesContainer>
                        </FocusProvider>
                        <DirectionBtn direction="next" />
                    </StoriesRoot>
                </>) : null}
        </Container>
    )
}