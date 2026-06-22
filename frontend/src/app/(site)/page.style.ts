import styled from "styled-components";

export const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;
  max-width: 1050px;
  margin-left: auto;
  margin-right: auto;

  gap: 1rem 96px;
  padding-left: 48px;
  padding-right: 48px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
`;
