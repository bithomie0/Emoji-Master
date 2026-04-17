import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, IMPACT_FONT} from '../constants';

type Props = {
  text: string;
};

export const PovLabel: React.FC<Props> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {damping: 9, stiffness: 140, mass: 0.7},
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${scale}) rotate(-3deg)`,
        transformOrigin: 'center top',
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.povYellow,
          color: '#000',
          fontFamily: IMPACT_FONT,
          fontSize: 76,
          padding: '18px 40px',
          border: `6px solid ${COLORS.povBorder}`,
          borderRadius: 14,
          boxShadow: '10px 10px 0 rgba(0,0,0,0.85)',
          letterSpacing: 2,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </div>
    </div>
  );
};
