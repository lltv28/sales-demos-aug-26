import type { ReactNode } from 'react';

export type StoryboardFrame = {
  beat: string;
  headline: string;
  description: string;
  content: ReactNode;
};

export type DemoStoryboard = {
  number: string;
  title: string;
  promise: string;
  frames: StoryboardFrame[];
};
