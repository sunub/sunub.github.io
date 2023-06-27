"use client"

import { baseURL } from "@/utils/getBaseUrl"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { PostCardContext } from "../postcardContext"
export default function PostCardList({ data }: { data: Map<string, Description[]> }) {
    const { category } = useContext(PostCardContext)
    const postData = new Map(data)
    const posts = postData.get(category)!
    return (<>
        {
            posts.map(description => {
                return (
                    <li key={`${description["tag"]}${Math.random() * 100}`}>
                        <article className="postcard__list">
                            <Image
                                src={`/icon_${description.tags}.png`}
                                width={24}
                                height={24}
                                alt={`Image ${description.category}`}
                                className="postcard__icon-image"
                            />
                            <header>
                                <span className="postcard__title">
                                    <Link href={`${baseURL}/${description.category}/${description.slug}`}>
                                        {description.title}
                                    </Link>
                                </span>
                                <time>{description.date}</time>
                            </header>
                            <section className="postcard__content" >
                                <p>{description.description}</p>
                            </section>
                        </article>
                    </li>
                )
            })
        }
    </>)
}