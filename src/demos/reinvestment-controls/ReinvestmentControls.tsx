import { DemoStage } from '../../components/DemoStage';
import { useLoopPhase } from '../../hooks/useLoopPhase';
import './reinvestment-controls.css';

type Strategy = {
  name: string;
  reserve: number;
  owner: number;
  ads: number;
  reservePercent: number;
  ownerPercent: number;
  adsPercent: number;
  note: string;
};

const REVENUE = 12_000;

const strategies: Strategy[] = [
  {
    name: 'Protect',
    reserve: 3_600,
    owner: 5_040,
    ads: 3_360,
    reservePercent: 30,
    ownerPercent: 42,
    adsPercent: 28,
    note: 'Build a stronger cash cushion',
  },
  {
    name: 'Balanced',
    reserve: 2_400,
    owner: 3_600,
    ads: 6_000,
    reservePercent: 20,
    ownerPercent: 30,
    adsPercent: 50,
    note: 'Balance cash flow and growth',
  },
  {
    name: 'Grow Faster',
    reserve: 1_200,
    owner: 1_800,
    ads: 9_000,
    reservePercent: 10,
    ownerPercent: 15,
    adsPercent: 75,
    note: 'Reinvest more into proven demand',
  },
];

const formatMoney = (amount: number) => `$${amount.toLocaleString('en-US')}`;

export function ReinvestmentControls() {
  const phase = useLoopPhase(9, 2000);
  const strategyIndex = Math.floor(phase / 3);
  const step = phase % 3;
  const strategy = strategies[strategyIndex];

  return (
    <DemoStage
      eyebrow="Your AI Brain + Manager"
      title="Every dollar follows the rules you set"
      subtitle="Revenue is protected first, then divided between owner profit and the next growth cycle."
      illustrative
    >
      <div className="rc-layout">
        <section className="rc-console surface">
          <div className="rc-console__top">
            <div>
              <div className="micro-label">Reinvestment strategy</div>
              <div className="rc-strategy-name" key={strategy.name}>{strategy.name}</div>
              <div className="rc-strategy-note">{strategy.note}</div>
            </div>
            <div className="status-pill"><span className="status-dot" /> Rules active</div>
          </div>

          <div className="rc-strategy-tabs" aria-label="Strategy cycle">
            {strategies.map((item, index) => (
              <div className={`rc-strategy-tab ${index === strategyIndex ? 'is-active' : ''}`} key={item.name}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.name}
              </div>
            ))}
          </div>

          <div className="rc-revenue">
            <div className="rc-revenue__icon">$</div>
            <div>
              <div className="micro-label">Revenue received this cycle</div>
              <div className="rc-revenue__amount">{formatMoney(REVENUE)}</div>
            </div>
            <div className={`rc-revenue__signal ${step >= 0 ? 'is-on' : ''}`}>Verified</div>
          </div>

          <div className="rc-flow" aria-label="Revenue allocation">
            <div className={`rc-flow-line rc-flow-line--one ${step >= 1 ? 'is-on' : ''}`} />
            <div className={`rc-flow-line rc-flow-line--two ${step >= 2 ? 'is-on' : ''}`} />
            <div className="rc-allocation-grid">
              <AllocationCard
                active={step >= 1}
                kind="reserve"
                label="Protected reserve"
                amount={strategy.reserve}
                percent={strategy.reservePercent}
              />
              <AllocationCard
                active={step >= 2}
                kind="owner"
                label="Owner profit"
                amount={strategy.owner}
                percent={strategy.ownerPercent}
              />
              <AllocationCard
                active={step >= 2}
                kind="ads"
                label="Next ad budget"
                amount={strategy.ads}
                percent={strategy.adsPercent}
              />
            </div>
          </div>

          <div className="rc-check">
            <span>Allocation check</span>
            <strong>{formatMoney(strategy.reserve + strategy.owner + strategy.ads)} of {formatMoney(REVENUE)}</strong>
            <span className="rc-check__okay">Balanced to the dollar</span>
          </div>
        </section>

        <aside className="rc-oversight surface">
          <div className="rc-oversight__header">
            <div className="rc-kodara-mark">K</div>
            <div>
              <div className="micro-label">Kodara oversight</div>
              <strong>Weekly growth review</strong>
            </div>
          </div>

          <div className="rc-review-list">
            <ReviewItem label="Reserve floor" value="Healthy" active={step >= 1} />
            <ReviewItem label="Cost per buyer" value="Within target" active={step >= 2} />
            <ReviewItem label="Reinvestment rule" value={strategy.name} active />
          </div>

          <div className="rc-review-note">
            <div className="micro-label">Manager recommendation</div>
            <p>{strategy.note}. Rules remain visible and under human oversight.</p>
          </div>

          <div className="rc-reviewed">
            <span className="rc-reviewed__check">✓</span>
            <div>
              <strong>Reviewed by Kodara</strong>
              <span>Monday · 9:14 AM</span>
            </div>
          </div>
        </aside>
      </div>
    </DemoStage>
  );
}

function AllocationCard({
  active,
  kind,
  label,
  amount,
  percent,
}: {
  active: boolean;
  kind: 'reserve' | 'owner' | 'ads';
  label: string;
  amount: number;
  percent: number;
}) {
  return (
    <div className={`rc-allocation rc-allocation--${kind} ${active ? 'is-active' : ''}`}>
      <div className="rc-allocation__head">
        <span className="rc-allocation__icon">{kind === 'reserve' ? '◆' : kind === 'owner' ? '●' : '↗'}</span>
        <span className="rc-allocation__percent">{percent}%</span>
      </div>
      <div className="micro-label">{label}</div>
      <strong>{formatMoney(amount)}</strong>
      <div className="rc-allocation__bar"><span style={{ width: `${percent}%` }} /></div>
    </div>
  );
}

function ReviewItem({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className={`rc-review-item ${active ? 'is-active' : ''}`}>
      <span className="rc-review-item__check">✓</span>
      <div><span>{label}</span><strong>{value}</strong></div>
    </div>
  );
}

export default ReinvestmentControls;
