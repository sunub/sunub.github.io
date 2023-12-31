"use client";

import React from "react";
import { BirdLogo } from "@/components/Header/icon/Icons";
import Link from "next/link";
import styled from "styled-components";
import { baseUrl } from "@/utils/baseUrl";

const Wrapper = styled(Link)`
  width: 45px;
  height: 45px;

  border: 2px solid var(--color-text);
  border-radius: 8px;
  background: transparent;
  padding: 2px;

  box-shadow: var(--short-shadow);

  display: flex;
  justify-content: center;
  align-items: center;
`;

function Title() {
  return (
    <Wrapper href={`${baseUrl}/`}>
      <BirdLogo stroke="" />
    </Wrapper>
  );
}

export default Title;
