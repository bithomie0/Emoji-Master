import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HEIGHT, IMPACT_FONT, WIDTH} from '../constants';
import {Caption} from '../components/Caption';
import {PovLabel} from '../components/PovLabel';

// Bezier control points for the hill curve
const P0 = {x: 50, y: 700};
const P1 = {x: 300, y: 500};
const P2 = {x: 700, y: 1400};
const P3 = {x: 1050, y: 1700};

const bezier = (t: number) => {
  const mt = 1 - t;
  const x =
    mt * mt * mt * P0.x +
    3 * mt * mt * t * P1.x +
    3 * mt * t * t * P2.x +
    t * t * t * P3.x;
  const y =
    mt * mt * mt * P0.y +
    3 * mt * mt * t * P1.y +
    3 * mt * t * t * P2.y +
    t * t * t * P3.y;
  return {x, y};
};

export const Scene5GradientDescent: React.FC = () => {
  const frame = useCurrentFrame();
  const t = Math.min(1, frame / 130);
  const point = bezier(t);

  const rot = frame * 14;
  const wobble = Math.sin(frame * 0.5) * 4;

  const cloud1X = 80 + Math.sin(frame * 0.02) * 20;
  const cloud2X = WIDTH - 360 + Math.cos(frame * 0.025) * 20;

  const hillPath = `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`;
  const curvePath = `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`;

  return (
    <AbsoluteFill
      style={{background: 'linear-gradient(#87ceeb 0%, #a7f3d0 100%)'}}
    >
      <div
        style={{
          position: 'absolute',
          left: cloud1X,
          top: 260,
          fontSize: 200,
          lineHeight: 1,
          opacity: 0.95,
        }}
      >
        ☁️
      </div>
      <div
        style={{
          position: 'absolute',
          left: cloud2X,
          top: 180,
          fontSize: 240,
          lineHeight: 1,
          opacity: 0.95,
        }}
      >
        ☁️
      </div>

      <svg
        width={WIDTH}
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{position: 'absolute', left: 0, top: 0}}
      >
        <defs>
          <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>
        </defs>
        <path d={hillPath} fill="url(#hillGrad)" />
        <path
          d={curvePath}
          fill="none"
          stroke="#064e3b"
          strokeWidth={8}
          strokeDasharray="18 12"
          strokeLinecap="round"
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: 640,
          top: 540,
          fontFamily: IMPACT_FONT,
          color: '#dc2626',
          fontSize: 96,
          letterSpacing: 3,
          textShadow: '4px 4px 0 #000',
          transform: 'rotate(-6deg)',
        }}
      >
        LOSS ↓
      </div>

      <div
        style={{
          position: 'absolute',
          left: point.x - 90,
          top: point.y - 180,
          fontSize: 180,
          lineHeight: 1,
          transform: `rotate(${rot}deg)`,
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 8px 10px rgba(0,0,0,0.3))',
        }}
      >
        😵
      </div>

      <div
        style={{
          position: 'absolute',
          left: point.x - 200,
          top: point.y - 330,
          transform: `rotate(${wobble}deg)`,
          transformOrigin: 'center bottom',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            color: '#111',
            fontFamily: IMPACT_FONT,
            fontSize: 60,
            padding: '18px 28px',
            borderRadius: 22,
            border: '5px solid #000',
            boxShadow: '6px 6px 0 #000',
            letterSpacing: 2,
            whiteSpace: 'nowrap',
          }}
        >
          I&rsquo;M LEARNING!!
        </div>
      </div>

      <PovLabel text="POV: Gradient Descent" />
      <Caption text="Failing, but mathematically." />
    </AbsoluteFill>
  );
};
