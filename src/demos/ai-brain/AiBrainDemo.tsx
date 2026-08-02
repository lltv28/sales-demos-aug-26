import { DemoStage } from '../../components/DemoStage';
import { useDemoLoop } from '../../hooks/useDemoLoop';
import './ai-brain.css';

const AI_BRAIN_BEAT_DURATIONS = [2500, 2500, 3000] as const;

const sources = [
  { mark: '01', label: 'Interview' },
  { mark: '02', label: 'Files' },
  { mark: '03', label: 'FAQs' },
];

function FlowArrow({ label, kind }: { label: string; kind: 'teach' | 'answer' }) {
  return (
    <div className={`ab-flow-arrow ab-flow-arrow--${kind}`}>
      <span>{label}</span>
      <i />
    </div>
  );
}

export function AiBrainDemo() {
  const phase = useDemoLoop(AI_BRAIN_BEAT_DURATIONS);

  return (
    <DemoStage
      eyebrow="Brain + Manager"
      title="Your expertise becomes the answer."
      subtitle="Teach Brain + Manager once. Every buyer gets a clear response grounded in the material you approved."
    >
      <div className={`ab-demo ab-demo--phase-${phase + 1}`} data-loop-beats={AI_BRAIN_BEAT_DURATIONS.join(',')}>
        <section className="ab-sources">
          <div className="ab-section-kicker">Your expertise</div>
          <h2>Three trusted inputs</h2>
          <div className="ab-source-list">
            {sources.map((source) => (
              <div className="ab-source" key={source.label}>
                <span>{source.mark}</span>
                <strong>{source.label}</strong>
              </div>
            ))}
          </div>
        </section>

        <FlowArrow label="Teaches" kind="teach" />

        <section className="ab-brain">
          <div className="ab-brain__halo">
            <div className="ab-brain__mark">B</div>
          </div>
          <div className="ab-section-kicker">Shared intelligence</div>
          <h2>Brain + Manager</h2>
          <p>Finds the answer in your approved sources.</p>
        </section>

        <FlowArrow label="Answers" kind="answer" />

        <section className="ab-conversation">
          <div className="ab-question">
            <span>Buyer asks</span>
            <strong>“Can this work with the sales process we already use?”</strong>
          </div>
          <div className="ab-answer">
            <span>Brain + Manager</span>
            <p>Yes. The system can fit around the process your team already uses.</p>
            <div className="ab-citations">
              <i>Interview</i>
              <i>Sales Playbook</i>
            </div>
          </div>
        </section>
      </div>
    </DemoStage>
  );
}
