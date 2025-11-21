"use client";

import styled from "styled-components";

function UnOrderedList({ children }: { children: React.ReactNode }) {
	return <Ul>{children}</Ul>;
}

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
  --nested-padding-left: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  & ul {
    padding-left: var(--nested-padding-left);
    margin-top: 0.5rem;
  }

  & ul ul {
    padding-left: calc(var(--nested-padding-left) * 1.5);
  }

  & ul ul ul {
    padding-left: calc(var(--nested-padding-left) * 2);
  }
`;

export { UnOrderedList };
