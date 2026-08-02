import { useEffect, useState } from 'react';

export function useLoopPhase(phaseCount: number, phaseDurationMs: number) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setPhase((current) => (current + 1) % phaseCount), phaseDurationMs);
    return () => window.clearInterval(id);
  }, [phaseCount, phaseDurationMs]);

  return phase;
}
