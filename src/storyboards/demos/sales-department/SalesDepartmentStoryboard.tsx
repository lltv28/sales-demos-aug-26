import { StoryArrow, StoryNode } from '../../components';
import type { DemoStoryboard } from '../../types';
import './sales-department-storyboard.css';

const triagers = Array.from({ length: 6 }, (_, index) => (
  <span key={index} aria-hidden="true">
    AI
  </span>
));

export const SalesDepartmentStoryboard: DemoStoryboard = {
  number: '01',
  title: 'Your AI Sales Department',
  promise: 'One manager, a team of triagers, and one salesperson move every buyer forward.',
  frames: [
    {
      beat: 'Direct the team',
      headline: 'One Brain + Manager leads the whole department.',
      description: 'The strategy starts in one place.',
      content: (
        <div className="sd-story sd-story--manager">
          <StoryNode tone="dark" className="sd-story__manager">
            <span className="sd-story__role-icon">B</span>
            Brain + Manager
            <small>Sets the play</small>
          </StoryNode>
          <StoryArrow label="directs" />
          <div className="sd-story__triage-group sd-story__triage-group--preview">
            <div className="sd-story__triage-grid">{triagers}</div>
            <strong>6 AI Triagers</strong>
          </div>
        </div>
      ),
    },
    {
      beat: 'Sell the first step',
      headline: 'Six AI Triagers turn interest into a paid first step.',
      description: 'The $17 assessment is the front door.',
      content: (
        <div className="sd-story sd-story--triagers">
          <div className="sd-story__triage-group sd-story__triage-group--hero">
            <div className="sd-story__triage-grid">{triagers}</div>
            <div>
              <strong>6 AI Triagers</strong>
              <small>Talk with every new buyer</small>
            </div>
          </div>
          <StoryArrow label="sell" />
          <div className="sd-story__assessment">
            <span>Paid first step</span>
            <strong>$17 Assessment</strong>
          </div>
        </div>
      ),
    },
    {
      beat: 'Make the right offer',
      headline: 'One AI Salesperson offers the best next step.',
      description: 'Main Service first, Pocket Coach when needed.',
      content: (
        <div className="sd-story sd-story--salesperson">
          <StoryNode tone="brand" className="sd-story__sales-role">
            <span className="sd-story__role-icon">S</span>
            AI Salesperson
          </StoryNode>
          <div className="sd-story__offer-rail" aria-hidden="true">
            <i />
            <i />
          </div>
          <div className="sd-story__offers">
            <StoryNode tone="soft" className="sd-story__offer sd-story__offer--main">
              <em>Offers first</em>
              Main Service
            </StoryNode>
            <StoryNode className="sd-story__offer">
              <em>If not ready</em>
              Pocket Coach
            </StoryNode>
          </div>
        </div>
      ),
    },
  ],
};
