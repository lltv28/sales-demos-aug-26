import { DemoStage } from '../../components/DemoStage';
import './paid-ads-loop.css';

function BuyersMark() {
  return (
    <span className="pal-static__buyers-mark" aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

export function PaidAdsLoop() {
  return (
    <DemoStage
      eyebrow="Paid growth loop"
      title="Every ad cycle gets smarter"
      subtitle="Kodara and Brain + Manager learn from real buyers, then improve the next launch."
      illustrative
    >
      <section className="pal-static" aria-label="Paid advertising learning loop">
        <div className="pal-static__loop">
          <svg className="pal-static__connectors" viewBox="0 0 1376 420" fill="none" aria-hidden="true">
            <defs>
              <marker id="pal-static-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <path d="M0 0L10 5L0 10Z" />
              </marker>
            </defs>
            <path d="M370 75H1006" />
            <path d="M1171 150V270" />
            <path d="M1006 345H370" />
            <path d="M205 270V150" />
          </svg>

          <article className="pal-static__node pal-static__node--launch">
            <span className="pal-static__step">01</span>
            <span className="pal-static__kodara-mark" aria-hidden="true">K</span>
            <div><small>Kodara</small><strong>Launches Ads</strong></div>
          </article>

          <article className="pal-static__node pal-static__node--buyers">
            <span className="pal-static__step">02</span>
            <BuyersMark />
            <div><small>Right-fit prospects</small><strong>Real Buyers</strong></div>
          </article>

          <article className="pal-static__node pal-static__node--brain">
            <span className="pal-static__step">03</span>
            <span className="pal-static__brain-mark" aria-hidden="true">✦</span>
            <div><small>Brain + Manager</small><strong>Learns What Converts</strong></div>
          </article>

          <article className="pal-static__node pal-static__node--improve">
            <span className="pal-static__step">04</span>
            <span className="pal-static__improve-mark" aria-hidden="true">↗</span>
            <div><small>Kodara</small><strong>Improves Ads</strong></div>
          </article>
        </div>

        <div className="pal-static__funding">
          <span aria-hidden="true">↻</span>
          <strong>Next cycle funded from revenue</strong>
        </div>
      </section>
    </DemoStage>
  );
}

export default PaidAdsLoop;
