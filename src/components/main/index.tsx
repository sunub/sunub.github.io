import React, { Suspense } from "react"
import Loading from "@/app/loading"

export default async function Main({ children, category }: { children: React.ReactNode, category: string }) {
    return (
        <Suspense fallback={<Loading />}>
            <p>{category}</p>
            {children}
        </Suspense>
    )
}
