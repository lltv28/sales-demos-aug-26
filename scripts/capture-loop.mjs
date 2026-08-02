import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { basename, join, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';

const [url, output, durationArg = '10.2', fpsArg = '15', widthArg = '1920', heightArg = '1080'] = process.argv.slice(2);

if (!url || !output) {
  throw new Error('Usage: node scripts/capture-loop.mjs <url> <output.mp4> [durationSeconds] [fps] [width] [height]');
}

const durationSeconds = Number(durationArg);
const fps = Number(fpsArg);
const width = Number(widthArg);
const height = Number(heightArg);
const frameCount = Math.ceil(durationSeconds * fps);
const captureUrl = new URL(url);
captureUrl.searchParams.set('frame', '1');
const chromeCandidates = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
];
const chromePath = chromeCandidates.find(existsSync);

if (!chromePath) throw new Error('Google Chrome was not found.');

const port = 12000 + Math.floor(Math.random() * 12000);
const profile = mkdtempSync(join(tmpdir(), 'codex-loop-'));
const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--autoplay-policy=no-user-gesture-required',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  `--window-size=${width},${height}`,
  '--force-device-scale-factor=1',
  captureUrl.toString(),
], { stdio: ['ignore', 'ignore', 'ignore'], windowsHide: true });

let socket;
let ffmpeg;

try {
  let target;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
      target = targets.find((item) => item.type === 'page' && item.url.includes(new URL(url).pathname));
      if (target) break;
    } catch {
      // Chrome has not opened its debugging port yet.
    }
    await sleep(100);
  }

  if (!target) throw new Error('Chrome did not expose the requested page.');

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
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Emulation.setEmulatedMedia', {
    media: 'screen',
    features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }],
  });

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const state = await send('Runtime.evaluate', {
      expression: "document.readyState === 'complete' && document.fonts.status === 'loaded' && Boolean(document.querySelector('.flywheel-map'))",
      returnByValue: true,
    });
    if (state.result.value) break;
    await sleep(100);
  }

  await send('Page.reload', { ignoreCache: false });
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const state = await send('Runtime.evaluate', {
        expression: "document.readyState === 'complete' && document.fonts.status === 'loaded' && Boolean(document.querySelector('.flywheel-map--phase-1'))",
        returnByValue: true,
      });
      if (state.result.value) break;
    } catch {
      // Execution context is briefly unavailable while the page reloads.
    }
    await sleep(50);
  }

  ffmpeg = spawn('ffmpeg', [
    '-loglevel', 'error',
    '-y',
    '-f', 'image2pipe',
    '-framerate', String(fps),
    '-vcodec', 'png',
    '-i', 'pipe:0',
    '-an',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    resolve(output),
  ], { stdio: ['pipe', 'ignore', 'inherit'], windowsHide: true });

  const startedAt = performance.now();
  for (let index = 0; index < frameCount; index += 1) {
    const targetTime = startedAt + (index * 1000) / fps;
    const waitMs = targetTime - performance.now();
    if (waitMs > 0) await sleep(waitMs);

    await send('Runtime.evaluate', {
      expression: `(() => {
        const root = document.querySelector('[data-loop-beats]');
        if (!root) return;
        const beats = root.dataset.loopBeats.split(',').map(Number);
        const cycle = beats.reduce((sum, beat) => sum + beat, 0);
        let remaining = ${(index * 1000) / fps} % cycle;
        let phase = 0;
        while (phase < beats.length - 1 && remaining >= beats[phase]) {
          remaining -= beats[phase];
          phase += 1;
        }
        for (const className of [...root.classList]) {
          if (/--phase-\\d+$/.test(className)) root.classList.remove(className);
        }
        root.classList.add('flywheel-map--phase-' + (phase + 1));
        void root.offsetWidth;
        for (const animation of root.getAnimations({ subtree: true })) {
          animation.pause();
          animation.currentTime = remaining;
        }
      })()`,
      returnByValue: true,
    });
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      captureBeyondViewport: false,
    });
    if (!ffmpeg.stdin.write(Buffer.from(screenshot.data, 'base64'))) {
      await new Promise((resolvePromise) => ffmpeg.stdin.once('drain', resolvePromise));
    }
  }

  ffmpeg.stdin.end();
  const ffmpegExit = await new Promise((resolvePromise) => ffmpeg.once('close', resolvePromise));
  if (ffmpegExit !== 0) throw new Error(`ffmpeg exited with code ${ffmpegExit}.`);
  console.log(`Captured ${frameCount} frames to ${resolve(output)}.`);
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  if (ffmpeg && ffmpeg.exitCode === null) ffmpeg.kill();
  if (chrome.exitCode === null) {
    chrome.kill();
    await Promise.race([
      new Promise((resolvePromise) => chrome.once('close', resolvePromise)),
      sleep(2000),
    ]);
  }

  const resolvedProfile = resolve(profile);
  const resolvedTemp = resolve(tmpdir());
  if (resolvedProfile.startsWith(`${resolvedTemp}${sep}`) && basename(resolvedProfile).startsWith('codex-loop-')) {
    try {
      rmSync(resolvedProfile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch {
      console.warn(`Temporary Chrome profile could not be removed: ${resolvedProfile}`);
    }
  }
}
