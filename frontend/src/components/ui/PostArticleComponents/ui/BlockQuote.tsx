'use client';

import React from 'react';
import styled from 'styled-components';

const BlockquoteStyle = styled.blockquote`
  position: relative;
  container-name: blockquote;
  container-type: inline-size;

  background: oklch(96.5% 0.013 31.07);
  color: oklch(21.08% 0.055 34.69); /* 기존 색상 - 가독성 좋음 */
  border-radius: 1rem;
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
  padding-right: 2rem;
  padding-left: 5cqw;
  margin-bottom: 1.5rem;

  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    margin-top: 0;
  }
`;

const Bookmark = styled.div`
  position: absolute;
  left: 4cqw;
  top: 1.5cqh;
  color: oklch(73.44% 0.152 21.47);
`;

function BookmarIcon() {
  return (
    <Bookmark>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-book"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    </Bookmark>
  );
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <BlockquoteStyle>
      <BookmarIcon />
      {children}
    </BlockquoteStyle>
  );
}

export { Blockquote };
