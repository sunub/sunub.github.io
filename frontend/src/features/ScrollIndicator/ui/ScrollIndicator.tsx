"use client";

import styled from "styled-components";

type ScrollIndicatorProps = {
  source: string;
};

function ScrollIndicator({ source }: ScrollIndicatorProps) {
  const headings = source.split("\n").filter((str) => str.startsWith("#"));
  return (
    <StyledScrollIndicator>
      {headings.map((heading) => {
        const level = heading.split("#").length - 1;
        const text = heading.replace(/#/g, "").trim();
        return <StyledScrollIndicatorItem $level={level} key={text} />;
      })}
    </StyledScrollIndicator>
  );
}

const StyledScrollIndicator = styled.ul`
  position: fixed;
  left: 0;
  top: 50%;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 0.5rem;

  background: var(--color-midStart);
  filter: brightness(1);
`;

const StyledScrollIndicatorItem = styled.li<{ $level: number }>`
  width: ${({ $level }) => `${$level * 10}px`};
  height: 10px;
  background-color: black;
`;

export { ScrollIndicator, type ScrollIndicatorProps };
