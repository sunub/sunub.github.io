"use client";

import styled from "styled-components";

function PostSkeleton() {
  return (
    <SkeletonContainer>
      {[...Array(5)].map((_, i) => (
        <SkeletonItem key={i}>
          <TitleSkeleton />
          <BodyFullSkeleton />
          <BodyPartialSkeleton />
          <TagSkeleton />
        </SkeletonItem>
      ))}
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const SkeletonItem = styled.div`
  margin-bottom: 2rem;

  & > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
  }
`;

const TitleSkeleton = styled.div`
  height: 1.5rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  width: 75%;
`;

const BodyFullSkeleton = styled.div`
  height: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  width: 100%;
`;

const BodyPartialSkeleton = styled.div`
  height: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  width: 83.333333%;
`;

const TagSkeleton = styled.div`
  height: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.25rem;
  width: 25%;
`;

export { PostSkeleton };
