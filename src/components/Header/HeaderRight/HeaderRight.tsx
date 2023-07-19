"use client";

import styled from "styled-components";
import ThemeToggler from "../../Theme/ThemeToggler";

const Container = styled.div`
    display: flex;
    align-items: center;

    gap: 1rem;
`

export default function HeaderRight() {
    return (
        <Container>
            <ThemeToggler />
        </Container>
    );
}