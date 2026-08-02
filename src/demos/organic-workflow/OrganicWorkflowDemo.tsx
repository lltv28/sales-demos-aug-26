import { DemoStage } from '../../components/DemoStage';
import { useLoopPhase } from '../../hooks/useLoopPhase';
import './organic-workflow.css';

const phases = [
  { label: 'Planning this week', detail: 'Your expertise becomes seven ready-to-record posts.' },
  { label: 'Recording content', detail: 'The approved scripts move into the avatar recording queue.' },
  { label: 'Publishing everywhere', detail: 'Each post goes live on the right channel and schedule.' },
  { label: 'Watching for intent', detail: 'A prospect comments the call-to-action keyword.' },
  { label: 'Replying instantly', detail: 'The public reply confirms that the resource is on its way.' },
  { label: 'Opening a conversation', detail: 'A helpful direct message guides the prospect forward.' },
  { label: 'Creating a customer', detail: 'The prospect purchases a personalized AI assessment.' },
  { label: 'Improving the next week', detail: 'Engagement and purchase signals return to the AI Brain.' },
] as const;

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="m3.4 8.2 2.8 2.8 6.4-6.4" />
    </svg>
  );
}

function BrainArtifact() {
  return (
    <div className="ow-brain-artifact">
      <div className="ow-mini-row">
        <span>Weekly content plan</span>
        <strong>7 posts</strong>
      </div>
      <div className="ow-script-lines" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i />
      </div>
    </div>
  );
}

function AvatarArtifact() {
  return (
    <div className="ow-avatar-artifact">
      <div className="ow-video-thumb" aria-label="Neutral avatar recording placeholder">
        <div className="ow-person-placeholder"><span /></div>
        <div className="ow-play"><span /></div>
        <div className="ow-video-time">00:24</div>
      </div>
      <div className="ow-avatar-copy">
        <span>Recording queue</span>
        <strong>7 clips ready</strong>
      </div>
    </div>
  );
}

function PublishArtifact() {
  return (
    <div className="ow-publish-artifact">
      <div className="ow-channel-stack" aria-label="Publishing channels">
        <span>in</span><span>◎</span><span>▶</span>
      </div>
      <div>
        <strong>Post 3 of 7</strong>
        <span>Published · 9:30 AM</span>
      </div>
      <div className="ow-live-dot" />
    </div>
  );
}

function CommentArtifact() {
  return (
    <div className="ow-comment-artifact">
      <div className="ow-avatar-dot">JM</div>
      <div className="ow-comment-bubble">
        <strong>Jordan M.</strong>
        <span>GUIDE</span>
      </div>
      <div className="ow-intent-pill">High intent</div>
    </div>
  );
}

function ReplyArtifact() {
  return (
    <div className="ow-reply-artifact">
      <div className="ow-reply-top"><span className="ow-brand-mark">K</span><strong>Your team</strong></div>
      <p>Sent ✓ Check your messages.</p>
      <span className="ow-time">Just now</span>
    </div>
  );
}

function DmArtifact() {
  return (
    <div className="ow-dm-artifact">
      <div className="ow-message">Here’s the guide. Want a personalized plan?</div>
      <div className="ow-dm-link"><span>AI readiness guide</span><strong>View guide →</strong></div>
    </div>
  );
}

function PurchaseArtifact() {
  return (
    <div className="ow-purchase-artifact">
      <div className="ow-receipt-check"><CheckIcon /></div>
      <div><span>AI Assessment</span><strong>Payment successful</strong></div>
      <div className="ow-price">$17</div>
    </div>
  );
}

function FeedbackArtifact() {
  return (
    <div className="ow-feedback-artifact">
      <div className="ow-signal-bars" aria-hidden="true"><i /><i /><i /><i /></div>
      <div><span>Learning update</span><strong>3 signals returned</strong></div>
      <div className="ow-lift">CTA +12%</div>
    </div>
  );
}

const steps = [
  { id: 'brain', number: '01', title: 'AI Brain creates', caption: 'Seven on-brand posts', artifact: <BrainArtifact /> },
  { id: 'avatar', number: '02', title: 'AI Avatar records', caption: 'Neutral recording workflow', artifact: <AvatarArtifact /> },
  { id: 'publish', number: '03', title: 'Posts publish', caption: 'Scheduled across channels', artifact: <PublishArtifact /> },
  { id: 'comment', number: '04', title: 'Comment triggers', caption: 'Intent captured instantly', artifact: <CommentArtifact /> },
  { id: 'reply', number: '05', title: 'Reply confirms', caption: 'Helpful public response', artifact: <ReplyArtifact /> },
  { id: 'dm', number: '06', title: 'DM opens', caption: 'Conversation continues', artifact: <DmArtifact /> },
  { id: 'purchase', number: '07', title: 'Assessment sells', caption: 'A $17 customer is created', artifact: <PurchaseArtifact /> },
  { id: 'feedback', number: '08', title: 'Results return', caption: 'The next week gets smarter', artifact: <FeedbackArtifact /> },
] as const;

function FlowArrow({ className }: { className: string }) {
  return <div className={`ow-flow-arrow ${className}`} aria-hidden="true"><span /></div>;
}

export function OrganicWorkflowDemo() {
  const phase = useLoopPhase(phases.length, 2250);

  return (
    <DemoStage
      eyebrow="Organic marketing system"
      title="One week of content becomes a customer journey"
      subtitle="Your AI Brain creates, publishes and learns from every conversation."
      illustrative
    >
      <section className="ow-workflow surface" aria-label="Automatic organic marketing workflow">
        <div className="ow-status-bar">
          <div className="ow-status-icon"><span>{String(phase + 1).padStart(2, '0')}</span></div>
          <div className="ow-status-copy" key={phase}>
            <strong>{phases[phase].label}</strong>
            <span>{phases[phase].detail}</span>
          </div>
          <div className="status-pill"><span className="status-dot" />Always on</div>
          <div className="ow-week"><span>THIS WEEK</span><strong>7 posts · 1 new customer</strong></div>
        </div>

        <div className={`ow-flow ow-phase-${phase}`}>
          <svg className="ow-loop-line" viewBox="0 0 1084 354" fill="none" aria-hidden="true">
            <path d="M135 100H949C1000 100 1019 126 1019 166V188C1019 230 994 254 949 254H135C88 254 65 278 65 316V330" />
            <path d="M65 330V88C65 50 88 28 135 28" />
          </svg>

          {steps.map((step, index) => (
            <article
              className={`ow-step ow-step--${step.id} ${phase === index ? 'is-active' : ''} ${phase > index ? 'is-complete' : ''}`}
              key={step.id}
            >
              <div className="ow-step-heading">
                <span className="ow-step-number">{phase > index ? <CheckIcon /> : step.number}</span>
                <div><strong>{step.title}</strong><span>{step.caption}</span></div>
              </div>
              <div className="ow-artifact">{step.artifact}</div>
              <div className="ow-step-glow" />
            </article>
          ))}

          <FlowArrow className="ow-arrow--1" />
          <FlowArrow className="ow-arrow--2" />
          <FlowArrow className="ow-arrow--3" />
          <FlowArrow className="ow-arrow--4" />
          <FlowArrow className="ow-arrow--5" />
          <FlowArrow className="ow-arrow--6" />
          <FlowArrow className="ow-arrow--7" />
          <div className="ow-return-label"><span>Learning loop</span></div>
        </div>
      </section>
    </DemoStage>
  );
}

export default OrganicWorkflowDemo;
