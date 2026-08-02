import { DemoStage } from '../../components/DemoStage';
import { DemoSurface, FlowIconTile, FlowNode } from '../../components/DemoPrimitives';
import './sales-department.css';

const triagers = ['Triager 1', 'Triager 2', 'Triager 3'];
const salespeople = ['Salesperson 1', 'Salesperson 2', 'Salesperson 3'];

function BrainMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5c.65 4.75 3.25 7.35 8 8-4.75.65-7.35 3.25-8 8-.65-4.75-3.25-7.35-8-8 4.75-.65 7.35-3.25 8-8Z" />
    </svg>
  );
}

function PeopleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 19c.6-3.4 2.45-5.1 5.5-5.1s4.9 1.7 5.5 5.1" />
    </svg>
  );
}

export function SalesDepartmentDemo() {
  return (
    <DemoStage
      eyebrow="Your AI Sales Department"
      title="One brain directs the entire sales team"
      subtitle="Brain + Manager guides the Triagers, who route every buyer to the right AI Salesperson."
    >
      <DemoSurface className="sd-org" aria-label="Vertical AI sales department organization chart">
        <svg className="sd-org__connectors" viewBox="0 0 1480 640" fill="none" aria-hidden="true">
          <path d="M740 172V208H352V250" />
          <path d="M740 208V250" />
          <path d="M740 208H1128V250" />
          <path d="M352 376V466" />
          <path d="M740 376V466" />
          <path d="M1128 376V466" />
          <circle cx="740" cy="208" r="5" />
          <circle cx="352" cy="432" r="4" />
          <circle cx="740" cy="432" r="4" />
          <circle cx="1128" cy="432" r="4" />
        </svg>

        <FlowNode className="sd-org__root sd-org__node">
          <FlowIconTile className="sd-org__brain-icon"><BrainMark /></FlowIconTile>
          <div>
            <small>Leadership</small>
            <strong>Brain + Manager</strong>
            <p>Directs every conversation</p>
          </div>
        </FlowNode>

        <div className="sd-org__row sd-org__row--triagers" aria-label="AI Triagers">
          {triagers.map((label) => (
            <FlowNode className="sd-org__node sd-org__role" key={label}>
              <FlowIconTile><PeopleMark /></FlowIconTile>
              <div><small>AI Triager</small><strong>{label}</strong></div>
            </FlowNode>
          ))}
        </div>

        <div className="sd-org__row sd-org__row--salespeople" aria-label="AI Salespeople">
          {salespeople.map((label) => (
            <FlowNode className="sd-org__node sd-org__role" key={label}>
              <FlowIconTile><PeopleMark /></FlowIconTile>
              <div><small>AI Salesperson</small><strong>{label}</strong></div>
            </FlowNode>
          ))}
        </div>
      </DemoSurface>
    </DemoStage>
  );
}
