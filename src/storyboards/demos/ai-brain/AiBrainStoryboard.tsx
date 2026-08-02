import { StoryArrow, StoryNode } from '../../components';
import type { DemoStoryboard } from '../../types';
import './ai-brain-storyboard.css';

function BrainMark() {
  return (
    <StoryNode tone="dark" className="brain-story__brain">
      <span>B</span>
      AI Brain Manager
    </StoryNode>
  );
}

export const AiBrainStoryboard: DemoStoryboard = {
  number: '03',
  title: 'AI Brain Manager',
  promise: 'Your real expertise becomes clear, source-backed answers for every buyer.',
  frames: [
    {
      beat: 'Teach it once',
      headline: 'Your expertise goes into one AI Brain Manager.',
      description: 'Interview, files, and FAQs become the source.',
      content: (
        <div className="brain-story brain-story--sources">
          <div className="brain-story__sources">
            <StoryNode>Interview</StoryNode>
            <StoryNode>Files</StoryNode>
            <StoryNode>FAQs</StoryNode>
          </div>
          <StoryArrow label="teaches" />
          <BrainMark />
        </div>
      ),
    },
    {
      beat: 'Answer the buyer',
      headline: 'A buyer asks. AI Brain Manager finds the answer.',
      description: 'One question is answered from trusted sources.',
      content: (
        <div className="brain-story brain-story--question">
          <div className="brain-story__question">
            <span>Buyer asks</span>
            <strong>“Will this fit my current sales process?”</strong>
          </div>
          <StoryArrow />
          <BrainMark />
          <StoryArrow />
          <div className="brain-story__answer-mini">Clear answer</div>
        </div>
      ),
    },
    {
      beat: 'Stay grounded',
      headline: 'Every answer stays tied to your expertise.',
      description: 'Short answer, clear sources, no guesswork.',
      content: (
        <div className="brain-story brain-story--answer">
          <div className="brain-story__answer-card">
            <span>Brain answer</span>
            <strong>“Yes. We can fit around the process your team already uses.”</strong>
            <div className="brain-story__source-chips">
              <i>Interview</i>
              <i>Sales Playbook</i>
            </div>
          </div>
        </div>
      ),
    },
  ],
};
