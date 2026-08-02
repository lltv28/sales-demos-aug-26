import { useState, type KeyboardEvent, type MouseEvent } from 'react';
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
type FocusedNode = {
  id: string;
  label: string;
  position: Point;
  ring: 'brain' | 'station' | 'agent';
  spokeIndex?: number;
};

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
  const [focusedNode, setFocusedNode] = useState<FocusedNode | null>(null);
  const stationNodes = STATIONS.map((station, spokeIndex) => ({
    ...station,
    spokeIndex,
    position: polarPoint(station.angle, WHEEL_RADIUS),
  }));
  const agentNodes = stationNodes.flatMap((station) =>
    FAN_OFFSETS.map((offset, agentIndex) => ({
      id: `${station.id}-agent-${agentIndex}`,
      label: `${station.lines.join(' ')} agent ${agentIndex + 1}`,
      agentIndex,
      spokeIndex: station.spokeIndex,
      stationPosition: station.position,
      position: polarPoint(station.angle + offset, AGENT_RADIUS),
    })),
  );
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
      cycleIndex,
    };
  });
  const focusLookAt = focusedNode
    ? {
        x: (CENTER.x + focusedNode.position.x) / 2,
        y: (CENTER.y + focusedNode.position.y) / 2,
      }
    : CENTER;
  const sceneTransform = focusedNode
    ? `translate(${CENTER.x}px, ${CENTER.y}px) scale(1.4) translate(${-focusLookAt.x}px, ${-focusLookAt.y}px)`
    : 'translate(0px, 0px) scale(1)';

  const toggleFocus = (node: FocusedNode) => {
    setFocusedNode((current) => current?.id === node.id ? null : node);
  };

  const activateNode = (event: MouseEvent<SVGGElement>, node: FocusedNode) => {
    event.stopPropagation();
    toggleFocus(node);
  };

  const activateNodeFromKeyboard = (event: KeyboardEvent<SVGGElement>, node: FocusedNode) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    event.stopPropagation();
    toggleFocus(node);
  };

  const isMuted = (ring: FocusedNode['ring'], spokeIndex?: number) => {
    if (!focusedNode) return false;
    if (focusedNode.ring === 'brain') return ring === 'station';
    if (ring === 'brain') return false;
    return spokeIndex !== focusedNode.spokeIndex;
  };

  return (
    <DemoStage>
      <div
        className={`sfw-static demo-surface sfw-static--phase-1${focusedNode ? ' sfw-static--focused' : ''}`}
        data-loop-beats={FLYWHEEL_BEAT_DURATIONS.join(',')}
        onClick={() => setFocusedNode(null)}
      >
        <svg
          className="sfw-static__diagram"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          role="group"
          aria-labelledby="sfw-title sfw-description"
        >
          <title id="sfw-title">Self-funding sales flywheel</title>
          <desc id="sfw-description">
            A clockwise circular flow moves from Ads to Triage, then to High Ticket Sales and Downsell Sales before returning to Ads, coordinated by the AI Brain Manager at the center. Select any node to focus its branch.
          </desc>

          <g className="sfw-static__scene" style={{ transform: sceneTransform }}>
            <circle className="sfw-static__halo" cx={CENTER.x} cy={CENTER.y} r={WHEEL_RADIUS + 34} />

            <g className={`sfw-static__cycle${focusedNode ? ' sfw-static__muted' : ''}`}>
              {cycleSegments.map((segment) => (
                <path key={segment.id} className="sfw-static__arc" d={segment.path} />
              ))}
              {cycleSegments.map((segment) => (
                <path
                  key={`${segment.id}-chevron`}
                  className={`sfw-static__chevron sfw-static__chevron--${segment.cycleIndex + 1}`}
                  d="M -10 -8 L 0 0 L -10 8"
                  transform={`translate(${segment.chevron.x} ${segment.chevron.y}) rotate(${segment.chevronRotation})`}
                />
              ))}
            </g>

            <g className="sfw-static__network" aria-hidden="true">
              {agentNodes.map((agent) => (
                <g key={`${agent.id}-edges`} className={isMuted('agent', agent.spokeIndex) ? 'sfw-static__muted' : ''}>
                  <line
                    x1={agent.stationPosition.x}
                    y1={agent.stationPosition.y}
                    x2={agent.position.x}
                    y2={agent.position.y}
                  />
                  <line
                    x1={agent.position.x}
                    y1={agent.position.y}
                    x2={CENTER.x}
                    y2={CENTER.y}
                  />
                </g>
              ))}
            </g>

            <g className="sfw-static__agents" aria-label="AI sales agents">
              {agentNodes.map((agent) => (
                <g
                  key={agent.id}
                  className={`sfw-static__focusable${isMuted('agent', agent.spokeIndex) ? ' sfw-static__muted' : ''}`}
                  transform={`translate(${agent.position.x} ${agent.position.y})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Focus ${agent.label}`}
                  aria-pressed={focusedNode?.id === agent.id}
                  onClick={(event) => activateNode(event, {
                    id: agent.id,
                    label: agent.label,
                    position: agent.position,
                    ring: 'agent',
                    spokeIndex: agent.spokeIndex,
                  })}
                  onKeyDown={(event) => activateNodeFromKeyboard(event, {
                    id: agent.id,
                    label: agent.label,
                    position: agent.position,
                    ring: 'agent',
                    spokeIndex: agent.spokeIndex,
                  })}
                >
                  <circle r="14" />
                  <text y="3.25">AI</text>
                </g>
              ))}
            </g>

            <g
              className="sfw-static__brain sfw-static__focusable"
              transform={`translate(${CENTER.x} ${CENTER.y})`}
              role="button"
              tabIndex={0}
              aria-label="Focus AI Brain Manager"
              aria-pressed={focusedNode?.id === 'brain'}
              onClick={(event) => activateNode(event, {
                id: 'brain',
                label: 'AI Brain Manager',
                position: CENTER,
                ring: 'brain',
              })}
              onKeyDown={(event) => activateNodeFromKeyboard(event, {
                id: 'brain',
                label: 'AI Brain Manager',
                position: CENTER,
                ring: 'brain',
              })}
            >
              <circle r="84" />
              <text className="sfw-static__brain-kicker" y="-20">AI SYSTEM</text>
              <text className="sfw-static__brain-label" y="10">AI Brain</text>
              <text className="sfw-static__brain-label" y="38">Manager</text>
            </g>

            <g className="sfw-static__stations">
              {stationNodes.map((station) => {
                const firstLineY = station.lines.length === 1 ? 6 : -3;
                return (
                  <g
                    key={station.id}
                    className={`sfw-static__focusable${isMuted('station', station.spokeIndex) ? ' sfw-static__muted' : ''}`}
                    transform={`translate(${station.position.x} ${station.position.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Focus ${station.lines.join(' ')}`}
                    aria-pressed={focusedNode?.id === `station-${station.id}`}
                    onClick={(event) => activateNode(event, {
                      id: `station-${station.id}`,
                      label: station.lines.join(' '),
                      position: station.position,
                      ring: 'station',
                      spokeIndex: station.spokeIndex,
                    })}
                    onKeyDown={(event) => activateNodeFromKeyboard(event, {
                      id: `station-${station.id}`,
                      label: station.lines.join(' '),
                      position: station.position,
                      ring: 'station',
                      spokeIndex: station.spokeIndex,
                    })}
                  >
                    <circle r="58" />
                    {station.lines.map((line, lineIndex) => (
                      <text key={line} y={firstLineY + lineIndex * 20}>{line}</text>
                    ))}
                  </g>
                );
              })}
            </g>
          </g>

        </svg>
      </div>
    </DemoStage>
  );
}
