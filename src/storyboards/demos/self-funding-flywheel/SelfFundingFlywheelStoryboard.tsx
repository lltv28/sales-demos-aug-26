import {
  PersonToken,
  RevenueToken,
  StoryArrow,
  StoryNode,
} from '../../components';
import type { DemoStoryboard } from '../../types';
import './self-funding-flywheel-storyboard.css';

export const SelfFundingFlywheelStoryboard: DemoStoryboard = {
  number: '02',
  title: 'Self-Funding Flywheel',
  promise: 'The first paid AI Triager starts a revenue loop that can fund the next round of ads.',
  frames: [
    {
      beat: 'Create the first sale',
      headline: 'Ads lead to a <$20 assessment',
      description: 'AI Triagers turn ad responses into paid AI Triager buyers.',
      content: (
        <div className="flywheel-sb flywheel-sb--entry">
          <StoryNode tone="soft" className="flywheel-sb__node flywheel-sb__node--ads-entry">
            Paid Ads
          </StoryNode>
          <StoryArrow />
          <StoryNode tone="brand" className="flywheel-sb__node flywheel-sb__node--triagers">
            AI Triagers
            <small>Sell the first step</small>
          </StoryNode>
          <StoryArrow label="sell" />
          <StoryNode tone="soft" className="flywheel-sb__node flywheel-sb__node--assessment">
            &lt;$20 Assessment
          </StoryNode>
          <StoryArrow />
          <PersonToken label="Paid buyer" active />
        </div>
      ),
    },
    {
      beat: 'Offer the right next step',
      headline: 'Main Service first. Pocket Coach only when needed.',
      description: 'The paid buyer receives a plan before the salesperson makes the main offer.',
      content: (
        <div className="flywheel-sb flywheel-sb--offer">
          <div className="flywheel-sb__plan">
            <PersonToken label="Paid buyer" active />
            <StoryNode tone="soft" className="flywheel-sb__node">
              Plan Delivered
              <small>Personalized AI Triager</small>
            </StoryNode>
          </div>
          <StoryArrow />
          <StoryNode tone="dark" className="flywheel-sb__node flywheel-sb__node--seller">
            AI Salesperson
            <small>Offers Main Service first</small>
          </StoryNode>
          <div className="flywheel-sb__routes">
            <div>
              <StoryArrow label="ready" />
              <StoryNode tone="brand" className="flywheel-sb__node">
                Main Service Sold
              </StoryNode>
            </div>
            <div>
              <StoryArrow label="not ready / not qualified" />
              <StoryNode tone="amber" className="flywheel-sb__node">
                Pocket Coach
                <small>Downsell</small>
              </StoryNode>
            </div>
          </div>
        </div>
      ),
    },
    {
      beat: 'Fund the next cycle',
      headline: 'Every sale can fund the next round of ads',
      description: 'AI Brain Manager applies the reinvestment rule after revenue is collected.',
      content: (
        <div className="flywheel-sb flywheel-sb--reinvest">
          <StoryNode className="flywheel-sb__sources">
            <span className="flywheel-sb__sources-label">Revenue from</span>
            <div>
              <RevenueToken label={'<$20 Assessment'} />
              <RevenueToken label="Main Service Sold" />
              <RevenueToken label="Pocket Coach" />
            </div>
          </StoryNode>
          <StoryArrow label="collect" />
          <StoryNode tone="brand" className="flywheel-sb__node flywheel-sb__node--revenue">
            Revenue
          </StoryNode>
          <div className="flywheel-sb__controlled-step">
            <StoryNode tone="dark" className="flywheel-sb__manager">
              AI Brain Manager
              <small>Applies reinvestment rule</small>
            </StoryNode>
            <StoryArrow label="funds next cycle" />
          </div>
          <StoryNode tone="soft" className="flywheel-sb__node flywheel-sb__node--ads">
            Paid Ads
          </StoryNode>
        </div>
      ),
    },
  ],
};
