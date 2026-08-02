import { DemoStage } from '../../components/DemoStage';
import './sales-department.css';

const triagers = Array.from({ length: 6 }, (_, index) => (
  <div className="sd-agent" key={index}>
    <span>AI</span>
    <small>Triager {index + 1}</small>
  </div>
));

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="sd-flow-arrow">
      <span>{label}</span>
      <i />
    </div>
  );
}

export function SalesDepartmentDemo() {
  return (
    <DemoStage
      eyebrow="Your AI Sales Department"
      title="One team moves every buyer forward."
      subtitle="Brain + Manager directs the work, six Triagers sell the first step, and one Salesperson makes the right offer."
    >
      <div className="sd-demo">
        <section className="sd-role sd-role--brain">
          <div className="sd-role__mark">B</div>
          <div className="sd-role__kicker">Combined role</div>
          <h2>Brain +<br />Manager</h2>
          <p>Sets the sales play and guides every conversation.</p>
        </section>

        <FlowArrow label="Directs" />

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

        <FlowArrow label="Paid buyer" />

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
