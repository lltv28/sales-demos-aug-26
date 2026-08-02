import { DemoStage } from '../../components/DemoStage';
import { DemoSurface, FlowIconTile, FlowNode } from '../../components/DemoPrimitives';
import './ai-brain.css';

const sources = [
  { label: 'Interview 1', detail: 'Founder expertise', kind: 'interview' },
  { label: 'Interview 2', detail: 'Team expertise', kind: 'interview' },
  { label: 'Files', detail: 'Approved materials', kind: 'files' },
];

function SourceMark({ kind }: { kind: string }) {
  return kind === 'files' ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7.5h6l2-2h8v13H4z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="7" />
      <path d="M9 9h6M9 13h6" />
    </svg>
  );
}

function BrainMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5c.65 4.75 3.25 7.35 8 8-4.75.65-7.35 3.25-8 8-.65-4.75-3.25-7.35-8-8 4.75-.65 7.35-3.25 8-8Z" />
    </svg>
  );
}

export function AiBrainDemo() {
  return (
    <DemoStage
      eyebrow="Brain + Manager"
      title="Your expertise becomes shared intelligence"
      subtitle="Interviews and approved files flow into one Brain + Manager for the entire AI sales team."
    >
      <DemoSurface className="ab-vertical" aria-label="Three knowledge sources flowing into Brain and Manager">
        <svg className="ab-vertical__connectors" viewBox="0 0 1480 640" fill="none" aria-hidden="true">
          <defs>
            <marker id="ab-vertical-arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" />
            </marker>
          </defs>
          <path d="M320 205V270H740" />
          <path d="M740 205V270" />
          <path d="M1160 205V270H740" />
          <path className="ab-vertical__down" d="M740 270V380" />
          <circle cx="740" cy="270" r="5" />
        </svg>

        <div className="ab-vertical__sources" aria-label="Knowledge sources">
          {sources.map((source) => (
            <FlowNode className="ab-vertical__source" key={source.label}>
              <FlowIconTile><SourceMark kind={source.kind} /></FlowIconTile>
              <div><strong>{source.label}</strong><small>{source.detail}</small></div>
            </FlowNode>
          ))}
        </div>

        <FlowNode className="ab-vertical__brain">
          <FlowIconTile className="ab-vertical__brain-icon"><BrainMark /></FlowIconTile>
          <div>
            <small>Shared intelligence</small>
            <strong>Brain + Manager</strong>
            <p>One source of truth for every AI role</p>
          </div>
        </FlowNode>
      </DemoSurface>
    </DemoStage>
  );
}
