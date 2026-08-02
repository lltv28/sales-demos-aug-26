import { DemoStage } from '../../components/DemoStage';
import { useLoopPhase } from '../../hooks/useLoopPhase';
import './paid-ads-loop.css';

const stages = ['Launch', 'Learn', 'Improve'] as const;

export function PaidAdsLoop() {
  const phase = useLoopPhase(7, 2200);
  const stageIndex = phase <= 1 ? 0 : phase <= 3 ? 1 : 2;

  return (
    <DemoStage
      eyebrow="Managed paid growth"
      title="Every ad cycle gets smarter"
      subtitle="Your AI Brain + Manager learns from real buyers, then Kodara approves the next move."
      illustrative
    >
      <div className="pal-shell surface">
        <div className="pal-topbar">
          <div className="pal-cycle">
            <span className="status-dot" /> Cycle 08 · Live
          </div>
          <div className="pal-stages" aria-label="Launch, learn, improve">
            {stages.map((stage, index) => (
              <div className={`pal-stage ${index === stageIndex ? 'is-active' : ''} ${index < stageIndex ? 'is-done' : ''}`} key={stage}>
                <span>{index < stageIndex ? '✓' : index + 1}</span>{stage}
              </div>
            ))}
          </div>
          <div className="pal-budget"><span>Starting budget</span><strong>$6,000</strong></div>
        </div>

        <div className="pal-workspace">
          <section className="pal-left">
            <div className="micro-label">Creative performance</div>
            <div className="pal-creative-list">
              <CreativeCard
                name="Expert insight"
                spend="$3,600"
                buyers="96"
                cost="$37.50"
                revenue="$9,312"
                strong
                active={phase >= 1}
                boosted={phase >= 5}
              />
              <CreativeCard
                name="Problem aware"
                spend="$2,400"
                buyers="24"
                cost="$100.00"
                revenue="$2,328"
                strong={false}
                active={phase >= 1}
                paused={phase >= 4}
              />
            </div>

            <div className={`pal-signal ${phase >= 2 ? 'is-active' : ''}`}>
              <div className="pal-signal__pulse">◎</div>
              <div>
                <div className="micro-label">Conversion signal returned</div>
                <strong>120 assessment buyers</strong>
                <span>$11,640 assessment revenue · 1.94× revenue / spend</span>
              </div>
            </div>
          </section>

          <section className="pal-center">
            <div className={`pal-brain ${phase >= 2 ? 'is-thinking' : ''}`}>
              <div className="pal-brain__orb"><span>AI</span></div>
              <div className="micro-label">AI Brain + Manager</div>
              <strong>{phase < 2 ? 'Watching buyer signals' : phase < 4 ? 'Finding the winning pattern' : 'Preparing the next cycle'}</strong>
              <div className="pal-brain__signal-row"><i /><i /><i /><i /><i /></div>
            </div>
            <div className={`pal-recommendation ${phase >= 3 ? 'is-active' : ''}`}>
              <span className="pal-recommendation__spark">✦</span>
              <div><span>Recommendation</span><strong>Scale expert insight</strong></div>
            </div>
          </section>

          <aside className="pal-right">
            <div className="micro-label">Next-cycle plan</div>
            <div className={`pal-change pal-change--pause ${phase >= 4 ? 'is-active' : ''}`}>
              <span className="pal-change__icon">Ⅱ</span>
              <div><strong>Pause weak creative</strong><span>Problem aware · $100 CPA</span></div>
              <b>{phase >= 4 ? 'Paused' : 'Reviewing'}</b>
            </div>
            <div className={`pal-change pal-change--move ${phase >= 5 ? 'is-active' : ''}`}>
              <span className="pal-change__icon">↗</span>
              <div><strong>Move budget to winner</strong><span>85% proven · 15% testing</span></div>
              <b>{phase >= 5 ? 'Ready' : 'Queued'}</b>
            </div>

            <div className={`pal-approval ${phase >= 5 ? 'is-active' : ''}`}>
              <div className="pal-approval__people"><span>K</span><span>✓</span></div>
              <div><div className="micro-label">Human approval</div><strong>Approved by Kodara</strong><small>Strategy review complete</small></div>
            </div>

            <div className={`pal-next ${phase >= 6 ? 'is-active' : ''}`}>
              <div className="pal-next__head"><span>Next cycle funded</span><b>Cycle 09</b></div>
              <div className="pal-next__amount">$7,500</div>
              <div className="pal-next__math">$11,640 revenue − $7,500 ads = $4,140 retained</div>
              <div className="pal-next__bar"><span /></div>
            </div>
          </aside>
        </div>
      </div>
    </DemoStage>
  );
}

function CreativeCard({
  name,
  spend,
  buyers,
  cost,
  revenue,
  strong,
  active,
  paused = false,
  boosted = false,
}: {
  name: string;
  spend: string;
  buyers: string;
  cost: string;
  revenue: string;
  strong: boolean;
  active: boolean;
  paused?: boolean;
  boosted?: boolean;
}) {
  return (
    <div className={`pal-creative ${active ? 'is-active' : ''} ${paused ? 'is-paused' : ''} ${boosted ? 'is-boosted' : ''}`}>
      <div className={`pal-creative__preview ${strong ? 'pal-creative__preview--strong' : ''}`}>
        <span className="pal-play">▶</span>
        {boosted ? <span className="pal-scale-badge">Scaling</span> : null}
        {paused ? <span className="pal-pause-badge">Paused</span> : null}
      </div>
      <div className="pal-creative__details">
        <div className="pal-creative__title"><strong>{name}</strong><span>{spend} spend</span></div>
        <div className="pal-creative__metrics">
          <div><span>Buyers</span><strong>{buyers}</strong></div>
          <div><span>Cost / buyer</span><strong>{cost}</strong></div>
          <div><span>Revenue</span><strong>{revenue}</strong></div>
        </div>
      </div>
    </div>
  );
}

export default PaidAdsLoop;
