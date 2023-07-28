import Post from "@/utils/post/Post";
import Link from "next/link";
import styles from "./MenuContent.module.css";
import React from "react";

export default function MenuContent({ children }: { children: React.ReactNode }) {
    const staggeredDelay = 100;
    const post = new Post();

    return (
        <nav className={styles[`menu-content`]} aria-hidden="true" >
            <div className={styles[`menu-content__container`]}>
                {
                    post.categories.map((category, columnIndex) => {
                        return (
                            <Link
                                href={`/${category}`}
                                key={category}
                                className={styles['menu-content__content']}
                                style={{
                                    animationDelay: columnIndex * staggeredDelay + 'ms'
                                }}
                            >
                                <span>{category}</span>
                            </Link>
                        )
                    })
                }
            </div>
            <div
                className={styles[`menu-content__footer`]}
                style={{
                    animationDelay: "500ms"
                }}
            >
                {children}
            </div>
        </nav>
    )
}