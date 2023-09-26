"use client"

import styled from "styled-components"

const Container = styled.div`
	width: 32px;
	height: 32px;
`

export default function Dash() {
	return (
		<Container>
			<svg width="29" height="4" viewBox="0 0 29 4" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2 2H27" stroke="var(--color-icon)" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
			</svg>
		</Container>
	)
}