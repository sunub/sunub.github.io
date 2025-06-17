"use client";

import styled from "styled-components";

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
      <TextContainer>{children}</TextContainer>
    </Li>
  );
}

const Li = styled.li`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 0.5rem;

  & > ul {
    padding-left: 1.5rem;
    margin-top: 0.5rem;
  }
`;

const SvgContainer = styled.span`
  position: relative;
  top: 2px;

  display: flex;
  transform: translateX(0px) translateY(8px);
  & > svg {
    stroke: var(--color-highlight);
  }
`;

const TextContainer = styled.div`
  flex: 1 1;
`;

export { ListItem };
