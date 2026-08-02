import { DemoStage } from '../../components/DemoStage';
import './self-funding-flywheel.css';

const VIEWBOX_WIDTH = 1480;
const VIEWBOX_HEIGHT = 620;
const CENTER = { x: VIEWBOX_WIDTH / 2, y: VIEWBOX_HEIGHT / 2 };
const WHEEL_RADIUS = 250;
const AGENT_RADIUS = WHEEL_RADIUS * 0.62;
const FAN_OFFSETS = [0, -14, 14, -28, 28].map((degrees) => (degrees * Math.PI) / 180);

const STATIONS = [
  { id: 'triage', lines: ['Triage'], angle: -Math.PI / 2 },
  { id: 'high-ticket', lines: ['High Ticket', 'Sales'], angle: 0 },
  { id: 'downsell', lines: ['Downsell', 'Sales'], angle: Math.PI / 2 },
  { id: 'ads', lines: ['Ads'], angle: Math.PI },
] as const;

const CYCLE_ORDER = [3, 0, 1, 2] as const;
const FLYWHEEL_BEAT_DURATIONS = [8000] as const;

type Point = { x: number; y: number };

function polarPoint(angle: number, radius: number): Point {
  return {
    x: CENTER.x + radius * Math.cos(angle),
    y: CENTER.y + radius * Math.sin(angle),
  };
}

function cycleControlPoint(angleA: number, angleB: number): Point {
  let span = angleB - angleA;
  while (span <= 0) span += Math.PI * 2;

  const middleAngle = angleA + span / 2;
  const controlRadius = WHEEL_RADIUS * (2 - Math.cos(span / 2));
  return polarPoint(middleAngle, controlRadius);
}

function quadraticPoint(start: Point, control: Point, end: Point, t: number): Point {
  const inverse = 1 - t;
  return {
    x: inverse * inverse * start.x + 2 * inverse * t * control.x + t * t * end.x,
    y: inverse * inverse * start.y + 2 * inverse * t * control.y + t * t * end.y,
  };
}

function tangentAngle(start: Point, control: Point, end: Point, t: number): number {
  const inverse = 1 - t;
  const dx = 2 * inverse * (control.x - start.x) + 2 * t * (end.x - control.x);
  const dy = 2 * inverse * (control.y - start.y) + 2 * t * (end.y - control.y);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

export function SelfFundingFlywheel() {
  const cycleSegments = CYCLE_ORDER.map((stationIndex, cycleIndex) => {
    const nextStationIndex = CYCLE_ORDER[(cycleIndex + 1) % CYCLE_ORDER.length];
    const startStation = STATIONS[stationIndex];
    const endStation = STATIONS[nextStationIndex];
    const start = polarPoint(startStation.angle, WHEEL_RADIUS);
    const end = polarPoint(endStation.angle, WHEEL_RADIUS);
    const control = cycleControlPoint(startStation.angle, endStation.angle);
    const chevron = quadraticPoint(start, control, end, 0.5);

    return {
      id: `${startStation.id}-${endStation.id}`,
      path: `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`,
      start,
      control,
      end,
      chevron,
      chevronRotation: tangentAngle(start, control, end, 0.5),
    };
  });

  const continuousCyclePath = cycleSegments.map((segment, index) => (
    `${index === 0 ? `M ${segment.start.x} ${segment.start.y} ` : ''}`
    + `Q ${segment.control.x} ${segment.control.y} ${segment.end.x} ${segment.end.y}`
  )).join(' ');

  return (
    <DemoStage
      eyebrow="The Self-Funding Flywheel"
      title="Every sale funds the next buyer."
      subtitle="Ads create demand. AI teams convert it. Revenue returns to acquisition."
    >
      <div
        className="sfw-static demo-surface sfw-static--phase-1"
        data-loop-beats={FLYWHEEL_BEAT_DURATIONS.join(',')}
      >
        <svg
          className="sfw-static__diagram"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          role="img"
          aria-labelledby="sfw-title sfw-description"
        >
          <title id="sfw-title">Self-funding sales flywheel</title>
          <desc id="sfw-description">
            A clockwise circular flow moves from Ads to Triage to High Ticket Sales to Downsell Sales and back to Ads, coordinated by Brain and Manager at the center.
          </desc>

          <circle className="sfw-static__halo" cx={CENTER.x} cy={CENTER.y} r={WHEEL_RADIUS + 34} />

          <g className="sfw-static__cycle">
            {cycleSegments.map((segment) => (
              <path key={segment.id} className="sfw-static__arc" d={segment.path} />
            ))}
            <path className="sfw-static__flow" d={continuousCyclePath} />
            {cycleSegments.map((segment) => (
              <path
                key={`${segment.id}-chevron`}
                className="sfw-static__chevron"
                d="M -10 -8 L 0 0 L -10 8"
                transform={`translate(${segment.chevron.x} ${segment.chevron.y}) rotate(${segment.chevronRotation})`}
              />
            ))}
          </g>

          <g className="sfw-static__spokes">
            {STATIONS.map((station) => {
              const position = polarPoint(station.angle, WHEEL_RADIUS);
              return (
                <line
                  key={station.id}
                  x1={CENTER.x}
                  y1={CENTER.y}
                  x2={position.x}
                  y2={position.y}
                />
              );
            })}
          </g>

          <g className="sfw-static__agents" aria-label="AI sales agents">
            {STATIONS.flatMap((station) =>
              FAN_OFFSETS.map((offset, agentIndex) => {
                const position = polarPoint(station.angle + offset, AGENT_RADIUS);
                return (
                  <g key={`${station.id}-agent-${agentIndex}`} transform={`translate(${position.x} ${position.y})`}>
                    <circle r="14" />
                    <text y="3.25">AI</text>
                  </g>
                );
              }),
            )}
          </g>

          <g className="sfw-static__brain" transform={`translate(${CENTER.x} ${CENTER.y})`}>
            <circle r="84" />
            <text className="sfw-static__brain-kicker" y="-20">AI SYSTEM</text>
            <text className="sfw-static__brain-label" y="10">Brain +</text>
            <text className="sfw-static__brain-label" y="38">Manager</text>
          </g>

          <g className="sfw-static__stations">
            {STATIONS.map((station) => {
              const position = polarPoint(station.angle, WHEEL_RADIUS);
              const firstLineY = station.lines.length === 1 ? 6 : -3;

              return (
                <g key={station.id} transform={`translate(${position.x} ${position.y})`}>
                  <circle r="58" />
                  {station.lines.map((line, lineIndex) => (
                    <text key={line} y={firstLineY + lineIndex * 20}>{line}</text>
                  ))}
                </g>
              );
            })}
          </g>

        </svg>
      </div>
    </DemoStage>
  );
}
