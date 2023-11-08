'use client';

import React from "react";
import styled from "styled-components";
import { Github, Mail } from "./Icons/Icons";
import Link from "next/link";

const Container = styled.footer`
  grid-area: main-content;
  position: relative;

  display: flex;
  flex-direction: row;
  
  align-items: flex-end;
  justify-content: flex-end;
  
  padding-left: 32px;
  padding-right: 32px;
  
  margin-top: 64px;
  `

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  border-top: 1px solid oklch(93.47% 0.0209 31.07);
  padding-top: 32px;
  padding-bottom: 32px;
`

const CopyRightWrapper = styled.div`
`

const CopyRight = styled.span`
  line-height: 16px;
`

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`

function Footer() {
  return (
    <Container role="contentInfo">
      <Wrapper>
        <IconsWrapper>
          <Link href={"https://github.com/sunub"}>
            <Github />
          </Link>
          <Link href={"mailto:bsc5672@gmail.com"}>
            <Mail />
          </Link>
        </IconsWrapper>
        <CopyRightWrapper>
          <CopyRight>© 2023-present sunub blog. Powered by Next.js, Vercel</CopyRight>
        </CopyRightWrapper>
      </Wrapper>
    </Container>
  )
}

export default Footer;