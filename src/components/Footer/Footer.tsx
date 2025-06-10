"use client";

import React from "react";
import styled from "styled-components";
import { Github, Mail } from "./Icons/Icons";
import Link from "next/link";
import Spacer from "../Spacer";
import { VisuallyHidden } from "../VisuallyHidden";

function Footer() {
  return (
    <React.Fragment>
      <Container role="contentinfo">
        <Wrapper>
          <IconsWrapper>
            <Link
              aria-label={"Link to sunub github page"}
              href={"https://github.com/sunub"}
            >
              <VisuallyHidden>
                {"sunub의 github 페이지로 이동합니다."}
              </VisuallyHidden>
              <Github />
            </Link>
            <Link
              aria-label={"Send email to sunub email"}
              href={"mailto:bsc5672@gmail.com"}
            >
              <VisuallyHidden>{"sunub에게 이메일을 보냅니다."}</VisuallyHidden>
              <Mail />
            </Link>
          </IconsWrapper>
          <CopyRightWrapper>
            <CopyRight>
              © 2023-present sunub blog. Powered by Next.js, Vercel
            </CopyRight>
          </CopyRightWrapper>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.footer`
  display: flex;
  flex-direction: row;

  background: var(--color-frontWave);
  transition: background 350ms ease 0s;

  align-items: flex-end;
  justify-content: flex-end;

  padding-left: 32px;
  padding-right: 32px;

  padding-top: 64px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-text);
  gap: 1rem;

  padding-top: 32px;
  padding-bottom: 32px;
`;

const CopyRightWrapper = styled.div``;

const CopyRight = styled.span`
  line-height: 16px;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

export default Footer;
