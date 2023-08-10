import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 150px;
    height: 150px;

    background-color: aliceblue;
    border: 1px solid var(--pink-4);
`

export default function InfinitePage() {
    const items = ["A", "B", "C", "D", "E"]

    return (
        <Container id="infinite-scroll-container">
            <div id="sentinel"></div>
            {items.map((item, i) => {
                return (
                    <Item
                        key={Math.random() * Number.MAX_SAFE_INTEGER}
                        className="infinite-scroll-item">
                        {item}
                    </Item>
                )
            })}
            <button id="infinite-scroll-button" disabled>
                <p className="disabled-text">Loading more items...</p>
                <p className="active-text">Show more</p>
            </button>
        </Container>
    )
}