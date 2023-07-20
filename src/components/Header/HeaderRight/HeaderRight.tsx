"use client";

import styled from "styled-components";
import ThemeToggler from "../../Theme/ThemeToggler";
import HamburgerBtn from "./HamburgerBtn";

const Container = styled.div`
    display: flex;
    align-items: center;

    gap: 1rem;
`

export default function HeaderRight() {
    return (
        <Container>
            <ThemeToggler />
            <HamburgerBtn />
        </Container>
    );
}