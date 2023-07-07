"use client"

import { baseURL } from "@/utils/getBaseUrl"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { PostCardContext } from "../PostCardContext"
import styled from "styled-components"

// const PostCard = styled.div`
// 	grid-area: main;
// 	display: flex;
// 	flex-direction: column;

// 	gap: clamp(1.5rem, 1.75rem, 2rem);
// 	max-inline-size: 60ch;
// 	min-block-size: 100vh;
// 	width: 100%;
// `

export default function PostCardList({ data }: { data: Map<string, Description[]> }) {
    const { category } = useContext(PostCardContext)
    const postData = new Map(data)
    const posts = postData.get(category)!
    return (<>
        {
            posts.map(description => {
                return (
                    <li key={`${description["tag"]}${Math.random() * 100}`} className="postcard__container">
                        <article>
                            <Link className="postcard__list" href={`${baseURL}/${description.category}/${description.slug}`}>
                                <Image
                                    src={`/icon_${description.tags}.png`}
                                    width={24}
                                    height={24}
                                    alt={`Image ${description.category}`}
                                    className="postcard__icon-image"
                                />
                                <header className="postcard__title">
                                    <h1>
                                        {description.title}
                                    </h1>
                                    <time>{description.date}</time>
                                </header>
                                <section className="postcard__content" >
                                    <p>{description.description}</p>
                                </section>
                            </Link>
                        </article>
                    </li>
                )
            })
        }
    </>)
}