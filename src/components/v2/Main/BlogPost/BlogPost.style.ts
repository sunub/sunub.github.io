"use client";

import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const BlogPostTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

export const BlogPostIcons = styled.div`
  display: grid;
  place-items: center;
`;

export const BlogPostWrapper = styled.article`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  &:not(:first-of-type) {
    padding-top: 48px;
  }
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
