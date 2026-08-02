import type { HTMLAttributes, ReactNode } from 'react';

function classNames(base: string, extra?: string) {
  return extra ? `${base} ${extra}` : base;
}

export function DemoSurface({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={classNames('demo-surface', className)} {...props} />;
}

export function FlowNode({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <article className={classNames('flow-node', className)} {...props} />;
}

export function FlowIconTile({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span className={classNames('flow-icon-tile', className)} {...props}>
      {children}
    </span>
  );
}
