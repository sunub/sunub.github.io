"use client"

import React, { createContext } from "react"
import { useState } from "react"

export const PostCardContext = createContext<any>(null)

export default function PostCard({ children }: { children: React.ReactNode }) {
    const [category, setCategory] = useState("all")
    return (
        <PostCardContext.Provider value={{ category, setCategory }}>
            {children}
        </PostCardContext.Provider>
    )
}
