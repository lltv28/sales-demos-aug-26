import { AiBrainStoryboard } from './demos/ai-brain/AiBrainStoryboard';
import { OrganicWorkflowStoryboard } from './demos/organic-workflow/OrganicWorkflowStoryboard';
import { PaidAdsLoopStoryboard } from './demos/paid-ads-loop/PaidAdsLoopStoryboard';
import { ReinvestmentControlsStoryboard } from './demos/reinvestment-controls/ReinvestmentControlsStoryboard';
import { SalesDepartmentStoryboard } from './demos/sales-department/SalesDepartmentStoryboard';
import { SelfFundingFlywheelStoryboard } from './demos/self-funding-flywheel/SelfFundingFlywheelStoryboard';
import type { DemoStoryboard } from './types';
import './storyboards.css';

const storyboards: DemoStoryboard[] = [
  SalesDepartmentStoryboard,
  SelfFundingFlywheelStoryboard,
  AiBrainStoryboard,
  ReinvestmentControlsStoryboard,
  OrganicWorkflowStoryboard,
  PaidAdsLoopStoryboard,
];

export function StoryboardGallery() {
  const focus = new URLSearchParams(window.location.search).get('focus');
  const visibleStoryboards = focus
    ? storyboards.filter((storyboard) => storyboard.number === focus.padStart(2, '0'))
    : storyboards;

  return (
    <main className={`storyboard-gallery ${focus ? 'storyboard-gallery--focus' : ''}`}>
      <header className="storyboard-gallery__header">
        <div>
          <div className="eyebrow">Gate 1 · Story review</div>
          <h1>Six simpler sales demos</h1>
        </div>
        <p>Each row is one automatic loop. Read left to right: setup, movement, payoff.</p>
      </header>

      {visibleStoryboards.map((storyboard) => (
        <section className="storyboard-row" id={`storyboard-${storyboard.number}`} key={storyboard.number}>
          <div className="storyboard-row__intro">
            <span>Demo {storyboard.number}</span>
            <h2>{storyboard.title}</h2>
            <p>{storyboard.promise}</p>
          </div>
          <div className="storyboard-row__frames">
            {storyboard.frames.map((frame, index) => (
              <article className="storyboard-card" key={frame.beat}>
                <div className="storyboard-card__meta">
                  <span>{index + 1}</span>
                  <div>
                    <strong>{frame.beat}</strong>
                    <small>{frame.description}</small>
                  </div>
                </div>
                <div className="story-frame">
                  <div className="story-frame__heading">
                    <div className="story-frame__brand">Kodara</div>
                    <h3>{frame.headline}</h3>
                  </div>
                  <div className="story-frame__scene">{frame.content}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
