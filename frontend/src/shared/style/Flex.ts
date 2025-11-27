"use client";

import styled from "styled-components";

const Full = styled.div`
  width: 100%;
  height: 100%;
`;

const FlexCenter = styled(Full)<{ $gap?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.$gap && `gap: ${props.$gap};`}
`;

export const FlexRowCenter = styled(FlexCenter)`
  flex-direction: row;
`;
