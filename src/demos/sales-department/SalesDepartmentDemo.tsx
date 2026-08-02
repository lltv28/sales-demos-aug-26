import { DemoStage } from '../../components/DemoStage';
import { useDemoLoop } from '../../hooks/useDemoLoop';
import './sales-department.css';

const SALES_DEPARTMENT_BEAT_DURATIONS = [2300, 2500, 3400] as const;

const triagers = Array.from({ length: 6 }, (_, index) => (
  <div className="sd-agent" key={index}>
    <span>AI</span>
    <small>Triager {index + 1}</small>
  </div>
));

function FlowArrow({ label, kind }: { label: string; kind: 'direct' | 'handoff' }) {
  return (
    <div className={`sd-flow-arrow sd-flow-arrow--${kind}`}>
      <span>{label}</span>
      <i />
    </div>
  );
}

export function SalesDepartmentDemo() {
  const phase = useDemoLoop(SALES_DEPARTMENT_BEAT_DURATIONS);

  return (
    <DemoStage
      eyebrow="Your AI Sales Department"
      title="One team moves every buyer forward."
      subtitle="Brain + Manager directs the work, six Triagers sell the first step, and one Salesperson makes the right offer."
    >
      <div className={`sd-demo sd-demo--phase-${phase + 1}`} data-loop-beats={SALES_DEPARTMENT_BEAT_DURATIONS.join(',')}>
        <section className="sd-role sd-role--brain">
          <div className="sd-role__mark">B</div>
          <div className="sd-role__kicker">Combined role</div>
          <h2>Brain +<br />Manager</h2>
          <p>Sets the sales play and guides every conversation.</p>
        </section>

        <FlowArrow label="Directs" kind="direct" />

        <section className="sd-triagers">
          <header>
            <div>
              <div className="sd-role__kicker">The front door</div>
              <h2>6 AI Triagers</h2>
            </div>
            <p>Every new buyer gets a helpful first conversation.</p>
          </header>
          <div className="sd-agent-grid">{triagers}</div>
          <div className="sd-assessment">
            <span>Paid first step</span>
            <strong>$17 Personalized Assessment</strong>
            <i>Plan delivered</i>
          </div>
        </section>

        <FlowArrow label="Paid buyer" kind="handoff" />

        <section className="sd-role sd-role--sales">
          <div className="sd-role__mark">S</div>
          <div className="sd-role__kicker">One closer</div>
          <h2>AI Salesperson</h2>
          <p>Offers the Main Service first.</p>
          <div className="sd-offers">
            <div className="sd-offer sd-offer--primary">
              <span>Best fit</span>
              <strong>Main Service</strong>
            </div>
            <div className="sd-offer">
              <span>If not ready / not qualified</span>
              <strong>Pocket Coach</strong>
            </div>
          </div>
        </section>
      </div>
    </DemoStage>
  );
}
