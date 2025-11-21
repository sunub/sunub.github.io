"use client";

import styled, { keyframes } from "styled-components";
import { ArticleHeader } from "@/app/post/[category]/[slug]/page.style";

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.3; }
`;

export function PostSkeleton() {
	return (
		<SkeletonContainer>
			<ArticleHeader>
				<TitleSkeleton />
				<DateSkeleton />
			</ArticleHeader>

			<ContentSkeletonWrapper>
				{Array.from({ length: 5 }, (_, i) => i).map((key) => (
					<ContentSkeleton key={`${key}th-post-skeleton`} delay={key * 0.1} />
				))}
			</ContentSkeletonWrapper>
		</SkeletonContainer>
	);
}

export function ContentSkeletonOnly() {
	return (
		<ContentSkeletonWrapper>
			{Array.from({ length: 3 }, (_, i) => i).map((key) => (
				<ContentSkeleton key={`${key}th-content-skeleton`} delay={key * 0.1} />
			))}
		</ContentSkeletonWrapper>
	);
}

const SkeletonContainer = styled.div`
  width: 100%;
`;

const TitleSkeleton = styled.div`
  height: 3rem;
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  width: 75%;
  margin-bottom: 1.5rem;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const DateSkeleton = styled.div`
  height: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  width: 25%;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const ContentSkeletonWrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContentSkeleton = styled.div<{ delay: number }>`
  height: 1rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  width: ${() => Math.floor(70 + Math.random() * 30)}%;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-delay: ${(props) => props.delay}s;
`;
