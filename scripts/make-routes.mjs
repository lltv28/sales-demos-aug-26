import { copyFile, mkdir } from 'node:fs/promises';
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

await Promise.all(routes.map(async (route) => {
  const destination = resolve(root, route);
  await mkdir(destination, { recursive: true });
  await copyFile(resolve(root, 'index.html'), resolve(destination, 'index.html'));
}));

console.log(`Created ${routes.length} static route entry points.`);
