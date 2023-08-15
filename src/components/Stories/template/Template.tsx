import styles from "./Template.module.css";
import Articles from "../Articles/index";
import { baseURL } from "@/utils/getBaseUrl";
import { Photos } from "unsplash-js/dist/methods/search/types/response";
import React from "react";
import { ApiResponse } from "unsplash-js/dist/helpers/response";

async function getPhoto() {
    const res = await fetch(`${baseURL}/api/unsplash`, {
        method: "GET",
    })

    return res.json();
}

export default async function Template() {
    const data: ApiResponse<Photos> = await getPhoto();

    return (
        <div className={styles.stories__container}>
            <Articles data={data.response} />
        </div>
    )
}