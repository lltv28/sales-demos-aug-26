import { useEffect, useMemo, useState } from 'react';

const readForcedFrame = (frameCount: number) => {
  const raw = new URLSearchParams(window.location.search).get('frame');
  if (raw === null) return null;
  const requested = Number.parseInt(raw, 10);
  if (!Number.isFinite(requested)) return null;
  return Math.min(Math.max(requested - 1, 0), frameCount - 1);
};

export function useDemoLoop(beatDurationsMs: readonly number[]) {
  const frameCount = beatDurationsMs.length;
  const forcedFrame = useMemo(() => readForcedFrame(frameCount), [frameCount]);
  const [phase, setPhase] = useState(forcedFrame ?? 0);

  useEffect(() => {
    if (forcedFrame !== null || frameCount < 2) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase(frameCount - 1);
      return;
    }

    const timeout = window.setTimeout(
      () => setPhase((current) => (current + 1) % frameCount),
      beatDurationsMs[phase],
    );
    return () => window.clearTimeout(timeout);
  }, [beatDurationsMs, forcedFrame, frameCount, phase]);

  return phase;
}
