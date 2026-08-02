import { type ReactNode, useEffect, useState } from 'react';

export const STAGE_W = 1600;
export const STAGE_H = 900;

const fitStage = () => Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);

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
  const [scale, setScale] = useState(fitStage);

  useEffect(() => {
    const fit = () => setScale(fitStage());
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  return (
    <main className="stage-shell">
      <section
        className="demo-stage"
        data-native-size={`${STAGE_W}x${STAGE_H}`}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
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
