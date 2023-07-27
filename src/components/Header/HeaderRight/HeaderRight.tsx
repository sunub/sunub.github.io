"use client";

import styled from "styled-components";
import ThemeToggler from "../../Theme/ThemeToggler";

const Container = styled.div`
    z-index: 0;

    display: block;
    opacity: 1;
    @media (max-width: 768px) {
        & {
            display: none;
            opacity: 0;
    }
}
`

const Content = styled.div`
    display: flex;
    align-items: center;

    gap: 1rem;
`

export default function HeaderRight() {
    return (
        <Container>
            <Content>
                <ThemeToggler maskId="header-mask-id" />
            </Content>
        </Container>
    );
}