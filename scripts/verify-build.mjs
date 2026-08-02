import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const routes = [
  'sales-department',
  'self-funding-flywheel',
  'ai-brain',
  'reinvestment-controls',
  'organic-workflow',
  'paid-ads-loop',
  'storyboards',
];

const root = resolve('dist');
const rootHtml = await readFile(resolve(root, 'index.html'), 'utf8');

if (!rootHtml.includes('/sales-demos-aug-26/assets/')) {
  throw new Error('Production asset paths do not include the GitHub Pages base path.');
}

await Promise.all(routes.map(async (route) => {
  const entry = resolve(root, route, 'index.html');
  await access(entry);
  const html = await readFile(entry, 'utf8');
  if (html !== rootHtml) throw new Error(`Static entry for ${route} drifted from the main app shell.`);
}));

console.log(`Verified ${routes.length} recording-ready static routes.`);
