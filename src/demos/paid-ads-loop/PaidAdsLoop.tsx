import { DemoStage } from '../../components/DemoStage';
import { useDemoLoop } from '../../hooks/useDemoLoop';
import './paid-ads-loop.css';

const PAID_ADS_BEAT_DURATIONS = [2300, 2600, 2400, 800] as const;

function BuyersMark() {
  return (
    <span className="pal-static__buyers-mark flow-icon-tile" aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

function SparkMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5c.65 4.75 3.25 7.35 8 8-4.75.65-7.35 3.25-8 8-.65-4.75-3.25-7.35-8-8 4.75-.65 7.35-3.25 8-8Z" />
    </svg>
  );
}

function TrendMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 17 17 5M9 5h8v8" />
    </svg>
  );
}

function CycleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 8a8 8 0 1 0 .35 7M19 4v4h-4" />
    </svg>
  );
}

export function PaidAdsLoop() {
  const phase = useDemoLoop(PAID_ADS_BEAT_DURATIONS);

  return (
    <DemoStage>
      <section
        className={`pal-static demo-surface pal-static--phase-${phase + 1}`}
        aria-label="Paid advertising learning loop"
        data-loop-beats={PAID_ADS_BEAT_DURATIONS.join(',')}
      >
        <svg
          className="pal-static__loop"
          viewBox="0 0 1000 560"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <marker id="pal-static-arrow" markerWidth="12" markerHeight="12" refX="12" refY="6" orient="auto">
              <path d="M0 0L12 6L0 12Z" />
            </marker>
          </defs>
          <g className="pal-static__connectors">
            <path d="M340 120H648" />
            <path d="M810 200V348" />
            <path d="M660 440H352" />
            <path d="M190 360V212" />

            <path pathLength="100" className="pal-static__trace pal-static__trace--launch-buyers" d="M340 120H648" />
            <path pathLength="100" className="pal-static__trace pal-static__trace--buyers-brain" d="M810 200V348" />
            <path pathLength="100" className="pal-static__trace pal-static__trace--brain-improve" d="M660 440H352" />
            <path pathLength="100" className="pal-static__trace pal-static__trace--improve-launch" d="M190 360V212" />
          </g>

          <foreignObject x="40" y="40" width="300" height="160">
            <article className="pal-static__node flow-node pal-static__node--launch">
              <span className="pal-static__step">01</span>
              <span className="pal-static__kodara-mark flow-icon-tile" aria-hidden="true">K</span>
              <div><small>Our team</small><strong>Launches Ads</strong></div>
            </article>
          </foreignObject>

          <foreignObject x="660" y="40" width="300" height="160">
            <article className="pal-static__node flow-node pal-static__node--buyers">
              <span className="pal-static__step">02</span>
              <BuyersMark />
              <div><small>Qualified prospects</small><strong>AI Triager</strong></div>
            </article>
          </foreignObject>

          <foreignObject x="660" y="360" width="300" height="160">
            <article className="pal-static__node flow-node pal-static__node--brain">
              <span className="pal-static__step">03</span>
              <span className="pal-static__brain-mark flow-icon-tile"><SparkMark /></span>
              <div><small>AI Brain Manager</small><strong>Learns What Converts</strong></div>
            </article>
          </foreignObject>

          <foreignObject x="40" y="360" width="300" height="160">
            <article className="pal-static__node flow-node pal-static__node--improve">
              <span className="pal-static__step">04</span>
              <span className="pal-static__improve-mark flow-icon-tile"><TrendMark /></span>
              <div><small>Sales revenue</small><strong>Funds Next Launch</strong></div>
            </article>
          </foreignObject>
        </svg>

        <div className="pal-static__funding">
          <span aria-hidden="true"><CycleMark /></span>
          <strong>Self-funding growth cycle</strong>
        </div>
      </section>
    </DemoStage>
  );
}

export default PaidAdsLoop;
