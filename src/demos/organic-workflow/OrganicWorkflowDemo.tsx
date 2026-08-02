import { DemoSurface, FlowIconTile, FlowNode } from '../../components/DemoPrimitives';
import { DemoStage } from '../../components/DemoStage';
import './organic-workflow.css';

const WORKFLOW = [
  { title: 'Brain + Manager', detail: 'Plans the week', icon: '✦' },
  { title: 'AI Avatar', detail: 'Records the ideas', icon: '◉' },
  { title: 'Publish', detail: 'Posts everywhere', icon: '↑' },
  { title: 'Comments + DMs', detail: 'Captures intent', icon: '••' },
  { title: '$17 Assessment', detail: 'Converts demand', icon: '✓' },
] as const;

export function OrganicWorkflowDemo() {
  return (
    <DemoStage
      eyebrow="Organic growth workflow"
      title="One workflow turns ideas into customers"
      subtitle="Every buyer signal returns to Brain + Manager for the next content cycle."
    >
      <DemoSurface className="ow-static" aria-label="Organic content to paid assessment workflow">
        <div className="ow-static__diagram">
          <svg className="ow-static__connectors" viewBox="0 0 1360 400" fill="none" aria-hidden="true">
            <defs>
              <marker id="ow-static-arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
                <path d="M0 0L10 5L0 10Z" />
              </marker>
              <marker id="ow-static-return-arrow" markerWidth="9" markerHeight="9" refX="9" refY="4.5" orient="auto">
                <path d="M0 0L9 4.5L0 9Z" />
              </marker>
            </defs>

            <path className="ow-static__forward" d="M232 165H272" />
            <path className="ow-static__forward" d="M514 165H554" />
            <path className="ow-static__forward" d="M796 165H836" />
            <path className="ow-static__forward" d="M1078 165H1118" />
            <path className="ow-static__return" d="M1244 260V324Q1244 350 1218 350H142Q116 350 116 324V270" />
          </svg>

          <div className="ow-static__track">
            {WORKFLOW.map((step, index) => (
              <FlowNode className="ow-static__node" key={step.title}>
                <span className="ow-static__step">{String(index + 1).padStart(2, '0')}</span>
                <FlowIconTile className="ow-static__icon" aria-hidden="true">{step.icon}</FlowIconTile>
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </FlowNode>
            ))}
          </div>

          <div className="ow-static__return-label">Buyer signals improve the next cycle</div>
        </div>
      </DemoSurface>
    </DemoStage>
  );
}

export default OrganicWorkflowDemo;
