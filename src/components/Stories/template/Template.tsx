"use client"

import styles from "./Template.module.css";
import Articles from "../Articles/index";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import React from "react";
import { createApi } from "unsplash-js";
import styled from "styled-components";
import DirectionBtn from "./DirectionBtn";

/**
 * Styled components
 */

const Container = styled.div`
    display: flex;
    flex-direction: row;

    gap: 2rem;
    align-items: center;
`

const Stories = styled.div`
	display: grid;

	grid: 1fr / auto-flow 100%;

	grid-gap: 1ch;
	gap: 1ch;
	overflow-x: auto;

	scroll-snap-type: x mandatory;
	overscroll-behavior: contain;
	touch-action: pan-x;

	width: 100dvw;
	height: 100dvh;
	max-width: 320px;
	max-height: 620px;
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
            <DirectionBtn uses="prev" />
            <Stories className="stories__container">
                {
                    data ? <Articles data={data} /> : null
                }
            </Stories>
            <DirectionBtn uses="next" />
        </Container>
    )
}