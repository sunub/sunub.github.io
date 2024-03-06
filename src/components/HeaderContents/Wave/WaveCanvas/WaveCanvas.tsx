'use client';

import React from 'react';
import Canavs from './canvas';

function WaveCanvas() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const canvas = new Canavs(ref.current);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        width: '100cqw',
        height: '208px',
      }}
    />
  );
}

export default WaveCanvas;
