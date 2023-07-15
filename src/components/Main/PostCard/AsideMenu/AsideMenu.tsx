'use client';

import { PostCardContext } from '../PostCardContext';
import React, { FormEvent, useContext } from 'react';
import styled from 'styled-components';
import { Home } from '@/components/icon/Category';
import { getCategoryIcon } from './AsudeMenu.helper';

const Form = styled.form`
    grid-area: aside;
    display: inline-flex;
    flex-direction: column;
    gap: var(--size-2);
    margin-top: 4.5rem;
    position: sticky;
    width: fit-content;
`;

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

    color: var(--color-text);
    transition:
        color 350ms ease 0s,
        background 350ms ease 0s;

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

    function sendCategory(event: FormEvent) {
        const curr = event.target as HTMLInputElement;
        const changedCategory = curr.value;

        setCategory(changedCategory);
    }

    return (
        <Form onChange={e => sendCategory(e)}>
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
        </Form>
    );
}
