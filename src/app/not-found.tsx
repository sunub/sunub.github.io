"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { goToHome } from "@/utils/redirect";

const pan = keyframes`
  from { background-position: 0%; }
  to { background-position: 100%; }
`;

const Outer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    oklch(88.45%, 0.059, 18.33) 0%,
    oklch(71.42%, 0.059, 18.33) 100%
  );
`;

const PatternLayer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fecaca;
  background-image: url("/error_page.svg");
  animation: ${pan} 30s linear infinite;
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
  width: fit-content;
  height: fit-content;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.625;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export default function NotFound() {
  const pathname = usePathname();

  return (
    <Outer>
      <PatternLayer>
        <Content>
          <Title>
            해당 url <b>{decodeURI(pathname)}</b> 은 블로그 사이트맵에 존재하지
            않는 url 입니다
          </Title>
          <ButtonGroup>
            <Button variant="destructive" onClick={() => goToHome()}>
              홈으로 돌아가기
            </Button>
          </ButtonGroup>
        </Content>
      </PatternLayer>
    </Outer>
  );
}
