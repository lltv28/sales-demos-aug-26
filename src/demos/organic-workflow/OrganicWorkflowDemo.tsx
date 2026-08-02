import { DemoStage } from '../../components/DemoStage';
import './organic-workflow.css';

function PostsFan() {
  return (
    <div className="ow-static__posts" aria-label="Seven posts created">
      <div className="ow-static__papers" aria-hidden="true">
        <i /><i /><i />
      </div>
      <div><strong>7 posts</strong><span>recording ready</span></div>
    </div>
  );
}

function AvatarMark() {
  return <span className="ow-static__avatar-mark" aria-hidden="true"><i /></span>;
}

function PublishMark() {
  return <span className="ow-static__publish-mark" aria-hidden="true">↑</span>;
}

function ConversationMark() {
  return <span className="ow-static__conversation-mark" aria-hidden="true"><i /><i /></span>;
}

export function OrganicWorkflowDemo() {
  return (
    <DemoStage
      eyebrow="Organic growth loop"
      title="Turn one week of ideas into paid assessments"
      subtitle="Brain + Manager creates the content, then learns from every buyer response."
      illustrative
    >
      <section className="ow-static" aria-label="Organic content to paid assessment workflow">
        <div className="ow-static__diagram">
          <svg className="ow-static__connectors" viewBox="0 0 1376 500" fill="none" aria-hidden="true">
            <defs>
              <marker id="ow-static-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <path d="M0 0L10 5L0 10Z" />
              </marker>
              <marker id="ow-static-return-arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0 0L9 4.5L0 9Z" />
              </marker>
            </defs>
            <path className="ow-static__forward" d="M288 250H324" />
            <path className="ow-static__forward" d="M532 250H568" />
            <path className="ow-static__forward" d="M746 250H782" />
            <path className="ow-static__forward" d="M1010 250H1046" />
            <path className="ow-static__return" d="M1184 370C1184 456 163 456 163 370" />
          </svg>

          <div className="ow-static__track">
            <article className="ow-static__node ow-static__node--brain">
              <span className="ow-static__step">01</span>
              <div className="ow-static__brain-title"><i aria-hidden="true">✦</i><strong>Brain + Manager</strong></div>
              <p>Creates the week</p>
              <PostsFan />
            </article>

            <article className="ow-static__node ow-static__node--avatar">
              <span className="ow-static__step">02</span>
              <AvatarMark />
              <strong>Avatar records</strong>
              <small>7 videos ready</small>
            </article>

            <article className="ow-static__node ow-static__node--publish">
              <span className="ow-static__step">03</span>
              <PublishMark />
              <strong>Publish</strong>
              <small>Across your channels</small>
            </article>

            <article className="ow-static__node ow-static__node--conversation">
              <span className="ow-static__step">04</span>
              <ConversationMark />
              <strong>Comment + DM</strong>
              <small>Captures buyer intent</small>
            </article>

            <article className="ow-static__node ow-static__node--assessment">
              <span className="ow-static__step">05</span>
              <span className="ow-static__check" aria-hidden="true">✓</span>
              <small>Paid next step</small>
              <strong>$17 Assessment</strong>
              <p>Creates a customer</p>
            </article>
          </div>

          <div className="ow-static__return-label">Buyer signal returns for next week</div>
        </div>
      </section>
    </DemoStage>
  );
}

export default OrganicWorkflowDemo;
