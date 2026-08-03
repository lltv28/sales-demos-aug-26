import { StoryArrow, StoryNode } from '../../components';
import type { DemoStoryboard } from '../../types';
import './organic-workflow-storyboard.css';

function PostBundle() {
  return (
    <div className="organic-post-bundle" aria-label="Seven ready-to-record posts">
      <div className="organic-post-bundle__papers" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <strong>7 posts</strong>
      <small>ready to record</small>
    </div>
  );
}

function AvatarNode() {
  return (
    <div className="organic-avatar">
      <span aria-hidden="true" />
      <div>
        <strong>Your avatar</strong>
        <small>records each idea</small>
      </div>
    </div>
  );
}

export const OrganicWorkflowStoryboard: DemoStoryboard = {
  number: '07',
  title: 'Organic Content Loop',
  promise: 'Turn one week of ideas into paid AI Triagers.',
  frames: [
    {
      beat: 'Create',
      headline: 'AI Brain Manager creates your week of content.',
      description: 'One clear batch, ready for the avatar.',
      content: (
        <div className="organic-create">
          <StoryNode tone="dark" className="organic-brain-node">
            AI Brain Manager
            <small>Your expertise</small>
          </StoryNode>
          <StoryArrow label="creates" />
          <PostBundle />
        </div>
      ),
    },
    {
      beat: 'Record + publish',
      headline: 'Your avatar records. The system publishes.',
      description: 'The middle of the loop stays deliberately simple.',
      content: (
        <div className="organic-production">
          <AvatarNode />
          <StoryArrow label="records" />
          <StoryNode tone="brand" className="organic-publish-node">
            Publish
            <small>Across your channels</small>
          </StoryNode>
        </div>
      ),
    },
    {
      beat: 'Convert + learn',
      headline: 'Every response can become a paid AI Triager.',
      description: 'Buyer signals return to AI Brain Manager for the next week.',
      content: (
        <div className="organic-conversion">
          <svg className="organic-conversion__return" viewBox="0 0 360 125" aria-hidden="true">
            <defs>
              <marker id="organic-return-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="rgba(16, 104, 68, 0.62)" />
              </marker>
            </defs>
            <path d="M302 42 C302 105, 81 114, 60 79" markerEnd="url(#organic-return-arrow)" />
          </svg>
          <StoryNode tone="soft" className="organic-response-node">
            Comment + DM
            <small>Starts a conversation</small>
          </StoryNode>
          <StoryArrow label="offers" />
          <StoryNode tone="brand" className="organic-assessment-node">
            &lt;$20 Assessment
            <small>Paid next step</small>
          </StoryNode>
          <StoryNode tone="soft" className="organic-return-brain">
            AI Brain Manager
            <small>Learns what resonated</small>
          </StoryNode>
          <span className="organic-return-label">buyer signal returns</span>
        </div>
      ),
    },
  ],
};
