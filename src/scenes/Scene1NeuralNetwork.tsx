import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BUBBLE_FONT, HEIGHT, WIDTH} from '../constants';
import {Caption} from '../components/Caption';
import {PovLabel} from '../components/PovLabel';

const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const SYMBOLS = ['∑', '∫', 'Wx+b', 'σ', '∇', 'ReLU', 'softmax', 'tanh', 'θ', '∂'];

export const Scene1NeuralNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const amp = interpolate(frame, [0, 150], [2, 30], {extrapolateRight: 'clamp'});
  const shakeX = Math.sin(frame * 1.8) * amp;
  const shakeY = Math.cos(frame * 2.1) * amp * 0.8;
  const rot = Math.sin(frame * 2.4) * (amp * 0.15);

  const bubbleSpring = spring({
    frame: frame - 20,
    fps,
    config: {damping: 10, stiffness: 140},
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 50% 45%, #1e3a8a 0%, #0a0f2c 75%)',
      }}
    >
      {SYMBOLS.map((sym, i) => {
        const startX = rand(i) * (WIDTH - 180) + 60;
        const startY = HEIGHT + 100 + rand(i + 13) * 200;
        const speed = 3 + rand(i + 7) * 4;
        const drift = Math.sin(frame * 0.04 + i) * 40;
        const y = startY - frame * speed;
        const size = 48 + Math.floor(rand(i + 3) * 42);
        const opacity = interpolate(y, [-80, 0, HEIGHT], [0, 1, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: startX + drift,
              top: y,
              fontSize: size,
              color: '#22d3ee',
              fontFamily: BUBBLE_FONT,
              fontWeight: 700,
              textShadow:
                '0 0 14px #22d3ee, 0 0 28px #0ea5e9, 0 0 48px rgba(34,211,238,0.6)',
              opacity,
            }}
          >
            {sym}
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: HEIGHT / 2 - 160,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 320,
            transform: `translate(${shakeX}px, ${shakeY}px) rotate(${rot}deg)`,
            filter: 'drop-shadow(0 0 28px rgba(34,211,238,0.55))',
            lineHeight: 1,
          }}
        >
          🤖
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: WIDTH / 2 + 120,
          top: HEIGHT / 2 - 260,
          transform: `scale(${bubbleSpring})`,
          transformOrigin: 'left bottom',
          opacity: bubbleSpring,
        }}
      >
        <div
          style={{
            background: '#ffffff',
            color: '#111',
            fontFamily: BUBBLE_FONT,
            fontSize: 52,
            padding: '22px 30px',
            borderRadius: 28,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            maxWidth: 520,
            lineHeight: 1.15,
            position: 'relative',
          }}
        >
          I&rsquo;m just doing math&hellip;
          <div
            style={{
              position: 'absolute',
              left: -22,
              bottom: 26,
              width: 0,
              height: 0,
              borderTop: '18px solid transparent',
              borderBottom: '18px solid transparent',
              borderRight: '26px solid #ffffff',
            }}
          />
        </div>
      </div>

      <PovLabel text="POV: The Neural Network" />
      <Caption text="It's actually just matrix multiplication." />
    </AbsoluteFill>
  );
};
