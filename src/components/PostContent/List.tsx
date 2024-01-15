"use client";

import styled from "styled-components";

const Ul = styled.ul``;

export default function List({ children, ...props }: { children: any[] }) {
  return <Ul {...props}>{children}</Ul>;
}
