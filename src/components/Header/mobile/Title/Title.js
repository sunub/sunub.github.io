"use client";

import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { BirdLogo } from "../../icon/Icons";
=======
import { BirdLogo } from "@/components/Header/icon/Icons";
>>>>>>> dev-v2
=======
import { BirdLogo } from "@/components/Header/icon/Icons";
>>>>>>> refs/remotes/origin/sunub
import Link from "next/link";
import styled from "styled-components";
import { baseUrl } from "@/utils/baseUrl";

const Wrapper = styled(Link)`
<<<<<<< HEAD
<<<<<<< HEAD
	width: 45px;
	height: 45px;
=======
  width: 45px;
  height: 45px;
>>>>>>> refs/remotes/origin/sunub

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
<<<<<<< HEAD
	return (
		<Wrapper href={`${baseUrl}/`}>
			<BirdLogo stroke="" />
		</Wrapper>
	);
=======
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
=======
>>>>>>> refs/remotes/origin/sunub
  return (
    <Wrapper href={`${baseUrl}/`}>
      <BirdLogo stroke="" />
    </Wrapper>
  );
<<<<<<< HEAD
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
}

export default Title;
