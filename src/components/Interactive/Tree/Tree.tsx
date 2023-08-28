"use client"

import { useSpring, a, animated } from "@react-spring/web";
import React from "react"
import styled from "styled-components";
import * as Icons from "./Icons"
import usePrevious from "./use-previous.hook";


/**
 * Styled components
 */
const Frame = styled.div`
    
`
const Container = styled.div`
    display: flex;
    position: relative;
`

const Title = styled.span`
    
`

const Content = styled(animated.div) <{ $isOpen: boolean }>`
    opacity: ${(props) => props.$isOpen ? 1 : 0};
    visibility: ${(props) => props.$isOpen ? "visibilty" : "hidden"};
`

const toggle = {
    width: "1em",
    height: "1em",
    cursor: "pointer",
    verticalAlign: "center"
}
/**
 * Type declartion
 */
interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement,
    defaultOpen: boolean,
    name: string | JSX.Element,
}

const Tree = React.memo(({ children, name, style, defaultOpen = false }: TreeProps) => {
    const [isOpen, setOpen] = React.useState(false);
    const [viewHeight, setViewHeight] = React.useState(0)
    const previous = usePrevious(isOpen);
    const { height, opacity, y } = useSpring({
        from: { height: 0, opacity: 0, y: 0 },
    })

    const Icon = Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}`]
    return (
        <Container>
            <Frame>
                <Icon
                    style={{
                        ...toggle
                    }}
                    onClick={() => setOpen(!isOpen)}
                />
                <Title>
                    {name}
                </Title>
                <Content
                    $isOpen={isOpen}>
                    <a.div>
                        {children}
                    </a.div>
                </Content>
            </Frame>
        </Container>
    )
})

Tree.displayName = "Tree"

export default Tree