import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENE_FRAMES} from './constants';
import {Scene1NeuralNetwork} from './scenes/Scene1NeuralNetwork';
import {Scene2Transformer} from './scenes/Scene2Transformer';
import {Scene3TrainingData} from './scenes/Scene3TrainingData';
import {Scene4Hallucination} from './scenes/Scene4Hallucination';
import {Scene5GradientDescent} from './scenes/Scene5GradientDescent';
import {Scene6PromptEngineer} from './scenes/Scene6PromptEngineer';

export const Video: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Sequence from={0} durationInFrames={SCENE_FRAMES}>
        <Scene1NeuralNetwork />
      </Sequence>
      <Sequence from={150} durationInFrames={SCENE_FRAMES}>
        <Scene2Transformer />
      </Sequence>
      <Sequence from={300} durationInFrames={SCENE_FRAMES}>
        <Scene3TrainingData />
      </Sequence>
      <Sequence from={450} durationInFrames={SCENE_FRAMES}>
        <Scene4Hallucination />
      </Sequence>
      <Sequence from={600} durationInFrames={SCENE_FRAMES}>
        <Scene5GradientDescent />
      </Sequence>
      <Sequence from={750} durationInFrames={SCENE_FRAMES}>
        <Scene6PromptEngineer />
      </Sequence>
    </AbsoluteFill>
  );
};
