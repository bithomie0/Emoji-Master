import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HEIGHT, WIDTH} from '../constants';
import {Caption} from '../components/Caption';
import {PovLabel} from '../components/PovLabel';

const EYE_OFFSETS: Array<{x: number; y: number}> = [
  {x: -180, y: -90},
  {x: 160, y: -110},
  {x: -210, y: 70},
  {x: 200, y: 80},
  {x: -40, y: -220},
  {x: 60, y: 200},
  {x: 260, y: -10},
];

const ARROW_COUNT = 10;

export const Scene2Transformer: React.FC = () => {
  const frame = useCurrentFrame();
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const ringRadius = 420;

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 50%, #7c3aed 0%, #2e1065 80%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: centerY - 200,
          display: 'flex',
          justifyContent: 'center',
          fontSize: 340,
          lineHeight: 1,
          filter: 'drop-shadow(0 0 24px rgba(253,224,71,0.35))',
        }}
      >
        😳
      </div>

      {EYE_OFFSETS.map((off, i) => {
        const pupilX = Math.sin(frame * 0.3 + i * 1.3) * 14;
        const pupilY = Math.cos(frame * 0.27 + i * 0.7) * 14;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: centerX + off.x - 40,
              top: centerY + off.y - 40,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: '#ffffff',
              border: '4px solid #000',
              boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: '#000',
                transform: `translate(${pupilX}px, ${pupilY}px)`,
              }}
            />
          </div>
        );
      })}

      {Array.from({length: ARROW_COUNT}).map((_, i) => {
        const ringRot = frame * 1.5;
        const angleDeg = (360 / ARROW_COUNT) * i + ringRot;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = centerX + Math.cos(angleRad) * ringRadius;
        const y = centerY + Math.sin(angleRad) * ringRadius;
        const pointDeg = angleDeg + 180;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - 60,
              top: y - 60,
              width: 120,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fbbf24',
              fontSize: 110,
              fontWeight: 900,
              transform: `rotate(${pointDeg}deg)`,
              textShadow:
                '0 0 14px rgba(251,191,36,0.8), 0 0 28px rgba(251,191,36,0.5)',
              fontFamily: 'Impact, Arial Black, sans-serif',
            }}
          >
            →
          </div>
        );
      })}

      <PovLabel text="POV: The Transformer" />
      <Caption text="Attention is all you need (apparently)." />
    </AbsoluteFill>
  );
};
