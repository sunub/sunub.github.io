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
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const result = await res.json()
        return result
    }

    return (
        <form onSubmit={handleSubmit}>
            <label >
                Make
                <input name="make" type="text" />
            </label>
            <label >
                Model
                <input name="model" type="text" />
            </label>
            <label >
                image
                <input name="image" type="text" />
            </label>
            <label>
                <textarea name="description" typeof="text" maxLength={200} />
            </label>

            <button type="submit" >Create Car</button>
        </form>
    )
}