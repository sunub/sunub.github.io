"use client";

import styled from "styled-components";

export const Full = styled.div`
  width: 100%;
  height: 100%;
`;

export const FlexCetner = styled(Full)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColCenter = styled(FlexCetner)`
  flex-direction: column;
`;
