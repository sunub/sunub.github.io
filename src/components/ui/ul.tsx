"use client";

import styled from "styled-components";

const Li = styled.li`
  position: relative;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 8px;
  font-size: 1rem;
`;

const SvgContainer = styled.div`
  position: absolute;
  left: -1.5rem;
  top: 0.5rem;

  & > svg {
    stroke: oklch(73.44% 0.152 21.47);
  }
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  font-size: inherit;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <Li>
      <SvgContainer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-droplet"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      </SvgContainer>
      {children}
    </Li>
  );
}

function UnOrderedList({ children }: { children: React.ReactNode }) {
  return <Ul>{children}</Ul>;
}

export { ListItem, UnOrderedList };
