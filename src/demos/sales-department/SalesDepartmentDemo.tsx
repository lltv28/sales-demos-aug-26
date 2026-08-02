import { DemoStage } from '../../components/DemoStage';
import { useLoopPhase } from '../../hooks/useLoopPhase';
import './sales-department.css';

const Icon = ({ name }: { name: 'brain' | 'chat' | 'check' | 'spark' | 'arrow' }) => {
  const paths = {
    brain: <><path d="M8.2 6.2a3.1 3.1 0 0 1 5.8-1.5 3 3 0 0 1 3.8 3.9 3.4 3.4 0 0 1-.7 6.5 3.2 3.2 0 0 1-5.6 2.2 3.2 3.2 0 0 1-5.6-2.2 3.4 3.4 0 0 1-.7-6.5 3 3 0 0 1 3-2.4Z"/><path d="M12 5.8v12.4M8.2 9.2c1.8.1 2.8 1 3.8 2.3m4-2.3c-1.8.1-3 1.2-4 2.3m-5.6 3.2c2.2-.2 3.8.8 5.6 2.2m5.6-2.2c-2.2-.2-3.8.8-5.6 2.2"/></>,
    chat: <><path d="M5.2 6.7h13.6v9H10l-4.8 3v-12Z"/><path d="M8.5 10h7m-7 2.8h4.4"/></>,
    check: <path d="m6.5 12.2 3.3 3.3 7.7-8"/>,
    spark: <><path d="m12 3 .7 2.8a5 5 0 0 0 3.5 3.5l2.8.7-2.8.7a5 5 0 0 0-3.5 3.5L12 17l-.7-2.8a5 5 0 0 0-3.5-3.5L5 10l2.8-.7a5 5 0 0 0 3.5-3.5L12 3Z"/><path d="m18.5 16 .3 1.2c.2.7.7 1.2 1.4 1.4l1.2.3-1.2.3c-.7.2-1.2.7-1.4 1.4l-.3 1.2-.3-1.2a2 2 0 0 0-1.4-1.4l-1.2-.3 1.2-.3a2 2 0 0 0 1.4-1.4l.3-1.2Z"/></>,
    arrow: <><path d="M5 12h14"/><path d="m15 8 4 4-4 4"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

const triageSteps = [
  'New conversations detected',
  'Opening with the right question',
  'Listening for goals and urgency',
  'Matching need, fit, and readiness',
  'Personalizing the next step',
  'Two clear paths, automatically',
];

export function SalesDepartmentDemo() {
  const phase = useLoopPhase(6, 2600);

  return (
    <DemoStage
      eyebrow="Your AI Sales Department"
      title="One brain. Every conversation handled."
      subtitle="Your AI Brain + Manager equips each Triager to understand the prospect and guide them to the right next step."
      illustrative
    >
      <div className={`sd-demo sd-phase-${phase}`}>
        <section className="sd-brain surface brand-surface">
          <div className="sd-brain-orbit"><Icon name="brain" /></div>
          <div className="micro-label">Shared intelligence</div>
          <h2>AI Brain<br />+ Manager</h2>
          <p>Expertise, offers, positioning, and qualification rules</p>
          <div className="sd-sync"><span className="status-dot" />Continuously guiding</div>
          <div className="sd-knowledge-row">
            <span>Offer fit</span><span>Voice</span><span>FAQs</span>
          </div>
        </section>

        <div className="sd-connector sd-connector--in"><span /></div>

        <section className="sd-triager surface">
          <header className="sd-triager__header">
            <div className="sd-icon sd-icon--primary"><Icon name="chat" /></div>
            <div>
              <div className="micro-label">AI Triager</div>
              <h2>Understands before it recommends</h2>
            </div>
            <div className="sd-live"><span /> 24 conversations live</div>
          </header>

          <div className="sd-activity">
            <div className="sd-progress"><i style={{ width: `${(phase + 1) * 16.666}%` }} /></div>
            <div className="sd-step-label"><Icon name="spark" />{triageSteps[phase]}</div>
          </div>

          <div className="sd-conversations">
            <article className={`sd-thread ${phase >= 1 ? 'is-active' : ''} ${phase >= 4 ? 'is-decided' : ''}`}>
              <div className="sd-avatar">AM</div>
              <div className="sd-thread__body">
                <div className="sd-thread__meta"><strong>Alex M.</strong><span>Just now</span></div>
                <p>“We have demand. I need a complete system that can scale with us.”</p>
                <div className="sd-signals"><span>Clear goal</span><span>Ready now</span><span>Full support</span></div>
              </div>
              <div className="sd-score"><b>92</b><small>FIT</small></div>
            </article>

            <article className={`sd-thread ${phase >= 2 ? 'is-active' : ''} ${phase >= 4 ? 'is-decided' : ''}`}>
              <div className="sd-avatar sd-avatar--soft">JR</div>
              <div className="sd-thread__body">
                <div className="sd-thread__meta"><strong>Jordan R.</strong><span>12 sec ago</span></div>
                <p>“I’m still exploring. I’d like guidance before committing to the full service.”</p>
                <div className="sd-signals"><span>Early stage</span><span>Needs clarity</span><span>Self-guided</span></div>
              </div>
              <div className="sd-score sd-score--warm"><b>68</b><small>FIT</small></div>
            </article>
          </div>
        </section>

        <div className="sd-connector sd-connector--out"><span /></div>

        <section className="sd-outcomes">
          <article className={`sd-outcome surface ${phase >= 4 ? 'is-active' : ''}`}>
            <div className="sd-outcome__icon"><Icon name="check" /></div>
            <div className="micro-label">Best fit</div>
            <h3>Main Service</h3>
            <p>Qualified and ready for a tailored sales conversation.</p>
            <div className="sd-route"><span>Alex M.</span><Icon name="arrow" /></div>
          </article>
          <article className={`sd-outcome surface ${phase >= 5 ? 'is-active' : ''}`}>
            <div className="sd-outcome__icon sd-outcome__icon--soft"><Icon name="spark" /></div>
            <div className="micro-label">Right-sized next step</div>
            <h3>AI Pocket Coach</h3>
            <p>Personal guidance now, with a path to the full service later.</p>
            <div className="sd-route"><span>Jordan R.</span><Icon name="arrow" /></div>
          </article>
        </section>
      </div>
    </DemoStage>
  );
}

