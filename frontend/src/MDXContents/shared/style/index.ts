import styled from 'styled-components';

export const MDXComponentsRootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  width: 100%;
  height: 100%;

  border-radius: 8px;
  background-color: var(--color-primary);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.02),
    0 2px 4px rgba(0, 0, 0, 0.02),
    0 8px 16px rgba(0, 0, 0, 0.02),
    0 24px 48px rgba(0, 0, 0, 0.05);

  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const EmphasizedText = styled.span`
  font-weight: 900;
  color: var(--color-text);
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--color-text);
  margin-bottom: 1rem;
`;
