"use client";

<<<<<<< HEAD
=======
import Link from "next/link";
>>>>>>> refs/remotes/origin/sunub
import styled from "styled-components";

export const Wrapper = styled.div``;

export const BlogPostTitle = styled.div`
<<<<<<< HEAD
  position: relative;
=======
>>>>>>> refs/remotes/origin/sunub
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

export const BlogPostIcons = styled.div`
  display: grid;
  place-items: center;
`;

export const BlogPostContent = styled.p`
  margin-top: 16px;
`;

export const BlogTagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 8px;
`;

export const BlogTag = styled.span`
  display: inline-flex;
  padding: 2px 8px 2px 8px;
  border-radius: 16px;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 600;
  border: 1.35px solid var(--color-text);
  user-select: none;
`;

<<<<<<< HEAD
export const UnderLineWaveSVG = styled.svg`
  position: absolute;
  top: 93%;
  left: 7%;
  transform: rotate(-1deg);
  stroke: var(--color-highlight);
  stroke-width: 4;
  stroke-linecap: round;
`;

export const UnderLineWavePath = styled.path`
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1);
`;

=======
>>>>>>> refs/remotes/origin/sunub
export const BlogPostWrapper = styled.article`
  display: flex;
  flex-direction: column;
  text-decoration: none;
<<<<<<< HEAD
  transition: transform 200ms cubic-bezier(0.5, 1.25, 0.75, 1.25);

  &:not(:first-of-type) {
    padding-top: 64px;
  }

  &:hover {
    transform: scale(1.05) translateX(-2px) translateZ(16px);

    ${UnderLineWavePath} {
      stroke-dashoffset: 0;
      transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
      transition-duration: 300ms;
    }
=======
  &:not(:first-of-type) {
    padding-top: 48px;
>>>>>>> refs/remotes/origin/sunub
  }
`;
