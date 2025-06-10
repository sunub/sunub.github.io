"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const pan = keyframes`
  from { background-position: 0%; }
  to { background-position: 100%; }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(
    circle,
    oklch(88.45% 0.059 18.33) 0%,
    oklch(71.42% 0.059 18.33) 100%
  );
`;

const ErrorBackground = styled.div`
  background-color: #fecaca;
  background-image: var(--error-pattern);
  background-position: 10%;
  animation: ${pan} 3s linear infinite;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 에러 컨텐츠 래퍼
const ErrorContainer = styled.div`
  background-color: #f1f5f9;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 32rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.625;
  margin-bottom: 1rem;
`;

const StackPreview = styled.pre`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-size: 0.875rem;
  color: #444;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Overlay>
      <ErrorBackground>
        <ErrorContainer>
          <Title>{error.message}</Title>
          <div>
            <StackPreview>{error.stack?.split("\n")[0]}</StackPreview>
            {error.digest && <p>{error.digest}</p>}
          </div>
          <ButtonGroup>
            <Button variant="destructive" onClick={() => router.push("/")}>
              홈으로 돌아가기
            </Button>
            <Button onClick={reset}>다시 시도해주세요</Button>
          </ButtonGroup>
        </ErrorContainer>
      </ErrorBackground>
    </Overlay>
  );
}
