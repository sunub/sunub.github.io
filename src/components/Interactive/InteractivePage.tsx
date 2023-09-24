import React from "react";
import styles from "./InteractivePage.module.css";
import StoriesTemplate from "./Stories/template/index";
import LoadingTemplate from "./Loading/index";
import Tree from "./Tree/index"
import { createApi } from "unsplash-js";

const unsplash = createApi({
    accessKey: "T3_66syLWZsKMMOwHmHkoFj9lGYvI-Fpqe1DNkhubmE",
});

async function getUnsplashImages() {
    const imageData = await unsplash.search.getPhotos({
        query: "cat",
        orientation: "portrait",
        page: 1,
        perPage: 10,
    })

    return imageData.response
}

export default async function InteractivePage() {
    const images = await getUnsplashImages();

    return (
        <div id={styles[`interactive-page__root-layout`]}>
            <Tree name={"main"}>
                <Tree name={"Stories"}>
                    <StoriesTemplate images={images} />
                </Tree>
                <Tree name={"Flying Brid"}>
                    <LoadingTemplate />
                </Tree>
            </Tree>
        </div>
    )
}