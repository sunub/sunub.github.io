"use client";

import styled from "styled-components";
import { Theme } from "type";

export const Wrapper = styled.div<{ $colorTheme: Theme }>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: background 350ms ease 0s;
  background: var(--color-landscape);
`;
