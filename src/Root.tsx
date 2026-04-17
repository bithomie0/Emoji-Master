import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {FPS, HEIGHT, WIDTH} from './constants';

export const Root: React.FC = () => {
  return (
    <Composition
      id="AIFundamentals"
      component={Video}
      durationInFrames={900}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
