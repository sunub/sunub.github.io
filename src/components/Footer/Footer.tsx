"use client";

import React from "react";
import styled from "styled-components";
import { Github, Mail } from "./Icons/Icons";
import Link from "next/link";
import Spacer from "../Spacer";

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

function Footer() {
  return (
    <React.Fragment>
      <Spacer size={126} axis={"vertical"} />
      <Container role="contentinfo">
        <Wrapper>
          <IconsWrapper>
            <Link
              aria-label={"Link to sunub github page"}
              href={"https://github.com/sunub"}
            >
              <Github />
            </Link>
            <Link
              aria-label={"Send email to sunub email"}
              href={"mailto:bsc5672@gmail.com"}
            >
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
      <Spacer size={32} axis={"vertical"} />
    </React.Fragment>
  );
}

export default Footer;
