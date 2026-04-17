import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BUBBLE_FONT, HEIGHT, MONO_FONT, WIDTH} from '../constants';
import {Caption} from '../components/Caption';
import {PovLabel} from '../components/PovLabel';

const LINES = [
  'r/AmITheAsshole thread 2017',
  'tumblr post 2014',
  'stackoverflow: closed as duplicate',
  'ao3 fanfiction ch 47',
  '4chan greentext >be me',
  'wikipedia edit war talk page',
  'youtube comment section 2011',
  'livejournal entry 2008',
  'geocities webring mirror',
  'quora answer (unverified)',
  'reddit AMA gone wrong',
  'myspace top 8 drama',
  'deviantart journal rant',
  'facebook minion meme 2013',
  'tumblr discourse: again',
  'pastebin leak (probably fake)',
  'hacker news flamewar',
  'slashdot comment thread',
];

const COLUMNS = [
  {x: 40, speed: 2.4, offset: 0},
  {x: WIDTH / 2 - 260, speed: 3.1, offset: 6},
  {x: WIDTH - 600, speed: 2.0, offset: 11},
];

export const Scene3TrainingData: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const bubbleSpring = spring({
    frame: frame - 25,
    fps,
    config: {damping: 10, stiffness: 130},
  });

  const sway = Math.sin(frame * 0.1) * 6;
  const lineHeight = 70;
  const totalHeight = LINES.length * lineHeight;

  return (
    <AbsoluteFill style={{background: '#05070a'}}>
      {COLUMNS.map((col, ci) => {
        const shift = -((frame * col.speed) % totalHeight);
        return (
          <div
            key={ci}
            style={{
              position: 'absolute',
              left: col.x,
              top: 0,
              width: 560,
              height: HEIGHT,
              overflow: 'hidden',
              opacity: 0.55,
            }}
          >
            <div style={{transform: `translateY(${shift}px)`}}>
              {[...LINES, ...LINES].map((line, i) => (
                <div
                  key={i}
                  style={{
                    color: '#86efac',
                    fontFamily: MONO_FONT,
                    fontSize: 28,
                    lineHeight: `${lineHeight}px`,
                    whiteSpace: 'nowrap',
                    textShadow: '0 0 8px rgba(134,239,172,0.6)',
                  }}
                >
                  &gt; {LINES[(i + col.offset) % LINES.length]}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: WIDTH / 2 - 220,
          top: HEIGHT / 2 - 220,
          width: 440,
          height: 440,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(34,197,94,0.55) 0%, rgba(34,197,94,0) 70%)',
          filter: 'blur(10px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: HEIGHT / 2 - 180,
          display: 'flex',
          justifyContent: 'center',
          fontSize: 300,
          lineHeight: 1,
          transform: `rotate(${sway}deg)`,
          transformOrigin: 'center bottom',
          filter: 'drop-shadow(0 0 20px rgba(34,197,94,0.7))',
        }}
      >
        🧟
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: HEIGHT / 2 - 440,
          display: 'flex',
          justifyContent: 'center',
          transform: `scale(${bubbleSpring})`,
          transformOrigin: 'center bottom',
          opacity: bubbleSpring,
        }}
      >
        <div
          style={{
            background: '#ffffff',
            color: '#111',
            fontFamily: BUBBLE_FONT,
            fontSize: 44,
            padding: '22px 32px',
            borderRadius: 26,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            maxWidth: 820,
            textAlign: 'center',
            lineHeight: 1.15,
            position: 'relative',
          }}
        >
          I&rsquo;ve read the entire internet. I need therapy.
          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: -20,
              marginLeft: -16,
              width: 0,
              height: 0,
              borderLeft: '16px solid transparent',
              borderRight: '16px solid transparent',
              borderTop: '22px solid #ffffff',
            }}
          />
        </div>
      </div>

      <PovLabel text="POV: Training Data" />
      <Caption text="Has opinions on 2014 Reddit drama." />
    </AbsoluteFill>
  );
};
