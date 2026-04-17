import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {IMPACT_FONT} from '../constants';

type Props = {
  text: string;
  bg?: string;
  color?: string;
};

export const Caption: React.FC<Props> = ({
  text,
  bg = '#ffffff',
  color = '#0b0b0b',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({
    frame: frame - 6,
    fps,
    config: {damping: 14, stiffness: 130, mass: 0.6},
  });
  const y = (1 - enter) * 160;
  const opacity = Math.min(1, enter * 1.2);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 140,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div
        style={{
          backgroundColor: bg,
          color,
          fontFamily: IMPACT_FONT,
          fontSize: 64,
          letterSpacing: 1,
          padding: '22px 44px',
          borderRadius: 28,
          boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: 960,
          lineHeight: 1.05,
          border: '4px solid rgba(0,0,0,0.15)',
        }}
      >
        {text}
      </div>
    </div>
  );
};
