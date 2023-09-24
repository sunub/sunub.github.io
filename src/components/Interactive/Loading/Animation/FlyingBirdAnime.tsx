"use client"

import styled from "styled-components"
import React from "react"
import { useSpring, animated } from "@react-spring/web";
import { AnimationContext } from "../Loading.context";

const Container = styled.div`
    grid-area: bird;

    display: flex;
    justify-content: center;
`

export default function FlyingBirdAnime() {
    const ctx = React.useContext(AnimationContext)

    const [wingProps, wingApi] = useSpring(() => ({
        from: { rotate: "-17deg" },
        config: {
            mass: 1,
            tension: 200
        },
    }))
    const [bodyProps, bodyApi] = useSpring(() => ({
        from: { y: 10 },
        config: {
            mass: 1,
        },
        loop: true
    }))

    React.useEffect(() => {
        const isPressed = ctx?.state;

        if (isPressed) {
            wingApi.start({
                to: [
                    { rotate: "20deg" },
                    { rotate: "-17deg" },
                ],
                loop: true
            });
            bodyApi.start({
                to: [
                    { y: -10 },
                    { y: 10 },
                ],
                loop: true
            })
        } else {
            wingApi.stop();
            bodyApi.stop();
        }

    }, [ctx?.state])

    return (
        <Container>
            <animated.svg
                style={{
                    ...bodyProps
                }}
                width="130" height="80" viewBox="0 0 130 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                <animated.g>
                    <path d="M72.8546 28.1705C65.0835 20.3993 63.7883 6.15218 64.1121 0H96.1682C110.933 0 115.272 11.6568 115.596 17.4851V35.9417C108.602 62.3636 84.5114 65.0835 63.1407 65.0835H53.4267C49.5411 65.0835 45.3318 63.1408 43.7128 62.1694H42.7414L23.3134 61.198C22.6659 61.198 21.3707 60.8094 21.3707 59.2552C21.3707 57.7009 22.6659 57.3124 23.3134 57.3124C22.3421 56.9886 20.205 56.341 19.4279 56.341C14.7652 56.341 13.5995 54.3982 13.5995 53.4268C13.5995 51.0954 19.4279 49.5412 22.3421 48.5698C24.2848 47.9222 31.2789 45.4613 43.7128 40.7986C53.4267 29.1419 67.0263 27.1991 72.8546 28.1705Z" fill="black" />
                    <path d="M64.0386 65.2262C63.5269 65.1449 63.1492 64.6894 63.2476 64.1807C64.6197 57.0909 78.2936 51.0906 90.2371 47.4193C97.1701 45.2881 104.489 44.9749 111.711 45.6556C109.781 49.514 107.288 53.0879 104.329 56.2264C99.932 60.8885 94.8056 65.0743 80.8927 66.2372C75.2679 66.7074 69.6131 66.1117 64.0386 65.2262Z" fill="#6E7E89" />
                </animated.g>
                <animated.path
                    d={"M0.762284 26.1696C-0.781094 24.7303 0.167958 22.1432 2.27597 22.0433L56.9867 19.4514C67.4876 18.9539 76.685 26.4277 78.3464 36.8083C78.7577 39.3782 77.3218 41.8871 74.8978 42.8344L71.1378 44.3036C68.5245 45.3248 65.8094 46.0634 63.0389 46.5068L57.029 47.4687C39.0256 50.3501 20.6998 44.7632 7.3659 32.3281L0.762284 26.1696Z"}
                    fill={"#6E7E89"}
                    style={{
                        transformOrigin: "center",
                        ...wingProps
                    }}
                />
                <g>
                    <path d="M98.8207 21.7785C98.8207 29.5145 95.4 35.7857 91.1804 35.7857C86.9607 35.7857 83.54 29.5145 83.54 21.7785C83.54 14.0425 86.9607 7.77118 91.1804 7.77118C95.4 7.77118 98.8207 14.0425 98.8207 21.7785Z" fill="white" />
                    <path d="M96.2737 21.7783C96.2737 28.1078 93.9933 33.2388 91.1802 33.2388C88.3671 33.2388 86.0866 28.1078 86.0866 21.7783C86.0866 15.4489 88.3671 10.3178 91.1802 10.3178C93.9933 10.3178 96.2737 15.4489 96.2737 21.7783Z" fill="black" />
                    <path d="M129.196 19.4279V28.1705H101.025V19.4279C101.025 10.1025 111.711 7.77118 114.625 7.77118H118.51C125.504 7.77118 129.196 15.5423 129.196 19.4279Z" fill="#D9D9D9" />
                    <path d="M116.567 34.9703C122.784 34.9703 124.339 29.7895 124.339 27.1991H101.025C101.025 33.416 104.911 34.9703 106.854 34.9703H116.567Z" fill="#6E7E89" />
                </g>
            </animated.svg>
        </Container>
    )
}