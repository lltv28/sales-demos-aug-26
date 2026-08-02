import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { basename, join, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';

const requestedUrl = process.argv[2];
const localPort = requestedUrl ? null : await findAvailablePort();
const routeUrl = new URL(requestedUrl ?? `http://127.0.0.1:${localPort}/sales-demos-aug-26/paid-ads-loop/`);
const tolerance = 2;
const viewports = [
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
];
const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];
const chromePath = chromeCandidates.find(existsSync);

if (!chromePath) throw new Error('Google Chrome was not found.');

let vite;
let chrome;
let socket;
const profile = mkdtempSync(join(tmpdir(), 'codex-paid-ads-geometry-'));
const chromePort = 12000 + Math.floor(Math.random() * 12000);

const routeIsAvailable = async () => {
  try {
    const response = await fetch(routeUrl);
    return response.ok;
  } catch {
    return false;
  }
};

const waitForRoute = async () => {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await routeIsAvailable()) return;
    await sleep(100);
  }
  throw new Error(`Timed out waiting for ${routeUrl}.`);
};

try {
  if (!(await routeIsAvailable())) {
    if (routeUrl.hostname !== '127.0.0.1' && routeUrl.hostname !== 'localhost') {
      throw new Error(`Cannot launch a local Vite server for non-local URL ${routeUrl}.`);
    }

    const viteEntry = resolve('node_modules/vite/bin/vite.js');
    vite = spawn(process.execPath, [
      viteEntry,
      '--host', routeUrl.hostname,
      '--port', routeUrl.port || '4173',
      '--strictPort',
    ], {
      cwd: resolve('.'),
      stdio: ['ignore', 'ignore', 'pipe'],
      windowsHide: true,
    });

    let viteError = '';
    vite.stderr.on('data', (chunk) => { viteError += chunk.toString(); });
    vite.once('exit', (code) => {
      if (code && code !== 0) process.stderr.write(viteError);
    });
    await waitForRoute();
  }

  chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${chromePort}`,
    `--user-data-dir=${profile}`,
    `--window-size=${viewports[0].width},${viewports[0].height}`,
    '--force-device-scale-factor=1',
    routeUrl.toString(),
  ], { stdio: ['ignore', 'ignore', 'ignore'], windowsHide: true });

  let target;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${chromePort}/json/list`).then((response) => response.json());
      target = targets.find((item) => item.type === 'page' && item.url.includes(routeUrl.pathname));
      if (target) break;
    } catch {
      // Chrome has not exposed its debugging port yet.
    }
    await sleep(100);
  }

  if (!target) throw new Error('Chrome did not expose the Paid Ads page.');

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolvePromise, reject) => {
    socket.addEventListener('open', resolvePromise, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let messageId = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve: resolvePending, reject: rejectPending } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) rejectPending(new Error(message.error.message));
    else resolvePending(message.result);
  });

  const send = (method, params = {}) => new Promise((resolvePending, rejectPending) => {
    const id = ++messageId;
    pending.set(id, { resolve: resolvePending, reject: rejectPending });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');

  const measureExpression = `(() => {
    const stage = document.querySelector('.demo-stage');
    const svg = document.querySelector('.pal-static__connectors');
    const cards = {
      launch: document.querySelector('.pal-static__node--launch'),
      buyers: document.querySelector('.pal-static__node--buyers'),
      brain: document.querySelector('.pal-static__node--brain'),
      improve: document.querySelector('.pal-static__node--improve'),
    };
    const paths = [...document.querySelectorAll('.pal-static__connectors > path:not(.pal-static__trace)')];
    if (!stage || !svg || Object.values(cards).some((card) => !card) || paths.length !== 4) return null;

    const rect = (element) => {
      const value = element.getBoundingClientRect();
      return {
        left: value.left,
        top: value.top,
        right: value.right,
        bottom: value.bottom,
        width: value.width,
        height: value.height,
        centerX: value.left + value.width / 2,
        centerY: value.top + value.height / 2,
      };
    };
    const screenPoint = (path, atEnd) => {
      const point = path.getPointAtLength(atEnd ? path.getTotalLength() : 0);
      const transformed = new DOMPoint(point.x, point.y).matrixTransform(path.getScreenCTM());
      return { x: transformed.x, y: transformed.y };
    };
    const arrowTip = (path) => {
      const length = path.getTotalLength();
      const end = screenPoint(path, true);
      const nearEndPoint = path.getPointAtLength(Math.max(0, length - 0.1));
      const transformedNearEnd = new DOMPoint(nearEndPoint.x, nearEndPoint.y).matrixTransform(path.getScreenCTM());
      const magnitude = Math.hypot(end.x - transformedNearEnd.x, end.y - transformedNearEnd.y) || 1;
      const direction = {
        x: (end.x - transformedNearEnd.x) / magnitude,
        y: (end.y - transformedNearEnd.y) / magnitude,
      };
      const markerId = path.getAttribute('marker-end')?.match(/#([^)'\"]+)/)?.[1];
      const marker = markerId ? document.getElementById(markerId) : null;
      const markerShape = marker?.querySelector('path');
      if (!marker || !markerShape) return end;

      const markerBounds = markerShape.getBBox();
      const refX = marker.refX.baseVal.value;
      const viewBoxWidth = marker.viewBox.baseVal.width;
      const viewBoxScale = viewBoxWidth > 0 ? marker.markerWidth.baseVal.value / viewBoxWidth : 1;
      const strokeScale = marker.markerUnits.baseVal === SVGMarkerElement.SVG_MARKERUNITS_STROKEWIDTH
        ? Number.parseFloat(getComputedStyle(path).strokeWidth)
        : 1;
      const matrix = path.getScreenCTM();
      const screenScale = Math.hypot(matrix.a, matrix.b);
      const tipOffset = (markerBounds.x + markerBounds.width - refX) * viewBoxScale * strokeScale * screenScale;
      return {
        x: end.x + direction.x * tipOffset,
        y: end.y + direction.y * tipOffset,
      };
    };
    const bounds = Object.fromEntries(Object.entries(cards).map(([key, card]) => [key, rect(card)]));
    const connectorPoints = paths.map((path) => ({
      start: screenPoint(path, false),
      end: screenPoint(path, true),
      tip: arrowTip(path),
    }));

    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      nativeStage: {
        data: stage.dataset.nativeSize,
        width: stage.offsetWidth,
        height: stage.offsetHeight,
      },
      renderedStage: rect(stage),
      cards: bounds,
      connectorPoints,
    };
  })()`;

  const failures = [];
  const checks = [];
  const nearlyEqual = (label, actual, expected, allowed = tolerance) => {
    const difference = Math.abs(actual - expected);
    checks.push({ label, actual, expected, difference });
    if (difference > allowed) failures.push(`${label}: expected ${expected.toFixed(2)}, got ${actual.toFixed(2)} (off by ${difference.toFixed(2)}px)`);
  };

  for (const viewport of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: false,
    });

    let measurement;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      const result = await send('Runtime.evaluate', {
        expression: measureExpression,
        returnByValue: true,
      });
      measurement = result.result.value;
      const expectedScale = Math.min(viewport.width / 1600, viewport.height / 900);
      if (
        measurement
        && documentReady(measurement, viewport, expectedScale)
      ) break;
      await sleep(50);
    }

    if (!measurement) {
      failures.push(`${viewport.width}x${viewport.height}: Paid Ads geometry was not found.`);
      continue;
    }

    const prefix = `${viewport.width}x${viewport.height}`;
    const expectedScale = Math.min(viewport.width / 1600, viewport.height / 900);
    if (measurement.nativeStage.data !== '1600x900') failures.push(`${prefix}: data-native-size is ${measurement.nativeStage.data ?? 'missing'}.`);
    nearlyEqual(`${prefix} native stage width`, measurement.nativeStage.width, 1600, 0);
    nearlyEqual(`${prefix} native stage height`, measurement.nativeStage.height, 900, 0);
    nearlyEqual(`${prefix} rendered stage width`, measurement.renderedStage.width, 1600 * expectedScale, 0.25);
    nearlyEqual(`${prefix} rendered stage height`, measurement.renderedStage.height, 900 * expectedScale, 0.25);

    const cardList = Object.values(measurement.cards);
    for (const [index, card] of cardList.slice(1).entries()) {
      nearlyEqual(`${prefix} card ${index + 2} width`, card.width, cardList[0].width, 0.25);
      nearlyEqual(`${prefix} card ${index + 2} height`, card.height, cardList[0].height, 0.25);
    }

    const { launch, buyers, brain, improve } = measurement.cards;
    const clearance = 12 * expectedScale;
    const expectedEndpoints = [
      [{ x: launch.right, y: launch.centerY }, { x: buyers.left - clearance, y: buyers.centerY }],
      [{ x: buyers.centerX, y: buyers.bottom }, { x: brain.centerX, y: brain.top - clearance }],
      [{ x: brain.left, y: brain.centerY }, { x: improve.right + clearance, y: improve.centerY }],
      [{ x: improve.centerX, y: improve.top }, { x: launch.centerX, y: launch.bottom + clearance }],
    ];

    measurement.connectorPoints.forEach((connector, index) => {
      const [expectedStart, expectedEnd] = expectedEndpoints[index];
      nearlyEqual(`${prefix} connector ${index + 1} start x`, connector.start.x, expectedStart.x);
      nearlyEqual(`${prefix} connector ${index + 1} start y`, connector.start.y, expectedStart.y);
      nearlyEqual(`${prefix} connector ${index + 1} arrow tip x`, connector.tip.x, expectedEnd.x);
      nearlyEqual(`${prefix} connector ${index + 1} arrow tip y`, connector.tip.y, expectedEnd.y);
    });
  }

  if (failures.length) {
    console.error(`Paid Ads geometry failed ${failures.length} check${failures.length === 1 ? '' : 's'}:`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log(`Paid Ads geometry passed ${checks.length} measurements at 1920x1080 and 1280x720.`);
    console.log('Native stage: 1600x900. Cards: four equal sizes. Arrow-tip clearance: 12px. Center-axis alignment: within 2px.');
  }
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  if (chrome?.exitCode === null) {
    chrome.kill();
    await Promise.race([
      new Promise((resolvePromise) => chrome.once('close', resolvePromise)),
      sleep(2000),
    ]);
  }
  if (vite?.exitCode === null) {
    vite.kill();
    await Promise.race([
      new Promise((resolvePromise) => vite.once('close', resolvePromise)),
      sleep(2000),
    ]);
  }

  const resolvedProfile = resolve(profile);
  const resolvedTemp = resolve(tmpdir());
  if (resolvedProfile.startsWith(`${resolvedTemp}${sep}`) && basename(resolvedProfile).startsWith('codex-paid-ads-geometry-')) {
    try {
      rmSync(resolvedProfile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch {
      console.warn(`Temporary Chrome profile could not be removed: ${resolvedProfile}`);
    }
  }
}

function documentReady(measurement, viewport, expectedScale) {
  return measurement.viewport.width === viewport.width
    && measurement.viewport.height === viewport.height
    && Math.abs(measurement.renderedStage.width - 1600 * expectedScale) <= 0.25
    && Math.abs(measurement.renderedStage.height - 900 * expectedScale) <= 0.25;
}

function findAvailablePort() {
  return new Promise((resolvePromise, reject) => {
    const server = createServer();
    server.unref();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : null;
      server.close((error) => {
        if (error) reject(error);
        else if (port) resolvePromise(port);
        else reject(new Error('Could not reserve a local port for Vite.'));
      });
    });
  });
}
