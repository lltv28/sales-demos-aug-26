import { DemoStage } from '../../components/DemoStage';
import { useLoopPhase } from '../../hooks/useLoopPhase';
import './self-funding-flywheel.css';

const activeAt = (phase: number, ...steps: number[]) => steps.includes(phase) ? ' is-active' : '';

export function SelfFundingFlywheel() {
  const phase = useLoopPhase(8, 1700);

  return (
    <DemoStage
      eyebrow="The Self-Funding Flywheel"
      title="Every sale helps fund the next customer."
      subtitle="One AI Brain + Manager coordinates the conversations, offers, revenue, and next advertising cycle."
      illustrative
    >
      <div className={`flywheel-scene phase-${phase}`}>
        <svg className="flywheel-lines" viewBox="0 0 1180 468" aria-hidden="true">
          <defs>
            <marker id="arrow-lead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgba(37,99,235,.55)" />
            </marker>
            <marker id="arrow-money" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgba(16,104,68,.70)" />
            </marker>
            <marker id="arrow-learning" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgba(26,26,26,.28)" />
            </marker>
          </defs>

          <path className={`flow-line lead${activeAt(phase, 0)}`} d="M175 230 C220 230 218 120 264 120" markerEnd="url(#arrow-lead)" />
          <path className={`flow-line lead${activeAt(phase, 1, 2)}`} d="M470 105 C585 62 690 74 782 104" markerEnd="url(#arrow-lead)" />
          <path className={`flow-line lead${activeAt(phase, 1, 3)}`} d="M470 142 C590 192 665 326 782 354" markerEnd="url(#arrow-lead)" />
          <path className={`flow-line money${activeAt(phase, 2, 4)}`} d="M879 160 C870 278 752 386 687 391" markerEnd="url(#arrow-money)" />
          <path className={`flow-line money${activeAt(phase, 3, 4)}`} d="M782 370 C748 382 714 389 687 392" markerEnd="url(#arrow-money)" />
          <path className={`flow-line money return${activeAt(phase, 4, 5, 6)}`} d="M500 408 C330 458 100 424 92 309" markerEnd="url(#arrow-money)" />

          <path className={`brain-link${activeAt(phase, 1, 7)}`} d="M590 226 C520 205 474 158 444 143" markerEnd="url(#arrow-learning)" />
          <path className={`brain-link${activeAt(phase, 2, 7)}`} d="M690 205 C740 174 765 141 790 128" markerEnd="url(#arrow-learning)" />
          <path className={`brain-link${activeAt(phase, 3, 7)}`} d="M690 255 C741 284 765 330 790 348" markerEnd="url(#arrow-learning)" />
          <path className={`brain-link${activeAt(phase, 5, 7)}`} d="M590 273 C579 313 574 348 574 364" markerEnd="url(#arrow-learning)" />
        </svg>

        <section className={`fly-node ads-node${activeAt(phase, 0, 5, 6)}`}>
          <div className="node-topline"><span className="node-icon">AD</span><span className="status-pill"><i className="status-dot" /> Live</span></div>
          <strong>Paid advertising</strong>
          <p>New prospects enter the system.</p>
          <div className="lead-row"><i /><i /><i /><i /><i className="muted-lead" /></div>
          <small>{phase === 6 ? 'Next cycle funded' : 'Traffic arriving now'}</small>
        </section>

        <section className={`fly-node assessment-node${activeAt(phase, 1)}`}>
          <div className="node-topline"><span className="node-icon">$17</span><span className="node-kicker">AI TRIAGE</span></div>
          <strong>Personalized assessment</strong>
          <p>Every buyer receives an immediate plan.</p>
          <div className="conversation-grid">
            {Array.from({ length: 8 }, (_, index) => <i className={index === 7 ? 'is-nurturing' : ''} key={index} />)}
          </div>
          <small>Many conversations, one shared brain</small>
        </section>

        <section className={`fly-node brain-node${activeAt(phase, 1, 2, 3, 5, 7)}`}>
          <div className="brain-halo" />
          <span className="brain-mark">AI</span>
          <strong>AI Brain + Manager</strong>
          <p>Knows your business and directs every step.</p>
          <div className="brain-status">{phase === 7 ? 'Learning from this cycle' : 'Coordinating the system'}</div>
        </section>

        <section className={`fly-node service-node${activeAt(phase, 2)}`}>
          <div className="node-topline"><span className="node-icon">01</span><span className="node-kicker">QUALIFIED</span></div>
          <strong>Main service</strong>
          <p>Ready buyers move to the highest-value next step.</p>
          <div className="result-line"><span>Call requested</span><b>Revenue</b></div>
        </section>

        <section className={`fly-node pocket-node${activeAt(phase, 3)}`}>
          <div className="node-topline"><span className="node-icon">02</span><span className="node-kicker">NOT READY YET</span></div>
          <strong>AI Pocket Coach</strong>
          <p>A lower-friction way to keep learning and buying.</p>
          <div className="result-line"><span>Subscription</span><b>Revenue</b></div>
        </section>

        <section className={`fly-node revenue-node brand-surface${activeAt(phase, 4, 5)}`}>
          <div>
            <span className="micro-label">COLLECTED REVENUE</span>
            <strong className="revenue-total">$3,842</strong>
          </div>
          <div className="revenue-sources">
            <span>Assessments</span><span>Main service</span><span>Pocket Coach</span>
          </div>
          <div className="reinvest-strip">
            <span>Protected profit</span>
            <b>{phase >= 5 ? 'Next ad budget released' : 'Manager applies your rules'}</b>
          </div>
        </section>

        <div className="flow-legend">
          <span><i className="legend-lead" /> Customer movement</span>
          <span><i className="legend-money" /> Money movement</span>
          <span><i className="legend-learning" /> Learning signal</span>
        </div>
      </div>
    </DemoStage>
  );
}
