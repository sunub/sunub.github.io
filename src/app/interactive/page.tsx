import React from "react";
import InteractivePage from "@/components/Interactive/index"
import Loading from "@/app/loading"

async function timer() {
    setTimeout(() => {
        console.log(32)
    }, 1000)
    return JSON.stringify("HI")
}

export default async function Page() {
    const a = await timer()

    return (
        <React.Suspense fallback={<Loading />}>
            <InteractivePage />
        </React.Suspense>
    )
}