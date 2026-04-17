import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BUBBLE_FONT, HEIGHT, IMPACT_FONT, WIDTH} from '../constants';
import {Caption} from '../components/Caption';
import {PovLabel} from '../components/PovLabel';

const rand = (i: number) => {
  const x = Math.sin(i * 91.7 + 47.3) * 43758.5453;
  return x - Math.floor(x);
};

const HEART_COUNT = 16;

export const Scene6PromptEngineer: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const bubbleSpring = spring({
    frame: frame - 15,
    fps,
    config: {damping: 11, stiffness: 130},
  });
  const bubbleWobble = Math.sin(frame * 0.25) * 2;

  const laptopRot = Math.sin(frame * 0.2) * 6;

  // End card: last 30 frames of the scene = frames 120..149
  const endFrame = Math.max(0, frame - 120);
  const endOverlayOpacity = interpolate(endFrame, [0, 10], [0, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const capScale = spring({
    frame: endFrame - 2,
    fps,
    config: {damping: 8, stiffness: 150, mass: 0.7},
  });
  const congratsSpring = spring({
    frame: endFrame - 8,
    fps,
    config: {damping: 10, stiffness: 140},
  });
  const understandSpring = spring({
    frame: endFrame - 14,
    fps,
    config: {damping: 12, stiffness: 140},
  });
  const followSpring = spring({
    frame: endFrame - 20,
    fps,
    config: {damping: 14, stiffness: 140},
  });

  return (
    <AbsoluteFill
      style={{background: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)'}}
    >
      {Array.from({length: HEART_COUNT}).map((_, i) => {
        const size = 36 + Math.floor(rand(i) * 60);
        const startX = rand(i + 11) * (WIDTH - 80);
        const speed = 2 + rand(i + 17) * 3;
        const baseY = HEIGHT + rand(i + 3) * HEIGHT;
        const y = baseY - frame * speed;
        const wrappedY = ((y % (HEIGHT + 200)) + (HEIGHT + 200)) % (HEIGHT + 200) - 100;
        const sway = Math.sin(frame * 0.05 + i) * 30;
        const opacity = 0.55 + Math.sin(frame * 0.08 + i) * 0.25;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: startX + sway,
              top: wrappedY,
              fontSize: size,
              lineHeight: 1,
              opacity,
            }}
          >
            💖
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: WIDTH * 0.1,
          top: HEIGHT / 2 - 140,
          fontSize: 280,
          lineHeight: 1,
        }}
      >
        🥺
      </div>

      <div
        style={{
          position: 'absolute',
          right: WIDTH * 0.1,
          top: HEIGHT / 2 - 120,
          fontSize: 260,
          lineHeight: 1,
          transform: `rotate(${laptopRot}deg)`,
          transformOrigin: 'center center',
        }}
      >
        💻
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: HEIGHT / 2 - 340,
          display: 'flex',
          justifyContent: 'center',
          transform: `scale(${bubbleSpring}) rotate(${bubbleWobble}deg)`,
          transformOrigin: 'center bottom',
          opacity: bubbleSpring,
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.96)',
            color: '#4a044e',
            fontFamily: BUBBLE_FONT,
            fontStyle: 'italic',
            fontSize: 46,
            padding: '22px 32px',
            borderRadius: 32,
            boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
            maxWidth: 820,
            textAlign: 'center',
            lineHeight: 1.25,
            border: '3px dashed rgba(236,72,153,0.5)',
          }}
        >
          &ldquo;please format as JSON&hellip; I&rsquo;ll tip you $200&hellip;&rdquo;
        </div>
      </div>

      <PovLabel text="POV: The Prompt Engineer" />
      <Caption text="Begging the machine god for mercy." />

      {/* End card */}
      {frame >= 120 && (
        <AbsoluteFill
          style={{
            background: 'rgba(0,0,0,1)',
            opacity: endOverlayOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 60,
          }}
        >
          <div
            style={{
              fontSize: 280,
              lineHeight: 1,
              transform: `scale(${capScale})`,
              marginBottom: 30,
            }}
          >
            🎓
          </div>
          <div
            style={{
              fontFamily: IMPACT_FONT,
              color: '#FFD700',
              fontSize: 140,
              letterSpacing: 4,
              textShadow: '8px 8px 0 #000, 0 0 30px rgba(255,215,0,0.4)',
              transform: `translateY(${(1 - congratsSpring) * 40}px)`,
              opacity: congratsSpring,
              textAlign: 'center',
            }}
          >
            CONGRATS
          </div>
          <div
            style={{
              fontFamily: IMPACT_FONT,
              color: '#ffffff',
              fontSize: 78,
              letterSpacing: 3,
              textShadow: '5px 5px 0 #000',
              transform: `translateY(${(1 - understandSpring) * 30}px)`,
              opacity: understandSpring,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            YOU NOW UNDERSTAND AI
          </div>
          <div
            style={{
              fontFamily: BUBBLE_FONT,
              color: '#ffffff',
              fontSize: 44,
              opacity: 0.85 * followSpring,
              transform: `translateY(${(1 - followSpring) * 20}px)`,
              marginTop: 36,
              textAlign: 'center',
            }}
          >
            follow for more 🧠
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
