"use client"

import styled from "styled-components"
import React from "react"
import { animated, useSpring } from "@react-spring/web"
import FlyingBird from "./FlyingBird"
import Cloud from "./Cloud"

/**
 * Styled Components
 */
const Container = styled.div`
    grid-area: loading;

    display: grid;
    grid: [icons] 1fr / [icons] 1fr;
`

const Clouds = styled.div`
    grid-area: icons;
    
    display: flex;
    width: 100%;
    justify-content: center;
    `

const Bird = styled.div`
    grid-area: icons;
    
    display: flex;
    width: 100%;
    justify-content: center;
    /* transform: translateX(-100%); */
    /* animation: slideIn-bird 5s ease-in infinite; */

    @keyframes slideIn-bird {
        0% {
            transform: translateX(-100%);
        }

        50% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(100%);
        }
    }
`

export default function Loading() {
    const [trigger, setTrigger] = React.useState(false);
    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
    }))

    const handleClick = () => {
        const start = trigger ? 100 : 0;
        const end = trigger ? 0 : 100;

        api.start({
            from: {
                x: start,
            },
            to: {
                x: end,
            }
        })
    }

    return (
        <Container>
            <animated.div
                onClick={() => {
                    handleClick()
                    setTrigger(!trigger)
                }}
                style={{
                    width: 30,
                    height: 30,
                    background: '#ff6d6d',
                    borderRadius: 10,
                    cursor: "pointer",
                    ...springs
                }}
            />
            <Clouds>
                <Cloud />
            </Clouds>
            <Bird>
                <FlyingBird />
            </Bird>
        </Container>
    )
}