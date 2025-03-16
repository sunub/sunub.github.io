"use client";

import styled from "styled-components";

function CardsSkeleton() {
  return (
    <Wrapper>
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <SkeletonItem key={i}></SkeletonItem>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const SkeletonItem = styled.div`
  width: 100%;
  height: 1rem;
  background-color: #f3f4f6;
  border-radius: 4px;
`;

export { CardsSkeleton };
