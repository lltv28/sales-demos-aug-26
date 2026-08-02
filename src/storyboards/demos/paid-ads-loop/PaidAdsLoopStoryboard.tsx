import { PersonToken, StoryArrow, StoryNode } from '../../components';
import type { DemoStoryboard } from '../../types';
import './paid-ads-loop-storyboard.css';

export const PaidAdsLoopStoryboard: DemoStoryboard = {
  number: '08',
  title: 'Paid Ads Learning Loop',
  promise: 'Kodara and AI Brain Manager improve each cycle together.',
  frames: [
    {
      beat: 'Launch',
      headline: 'Kodara launches ads built to find real buyers.',
      description: 'The loop begins with one visible action and one outcome.',
      content: (
        <div className="ads-launch">
          <StoryNode tone="dark" className="ads-kodara-node">
            Kodara
            <small>Launches ads</small>
          </StoryNode>
          <StoryArrow label="attracts" />
          <div className="ads-buyers">
            <PersonToken label="Real buyers" active />
          </div>
        </div>
      ),
    },
    {
      beat: 'Learn + improve',
      headline: 'Buyer signals make the next ads smarter.',
      description: 'AI Brain Manager learns. Kodara turns the learning into action.',
      content: (
        <div className="ads-learning">
          <div className="ads-buyers ads-buyers--compact">
            <PersonToken label="Real buyers" active />
          </div>
          <StoryArrow label="signals" />
          <StoryNode tone="brand" className="ads-brain-node">
            AI Brain Manager
            <small>What converts</small>
          </StoryNode>
          <StoryArrow label="guides" />
          <StoryNode tone="soft" className="ads-improve-node">
            Kodara Improves
            <small>The next ads</small>
          </StoryNode>
        </div>
      ),
    },
    {
      beat: 'Repeat',
      headline: 'Every cycle starts sharper than the last.',
      description: 'One clean loop, with the next cycle funded by revenue.',
      content: (
        <div className="ads-cycle">
          <div className="ads-cycle__loop">
            <svg className="ads-cycle__arrows" viewBox="0 0 360 88" aria-hidden="true">
              <defs>
                <marker id="ads-cycle-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                  <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(16, 104, 68, 0.66)" />
                </marker>
              </defs>
              <path d="M140 17 L216 17" />
              <path d="M292 32 L292 55" />
              <path d="M218 71 L142 71" />
              <path d="M68 55 L68 32" />
            </svg>
            <StoryNode tone="dark" className="ads-cycle__launch">Launch Ads</StoryNode>
            <StoryNode className="ads-cycle__buyers">Real Buyers</StoryNode>
            <StoryNode tone="brand" className="ads-cycle__learn">AI Brain Manager</StoryNode>
            <StoryNode tone="soft" className="ads-cycle__improve">Improve Ads</StoryNode>
          </div>
          <div className="ads-funding-strip">Next cycle funded from revenue</div>
        </div>
      ),
    },
  ],
};
