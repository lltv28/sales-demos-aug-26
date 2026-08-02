import { StoryArrow, StoryNode } from '../../components';
import type { DemoStoryboard } from '../../types';
import './reinvestment-controls-storyboard.css';

export const ReinvestmentControlsStoryboard: DemoStoryboard = {
  number: '05',
  title: 'Reinvestment Controls',
  promise: 'One fixed rule protects profit while automatically funding the next campaign.',
  frames: [
    {
      beat: 'Set one rule',
      headline: 'Choose one simple rule: Reinvest 40%.',
      description: 'The manager follows the same rule every cycle.',
      content: (
        <div className="reinvest-story reinvest-story--rule">
          <div className="reinvest-story__rule">
            <span>Fixed rule</span>
            <strong>Reinvest 40%</strong>
            <small>Brain + Manager</small>
          </div>
        </div>
      ),
    },
    {
      beat: 'Split the revenue',
      headline: 'Every dollar has one of two clear jobs.',
      description: 'Keep profit or fund the next ads.',
      content: (
        <div className="reinvest-story reinvest-story--split">
          <StoryNode tone="dark" className="reinvest-story__revenue">Revenue</StoryNode>
          <div className="reinvest-story__split-rail" aria-hidden="true">
            <i />
            <i />
          </div>
          <div className="reinvest-story__destinations">
            <StoryNode className="reinvest-story__destination">
              <em>60%</em>
              Keep as Profit
            </StoryNode>
            <StoryNode tone="brand" className="reinvest-story__destination">
              <em>40%</em>
              Fund Next Ads
            </StoryNode>
          </div>
        </div>
      ),
    },
    {
      beat: 'Fund the next cycle',
      headline: 'Profit stays visible. The next campaign is funded.',
      description: 'The 40% allocation becomes the next ad budget.',
      content: (
        <div className="reinvest-story reinvest-story--payoff">
          <div className="reinvest-story__allocation">
            <div className="reinvest-story__allocation-head">
              <span>Revenue allocation</span>
              <strong>One rule, every cycle</strong>
            </div>
            <div className="reinvest-story__allocation-bar">
              <span>Keep 60%</span>
              <span>Ads 40%</span>
            </div>
            <div className="reinvest-story__ready">Next ad budget ready</div>
          </div>
        </div>
      ),
    },
  ],
};
