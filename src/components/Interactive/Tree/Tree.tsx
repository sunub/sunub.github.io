"use client"

import { useSpring, a, animated } from "@react-spring/web";
import React from "react"
import styled from "styled-components";
import * as Icons from "./Icons"
import usePrevious from "@/hooks/use-previous.hook";
import useMeasure from "@/hooks/use-measure.hook";
import useMounted from "@/hooks/use-mounted.hook";


/**
 * Styled components
 */
const Frame = styled.div`
    
`
const Container = styled.div`
    display: flex;
    position: relative;
`

const Title = styled.p`
    
`

const Content = styled(animated.div) <{ $isOpen: boolean }>`
    margin-left: 2rem;
    visibility: ${(props) => props.$isOpen ? "visibilty" : "hidden"};
    transition: visibility ease-in 1000ms;
`

const FolderName = styled.div`
    display: flex;
    flex-direction: row;

    gap: .5rem;
    align-items: center;
    justify-content: flex-start;
`

const toggle = {
    width: "1em",
    height: "1em",
    cursor: "pointer",
}
/**
 * Type declartion
 */
interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    defaultOpen?: boolean,
    name: string | JSX.Element,
}

const Tree = React.memo(({ children, name, defaultOpen = false }: TreeProps) => {
    const [isOpen, setOpen] = React.useState(defaultOpen);
    const previous = usePrevious(isOpen);
    const isMounted = useMounted();
    const { ref, locInfo } = useMeasure(isMounted);
    const { height, opacity, y } = useSpring({
        from: { height: 0, opacity: 0, y: 0 },
        to: {
            height: isOpen ? locInfo.height : 0,
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 20,
        }
    })

    const Icon = Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}`]
    return (
        <Container>
            <Frame>
                <FolderName>
                    <Icon
                        style={{
                            ...toggle,
                            opacity: children ? 1 : 0.3
                        }}
                        onClick={() => {
                            setOpen(!isOpen)
                        }}
                    />
                    <Title>
                        {name}
                    </Title>
                </FolderName>
                <Content
                    $isOpen={isOpen}
                    style={{
                        opacity,
                        height: isOpen && previous === isOpen ? "auto" : height,
                    }}
                >
                    <a.div
                        style={{ y }}
                        ref={ref}>
                        {children}
                    </a.div>
                </Content>
            </Frame>
        </Container>
    )
})

Tree.displayName = "Tree"

export default Tree