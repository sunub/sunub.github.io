"use client";

import styled from "styled-components";

export const Full = styled.div`
  width: 100%;
  height: 100%;
`;

export const FlexCenter = styled(Full)<{ $gap?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.$gap && `gap: ${props.$gap};`}
`;

export const FlexColCenter = styled(FlexCenter)`
  flex-direction: column;
`;

export const FlexRowCenter = styled(FlexCenter)`
  flex-direction: row;
`;
