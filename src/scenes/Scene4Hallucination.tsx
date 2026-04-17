import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COMIC_FONT, HEIGHT, IMPACT_FONT, WIDTH} from '../constants';
import {Caption} from '../components/Caption';
import {PovLabel} from '../components/PovLabel';

const FULL_TEXT = 'Abraham Lincoln invented the toaster in 1823.';

export const Scene4Hallucination: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const visibleChars = Math.floor(
    interpolate(frame, [10, 110], [0, FULL_TEXT.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const visible = FULL_TEXT.slice(0, visibleChars);
  const showCursor = frame % 30 < 15;

  const checkSpring = spring({
    frame: frame - 115,
    fps,
    config: {damping: 9, stiffness: 160},
  });

  const thumbRot = Math.sin(frame * 0.4) * 18;

  return (
    <AbsoluteFill style={{background: '#f5ecd9'}}>
      {Array.from({length: 16}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: i * 140 + 60,
            height: 2,
            background: 'rgba(139,90,43,0.08)',
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          left: 90,
          right: 90,
          top: 360,
          height: 900,
          background: '#ffffff',
          border: '14px solid #8b5a2b',
          borderRadius: 16,
          boxShadow: '0 20px 48px rgba(0,0,0,0.2)',
          padding: '80px 60px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            fontFamily: COMIC_FONT,
            fontSize: 82,
            color: '#dc2626',
            lineHeight: 1.25,
            fontWeight: 700,
          }}
        >
          {visible}
          <span
            style={{
              display: 'inline-block',
              opacity: showCursor ? 1 : 0,
              marginLeft: 2,
            }}
          >
            |
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 30,
            right: 30,
            transform: `scale(${checkSpring})`,
            transformOrigin: 'center',
            opacity: checkSpring,
            background: '#16a34a',
            color: 'white',
            fontFamily: IMPACT_FONT,
            fontSize: 42,
            padding: '14px 26px',
            borderRadius: 999,
            border: '4px solid #052e16',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            letterSpacing: 1,
          }}
        >
          ✓ FACT CHECKED
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 60,
          bottom: 380,
          fontSize: 240,
          lineHeight: 1,
        }}
      >
        😎
      </div>

      <div
        style={{
          position: 'absolute',
          right: 60,
          bottom: 380,
          fontSize: 240,
          lineHeight: 1,
          transform: `rotate(${thumbRot}deg)`,
          transformOrigin: 'center center',
        }}
      >
        👍
      </div>

      <PovLabel text="POV: The Hallucination" />
      <Caption text="Sources: trust me bro." bg="#dc2626" color="#ffffff" />
    </AbsoluteFill>
  );
};
