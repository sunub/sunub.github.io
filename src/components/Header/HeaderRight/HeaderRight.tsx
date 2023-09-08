"use client";

import styled from "styled-components";
import ThemeToggler from "../../Theme/ThemeToggler";
import { Spacer } from "@/constants/Spacer";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    visibility: visible;
    opacity: 1;
    @media (max-width: 768px) {
        & {
            visibility: hidden;
            opacity: 0;
        }
    }
`

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 44px;
    height: 44px;
    border: 1px solid oklch(61.8% 0.027 30.58 / 0.3);
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    background: oklch(97.14% 0.011 31.07);
`

export default function HeaderRight() {
    return (
        <Container>
            <Content>
                <ThemeToggler maskId="header-mask-id" />
            </Content>
            <Spacer axis="vertical" size={16} />
        </Container>
    );
}