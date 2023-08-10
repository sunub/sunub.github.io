'use client';

import InfinitePage from "./InfinitePage";
import styled from "styled-components";

const Layout = styled.div`
    display: flex;

    justify-content: center;
`

export default function Page() {
    return (
        <Layout>
            <InfinitePage />
        </Layout>
    )
}
