import React from 'react';
import * as Styled from './Wave.style';
import WaveSvg from './WaveSvg';

function Wave() {
  return (
    <Styled.WaveWrapper>
      <Styled.BackgroundColor />
      <WaveSvg
        style={{
          transition: 'all 350ms ease 0s',
          zIndex: 3,
        }}
      />
    </Styled.WaveWrapper>
  );
}

export default Wave;
