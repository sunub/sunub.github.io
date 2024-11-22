"use client";

import styled from "styled-components";

export const CodeBlockWrapper = styled.div`
  margin-bottom: 1.5rem;

  code {
    display: flex;
    flex-direction: column;
    text-wrap: pretty;
    word-break: break-all;
    padding: 2rem 1.5rem;
    font-size: 0.9rem;
    background: oklch(99.12% 0.0016 0);
    border-radius: 3rem;
  }
  pre {
    border-radius: 0.5rem;
  }
`;
