"use client";

import styled from "styled-components";

interface CardGridProps {
  children: React.ReactNode;
}

export function PostCardSkeletonGrid({ children }: CardGridProps) {
  return (
    <GridContainer>
      {children}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 2rem;
  width: 100%;
  padding: 1rem;

  will-change: transform;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;
