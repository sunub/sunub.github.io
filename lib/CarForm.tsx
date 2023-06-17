"use client"

import { FormEvent } from "react"

export default function CarForm() {
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const form = new FormData(event.target as HTMLFormElement)
        const formData = Object.fromEntries(form.entries())
        const res = await fetch("/api/cars", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="make" type="text" />
            <input name="model" type="text" />
            <input name="image" type="text" />
            <textarea name="description" />

            <button type="submit">Create Car</button>
        </form>
    )
}