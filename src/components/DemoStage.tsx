import { type ReactNode, useEffect, useState } from 'react';

const STAGE_W = 1280;
const STAGE_H = 720;

export function DemoStage({
  eyebrow,
  title,
  subtitle,
  children,
  illustrative = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  illustrative?: boolean;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <main className="stage-shell">
      <section className="demo-stage" style={{ transform: `scale(${scale})` }}>
        <div className="demo-stage__inner">
          <header className="demo-header">
            <div className="eyebrow">{eyebrow}</div>
            <h1 className="demo-title">{title}</h1>
            {subtitle ? <p className="demo-subtitle">{subtitle}</p> : null}
          </header>
          <div className="demo-body">{children}</div>
        </div>
        {illustrative ? <div className="illustrative-note">Illustrative system activity</div> : null}
      </section>
    </main>
  );
}
