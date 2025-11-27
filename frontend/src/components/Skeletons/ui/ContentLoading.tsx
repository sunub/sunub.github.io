"use client";

import styled from "styled-components";

function LoadingAnimation() {
	return (
		<BlogPostListItem>
			<BlogPostWrapper>
				<BlogPostTitle>
					<Title>
						<ContentBlink $width={30} />
					</Title>
				</BlogPostTitle>
				<BlogPostContent>
					<ContentBlink $width={40} />
				</BlogPostContent>
			</BlogPostWrapper>
			<Footer>
				<DateCompo>
					<ContentBlink $width={7} />
				</DateCompo>
			</Footer>
		</BlogPostListItem>
	);
}

function FrontMatterLoading({ length }: { length: number }) {
	return (
		<RootWrapper data-testid="blog-post__front-matter-loading">
			{Array.from(
				{ length },
				(_, index) => `${index}-frontmatter-loading-animation`,
			).map((key) => (
				<LoadingAnimation key={key} />
			))}
		</RootWrapper>
	);
}

export { FrontMatterLoading };

const ContentBlink = styled.div<{ $width: number }>`
  display: inline-block;
  width: ${(props) => props.$width}rem;
  height: 1.5rem;
  background-color: color-mix(in oklch, var(--color-text) 20%, transparent);
  border-radius: 0.25rem;
  animation: blink 1.75s ease-in-out infinite;
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
  }
`;

const RootWrapper = styled.div`
  grid-area: newest;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

const DateCompo = styled.time`
  color: var(--color-text);
`;

const BlogPostTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

const BlogPostContent = styled.div`
  margin-top: 16px;
`;

const BlogPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 250ms cubic-bezier(0.5, 1.25, 0.75, 1.25);
`;

const BlogPostListItem = styled.li`
  &:not(:first-of-type) {
    margin-top: 2rem;
  }
`;

const Footer = styled.footer`
  padding-top: 1rem;
`;
