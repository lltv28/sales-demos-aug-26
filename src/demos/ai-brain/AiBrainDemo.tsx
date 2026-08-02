import { DemoStage } from '../../components/DemoStage';
import { useLoopPhase } from '../../hooks/useLoopPhase';
import './ai-brain.css';

const BrainIcon = ({ type }: { type: 'file' | 'mic' | 'faq' | 'brain' | 'quote' | 'sales' | 'content' | 'ads' | 'check' }) => {
  const p = {
    file: <><path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 12h6m-6 3h6"/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v4m-3 0h6"/></>,
    faq: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.3 2.2c-.8.4-1.1.8-1.1 1.8m0 3h.01"/></>,
    brain: <><path d="M8.2 6.2a3.1 3.1 0 0 1 5.8-1.5 3 3 0 0 1 3.8 3.9 3.4 3.4 0 0 1-.7 6.5 3.2 3.2 0 0 1-5.6 2.2 3.2 3.2 0 0 1-5.6-2.2 3.4 3.4 0 0 1-.7-6.5 3 3 0 0 1 3-2.4Z"/><path d="M12 5.8v12.4M8.2 9.2c1.8.1 2.8 1 3.8 2.3m4-2.3c-1.8.1-3 1.2-4 2.3"/></>,
    quote: <><path d="M5 10h5v7H5zM14 10h5v7h-5z"/><path d="M5 10c0-2.4 1.3-4 3.5-5M14 10c0-2.4 1.3-4 3.5-5"/></>,
    sales: <><path d="M5 6.5h14v10H9l-4 3z"/><path d="M8.5 10h7m-7 3h4.5"/></>,
    content: <><path d="M5 4h14v16H5z"/><path d="M8 8h8m-8 4h8m-8 4h5"/></>,
    ads: <><path d="m5 13 10-5v8L5 13Z"/><path d="M15 10.5h2a2.5 2.5 0 0 1 0 5h-2M6.5 13.5l1.5 5"/></>,
    check: <path d="m6.5 12 3.5 3.5 7.5-8"/>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{p[type]}</svg>;
};

const status = ['Gathering source material', 'Reading your expertise', 'Question received', 'Composing from sources', 'Answer grounded and verified', 'Sharing across the system'];

export function AiBrainDemo() {
  const phase = useLoopPhase(6, 2400);

  return (
    <DemoStage
      eyebrow="Your AI Brain + Manager"
      title="Your expertise becomes the source of truth."
      subtitle="Interviews, files, and FAQs become grounded answers your entire growth system can use."
      illustrative
    >
      <div className={`ab-demo ab-phase-${phase}`}>
        <section className="ab-sources">
          <div className="ab-section-label"><span>01</span> Your knowledge</div>
          <article className={`ab-source surface ${phase >= 0 ? 'is-active' : ''}`}>
            <div className="ab-file-icon"><BrainIcon type="mic" /></div>
            <div><strong>Founder Interview</strong><span>Strategy session · 48 min</span></div>
            <em>01:42</em>
          </article>
          <article className={`ab-source surface ${phase >= 1 ? 'is-active' : ''}`}>
            <div className="ab-file-icon"><BrainIcon type="file" /></div>
            <div><strong>Service Standards.pdf</strong><span>Delivery process · 18 pages</span></div>
            <em>PDF</em>
          </article>
          <article className={`ab-source surface ${phase >= 1 ? 'is-active' : ''}`}>
            <div className="ab-file-icon"><BrainIcon type="file" /></div>
            <div><strong>Pricing &amp; Packaging.md</strong><span>Offers · Updated today</span></div>
            <em>MD</em>
          </article>
          <article className={`ab-source surface ${phase >= 1 ? 'is-active' : ''}`}>
            <div className="ab-file-icon"><BrainIcon type="faq" /></div>
            <div><strong>Customer FAQs</strong><span>37 approved answers</span></div>
            <em>FAQ</em>
          </article>
          <div className="ab-source-sync"><span className="status-dot" />4 sources synced</div>
        </section>

        <section className="ab-core">
          <div className="ab-section-label"><span>02</span> Intelligence layer</div>
          <div className="ab-brain-shell">
            <div className="ab-brain-ring ab-brain-ring--outer" />
            <div className="ab-brain-ring ab-brain-ring--inner" />
            <div className="ab-brain-node"><BrainIcon type="brain" /><b>AI Brain<br />+ Manager</b></div>
            <i className="ab-particle ab-particle--1" /><i className="ab-particle ab-particle--2" /><i className="ab-particle ab-particle--3" />
          </div>
          <div className="ab-status"><span>{status[phase]}</span><i><b style={{ width: `${(phase + 1) * 16.666}%` }} /></i></div>
          <div className="ab-brain-tags"><span>Voice matched</span><span>Claims checked</span><span>Offer rules applied</span></div>
        </section>

        <section className="ab-answer">
          <div className="ab-section-label"><span>03</span> Grounded response</div>
          <article className={`ab-question surface ${phase >= 2 ? 'is-active' : ''}`}>
            <div className="ab-question-avatar">P</div>
            <div><small>PROSPECT QUESTION</small><p>“Which option fits a team that wants hands-on support?”</p></div>
          </article>
          <article className={`ab-response surface ${phase >= 3 ? 'is-writing' : ''} ${phase >= 4 ? 'is-grounded' : ''}`}>
            <header><div className="ab-response-icon"><BrainIcon type="quote" /></div><strong>Answer from your AI</strong><span><BrainIcon type="check" /> Grounded</span></header>
            <p>Based on your goals, the <b>Main Service</b> is the strongest fit. It includes hands-on strategy and guided implementation, while the Pocket Coach is designed for a more self-directed path.</p>
            <div className="ab-citations">
              <span><i>1</i> Pricing &amp; Packaging.md</span>
              <span><i>2</i> Service Standards.pdf · p. 6</span>
            </div>
            <div className="ab-confidence"><span>Source confidence</span><i><b /></i><strong>98%</strong></div>
          </article>
          <div className={`ab-outputs ${phase >= 5 ? 'is-active' : ''}`}>
            <div><BrainIcon type="sales" /><span><b>Sales</b>Tailored answer</span></div>
            <div><BrainIcon type="content" /><span><b>Content</b>Expert post</span></div>
            <div><BrainIcon type="ads" /><span><b>Ads</b>Proof-led angle</span></div>
          </div>
        </section>
      </div>
    </DemoStage>
  );
}

