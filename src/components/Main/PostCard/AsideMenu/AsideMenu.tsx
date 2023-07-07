"use client"

import Image from "next/image"
import { PostCardContext } from "../PostCardContext"
import React, { FormEvent, useContext, useEffect, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Home, Typescript, Javascript, Web, Algorithm } from "@/components/icon/Category"


const Form = styled.form`
    grid-area: aside;
    display: inline-flex;
    flex-direction: column;
    gap: var(--size-2);
    margin-top: 4.5rem;
    position: sticky;
    width: 100%;

    & > label:is(:hover, :target, :focus-visible, :has(:checked)){
        background: var(--highlight-color);
    }
`
const Label = styled.label`
    display: inline-flex;
    align-items: center;

    block-size: 54px;
    padding: 4px 4px 4px 20px;

    border: none 0px transparent;
    border-radius: 60px;

    gap: var(--size-4);
    touch-action: manipulation;
    cursor: pointer;

    & > span {
        font-size: var(--size-5);
        font-family: "Nanum SquareNeo Bold";
    }
`

const Input = styled.input`
    width: 0;
    height: 0;
    display: hidden;
    opacity: 0;
`

export default function Menu({ categories }: { categories: Map<string, any> }) {
    const [labels, setLabels] = useState(new Map(categories))
    const { setCategory } = useContext(PostCardContext)

    function sendCategory(event: FormEvent) {
        const curr = event.target as HTMLInputElement
        const changedCategory = curr.value

        setCategory(changedCategory)
    }

    return (
        <Form onChange={e => sendCategory(e)}>
            <Label>
                <Home />
                <span>all</span>
                <Input defaultChecked type="radio" name="topics" value={"all"} />
            </Label>
            {
                [...labels.keys()].map(label => {
                    return (
                        <Label key={label} >
                            {labels.get(label)}
                            <span>{label}</span>
                            <Input type="radio" name="topics" value={label} />
                        </Label>
                    )
                })
            }
        </Form>
    )
}