"use client";

import styled from "styled-components";
import Toggler from "@/components/Theme/Toggler/index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;

  visibility: visible;
  opacity: 1;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 44px;
  height: 44px;
  border: 1px solid oklch(61.8% 0.027 30.58 / 0.3);
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  background: var(--color-elevation);
  box-shadow: var(--short-shadow);

  transition: box-shadow 300ms ease;
  &:hover {
    box-shadow: var(--mid-shadow);
  }
`;

export default function HeaderRight() {
  return (
    <Container>
      <Content>
        <Toggler id={"web-header__theme-toggler"} maskId="header-mask-id" />
      </Content>
    </Container>
  );
}
