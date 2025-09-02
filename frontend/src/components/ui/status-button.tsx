import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button, type ButtonProps } from './button';

const COLORS = [
  'oklch(92.86% 0.036 289.07)',
  'oklch(94.48% 0.028 290.23)',
  'oklch(92.86% 0.036 289.07)',
  'oklch(90.93% 0.045 288.25)',
  'oklch(87.45% 0.064 286.931)',
];

const pendingAnimation = keyframes`
  0%, 100% {
    background-color: oklch(87.45% 0.064 286.931);
    box-shadow: 0 6px 4px 0 oklch(76.64% 0.13 292.01 / 80%);
  }
  50% {
    background-color: oklch(92.86% 0.036 289.07);
    box-shadow: 0 4px 4px 0 oklch(76.64% 0.13 292.01 / 20%);
  }
`;

const StyledStatusButton = styled(Button)<{ status: string }>`
  display: flex;
  justify-content: center;
  gap: 1rem;
  height: fit-content;
  padding: ${({ status }) => (status === 'pending' ? '0' : '0.5rem 1rem')};
`;

export const StatusButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { status: 'pending' | 'success' | 'error' | 'idle' }
>(({ status = 'idle', children, ...props }, ref) => {
  const companion = {
    pending: (
      <PendingWrapper>
        {COLORS.map((color, i) => (
          <PendingBlock key={i} $bg={color} $delay={i} />
        ))}
      </PendingWrapper>
    ),
    success: <span>성공</span>,
    error: <span>❌</span>,
    idle: null,
  }[status];

  return (
    <StyledStatusButton ref={ref} status={status} {...props}>
      {status === 'idle' && children}
      {companion}
      {status !== 'idle' && <PendingBtm />}
    </StyledStatusButton>
  );
});

StatusButton.displayName = 'StatusButton';

const PendingWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  height: 100%;

  &:has(span) :first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 18px;
  }

  &:has(span) :nth-child(5) {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 18px;
  }
`;

const PendingBtm = styled.div`
  position: absolute;
  z-index: 1;
  top: 2px;
  left: -1px;
  width: 102px;
  height: 60px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 18px;
  border-bottom-left-radius: 18px;

  background: linear-gradient(
    90deg,
    oklch(76.64% 0.13 292.01) 0%,
    oklch(87.45% 0.0646 286.931) 6%,
    oklch(87.45% 0.0646 286.931) 91%,
    oklch(76.64% 0.13 292.01) 100%
  );
`;

const PendingBlock = styled.span<{ $bg: string; $delay: number }>`
  position: relative;
  z-index: 2;

  display: block;
  height: 100%;
  width: 20px;
  will-change: background-color, box-shadow;
  animation: ${pendingAnimation} 1.5s ease-in infinite;
  animation-delay: ${({ $delay }) => ($delay + 0.1) * 0.195}s;
  transform: translate3d(0, 0, 0);

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    background-color: ${({ $bg }) => $bg};

    position: absolute;
    top: calc(50% - 4px);
    left: calc(50% - 4px);
  }
`;
