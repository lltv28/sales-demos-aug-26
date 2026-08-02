import type { ReactNode } from 'react';

export function StoryNode({
  children,
  tone = 'plain',
  className = '',
}: {
  children: ReactNode;
  tone?: 'plain' | 'brand' | 'soft' | 'dark' | 'amber';
  className?: string;
}) {
  return <div className={`story-node story-node--${tone} ${className}`}>{children}</div>;
}

export function StoryArrow({ label, vertical = false }: { label?: string; vertical?: boolean }) {
  return (
    <div className={`story-arrow ${vertical ? 'story-arrow--vertical' : ''}`} aria-label={label ?? 'then'}>
      {label && <span>{label}</span>}
      <i />
    </div>
  );
}

export function PersonToken({ label = 'Buyer', active = false }: { label?: string; active?: boolean }) {
  return (
    <div className={`person-token ${active ? 'person-token--active' : ''}`}>
      <span />
      <b>{label}</b>
    </div>
  );
}

export function RevenueToken({ label = 'Revenue' }: { label?: string }) {
  return <div className="revenue-token">{label}</div>;
}
