"use client"

import styles from "./Template.module.css";
import Articles from "../Articles/index";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import React from "react";
import { createApi } from "unsplash-js";


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
        <div className={styles.stories__container}>
            {
                data ? <Articles data={data} /> : null
            }
        </div>
    )
}