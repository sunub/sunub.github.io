import React from "react";
import StoriesTemplate from "@/components/Stories/template/index"
import styles from "./page.module.css"

export default function InteractivePage() {
    return (
        <div id={styles.root}>
            <StoriesTemplate />
        </div>
    )
}