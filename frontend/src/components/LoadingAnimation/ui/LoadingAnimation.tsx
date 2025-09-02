import { motion } from 'motion/react';
import styled from 'styled-components';
import { CloudAnime } from './Cloud';

const LoadingContainer = styled.div`
  grid-area: loading;

  display: grid;
  grid: [bird] 1fr / [bird] 1fr;
  gap: 2rem;

  width: 100%;
  height: 100%;

  align-items: center;
  justify-items: center;
`;

const P = styled(motion.p)`
  padding-top: 10rem;
  grid-area: bird;
`;

export function LoadingAnimation({ children }: { children: React.ReactNode }) {
  return (
    <LoadingContainer>
      <CloudAnime
        id="behind-scene__cloud"
        startPosition={{
          startX: 1200,
          endX: -300,
          y: '100px',
        }}
        duration={2100}
      />
      {children}
      <P
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0.0, 0.2, 1],
          delay: 0.2,
        }}
        style={{ fontSize: '1.125rem' }}
      >
        컨텐츠를 불러오는 중...
      </P>
      <CloudAnime
        id="front-scene__cloud"
        startPosition={{
          startX: 1500,
          endX: -100,
          y: '-20px',
        }}
        duration={2100}
      />
    </LoadingContainer>
  );
}
