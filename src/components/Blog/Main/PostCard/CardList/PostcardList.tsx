'use client';

import React from 'react';
import { useContext } from 'react';
import { PostCardContext } from '../PostCardContext';
import styles from "./PostCardList.module.css";
import CardList from "./CardList";
import Elevation from "@/constants/Elevation";

/**
 *  Components
 */
export default function PostCardList({ categorizedPost }: { categorizedPost: Map<string, Description[]> }) {
    const { category } = useContext(PostCardContext);
    categorizedPost = new Map(categorizedPost);
    const posts = categorizedPost.get(category) ?? [];

    return (<>
        <div className={styles.PostCardListContainer}>
            <CardList post={posts} />
        </div>
    </>);
}
