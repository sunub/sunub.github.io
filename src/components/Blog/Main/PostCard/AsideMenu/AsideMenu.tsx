'use client';

import { PostCardContext } from '../PostCardContext';
import React, { FormEvent, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Home } from '@/components/Blog/icon/Category';
import { getCategoryIcon } from './AsudeMenu.helper';
import styles from "./AsideMenu.module.css";

const Label = styled.label`
    display: inline-flex;
    align-items: center;

    block-size: 54px;
    padding: 4px 4px 4px 20px;

    border: none 0px transparent;
    border-radius: 60px;
    /* background: color-mix(in oklch, var(--color-highlightColor) 25%, var(--color-primary)); */

    gap: var(--size-4);
    touch-action: manipulation;
    cursor: pointer;

    color: var(--color-text);
    transition:
        color 350ms ease 0s,
        background 350ms ease 0s;

    @media (max-width: 768px) {
        & > span {
            display: none;
            opacity: 0;
            visibility: hidden;
        }
    }

    & > span {
        font-size: var(--size-5);
        font-family: 'Nanum SquareNeo Bold';
    }
    &:hover,
    :target,
    :focus-visible,
    :has(:checked) {
        background: var(--color-highlightColor);
    }
`;

const Input = styled.input`
    width: 0;
    height: 0;
    display: hidden;
    opacity: 0;
`;

export default function Menu({ categories }: { categories: string[] }) {
    const { setCategory } = useContext(PostCardContext);
    const icon = getCategoryIcon(categories);

    useEffect(() => {
        document.body.addEventListener("click", (e) => console.log(e.target))
    }, [])

    function sendCategory(event: FormEvent) {
        const curr = event.target as HTMLInputElement;
        const changedCategory = curr.value;

        setCategory(changedCategory);
    }

    return (
        <form className={styles.asideMenuContainer} onChange={e => sendCategory(e)}>
            <Label>
                <Home />
                <span>all</span>
                <Input defaultChecked type="radio" name="topics" value={'all'} />
            </Label>
            {
                categories.map((category: any) => {
                    return (
                        <Label key={category}>
                            {icon.get(category)}
                            <span>{category}</span>
                            <Input type='radio' name='topics' value={category} />
                        </Label>
                    )
                })
            }
        </form>
    );
}
