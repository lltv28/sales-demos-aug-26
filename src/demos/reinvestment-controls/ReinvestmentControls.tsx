import { DemoStage } from '../../components/DemoStage';
import { useDemoLoop } from '../../hooks/useDemoLoop';
import './reinvestment-controls.css';

const REINVESTMENT_BEAT_DURATIONS = [2400, 2600, 3000] as const;

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="rc-flow-arrow">
      <span>{label}</span>
      <i />
    </div>
  );
}

export function ReinvestmentControls() {
  const phase = useDemoLoop(REINVESTMENT_BEAT_DURATIONS);

  return (
    <DemoStage
      eyebrow="Brain + Manager"
      title="One rule keeps profit visible and growth funded."
      subtitle="Revenue follows the same clear allocation every cycle: keep 60% as profit and reinvest 40% into the next ads."
    >
      <div
        className={`rc-demo rc-demo--phase-${phase + 1}`}
        data-loop-beats={REINVESTMENT_BEAT_DURATIONS.join(',')}
      >
        <section className="rc-revenue">
          <div className="rc-revenue__mark">$</div>
          <span>Money collected</span>
          <h2>Revenue</h2>
        </section>

        <FlowArrow label="Apply rule" />

        <section className="rc-rule">
          <div className="rc-rule__owner">Brain + Manager</div>
          <div className="rc-rule__value">40%</div>
          <h2>Reinvest 40%</h2>
          <p>One fixed rule, every cycle.</p>
        </section>

        <div className="rc-split" aria-hidden="true">
          <span>Split</span>
          <i />
          <i />
        </div>

        <section className="rc-outcomes">
          <article className="rc-outcome rc-outcome--profit">
            <div className="rc-outcome__percent">60%</div>
            <div>
              <span>Keep as</span>
              <h3>Profit</h3>
            </div>
          </article>
          <article className="rc-outcome rc-outcome--ads">
            <div className="rc-outcome__percent">40%</div>
            <div>
              <span>Fund</span>
              <h3>Next Ads</h3>
            </div>
            <strong>Next ad budget ready</strong>
          </article>
        </section>
      </div>
    </DemoStage>
  );
}

export default ReinvestmentControls;
