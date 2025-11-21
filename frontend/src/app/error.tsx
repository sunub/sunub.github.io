"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "@/components/ui/button";
import { goToHome } from "@/utils/redirect";

export default function ErrorPage({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	React.useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Outer data-testid="error-page">
			<PatternLayer>
				<Content>
					<Title data-testid={"error-page__title"}>{error.message}</Title>
					<StackTrace data-testid="error-page__stack-trace">
						<Pre>{error.stack?.split("\n")[0]}</Pre>
						<p>{error.digest}</p>
					</StackTrace>
					<ButtonGroup>
						<Button
							variant="destructive"
							onClick={() => {
								// eslint-disable-next-line
								goToHome();
							}}
						>
							홈으로 돌아가기
						</Button>
					</ButtonGroup>
				</Content>
			</PatternLayer>
		</Outer>
	);
}

const pan = keyframes`
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 100% 100%;
  }
`;

const Outer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  z-index: 1000;
  background: radial-gradient(circle, oklch(88.45%, 0.059, 18.33) 0%, oklch(71.42%, 0.059, 18.33) 100%);
  color: oklch(21.08% 0.055 34.69);
`;

const PatternLayer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fecaca;
  background-image: var(--error-pattern);
  animation: ${pan} 10s linear infinite;
  background-position: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background-color: #f1f5f9;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 1rem;
  width: 100%;
  height: fit-content;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.625;
`;

const StackTrace = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 2.5rem;
`;

const Pre = styled.pre`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
