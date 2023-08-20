"use client"

import React from "react"
import styled from "styled-components"
import { FocusingContext } from "../Context/FocusProvider";

/**
 * Type declartion
 */
interface ProgressBar extends React.HTMLAttributes<HTMLDivElement> {
    barSize: number;
}

// color-mix(in oklch, oklch(92.54% 0.11 22.52), oklch(78.78% 0.1 60.39))

/**
 * Progress Bar styled components
 */
const Container = styled.div<{ $size: number }>`
    background-color: color-mix(in oklch, oklch(78.78% 0.1 32.39 / 12%));
    position: relative;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: fit-content;
    padding: .7rem;
    border-radius: 2rem;
    
    box-shadow: var(--shadow-elevation-high);
`

const Buttons = styled.button<{ $isFocused: boolean }>`
    background-color: color-mix(in oklch, var(--color-background), var(--color-highlightColor));
    width: 15px;
    height: 15px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;

    opacity: ${props => props.$isFocused ? 1 : .2};
`

/**
 * Progress Bar :
 * The size of the progress bar sholud change accroding to the barSize.
 */
export default function ProgressBar({ barSize, ...rest }: ProgressBar) {
    const [currState, setCurrState] = React.useState(Array.from({ length: barSize }, () => false));
    const { focusState } = React.useContext(FocusingContext);

    React.useEffect(() => {
        const newState = [...focusState];
        setCurrState(newState);
    }, [focusState])

    return (
        <Container $size={barSize} {...rest} >
            {
                currState.map((status, i) => (
                    <Buttons
                        $isFocused={status}
                        aria-label={`${i}`}
                        key={Math.random() * barSize}
                        onClick={(e) => {
                            const currTarget = e.target as HTMLElement;
                            const currIndex = Number(currTarget?.getAttribute("aria-label"));
                            const stories = document.querySelectorAll(".story")

                            for (const story of stories) {
                                const index = story?.getAttribute("aria-label");
                                if (currIndex === Number(index)) {
                                    story.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                        inline: "center"
                                    })
                                }
                            }
                        }} />
                ))
            }
        </Container>
    )
}