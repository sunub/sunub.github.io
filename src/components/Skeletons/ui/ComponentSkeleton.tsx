"use client";

import styled from "styled-components";

function ComponentSkeleton() {
  return (
    <SkeletonContainer>
      <SkeletonLineWide />
      <SkeletonLineWider />
      <SkeletonLineWide />
      <SkeletonLineWide />
      <SkeletonLineWider />
      <SkeletonLineWide />
      <SkeletonLineWide />
      <SkeletonLineWide />
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const SkeletonLineWide = styled.div`
  height: 1rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  width: 75%;
`;

const SkeletonLineWider = styled.div`
  height: 1rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  width: 83.333333%;
`;

export { ComponentSkeleton };
