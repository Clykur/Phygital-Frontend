import app from './index.mjs';

console.log('Vercel API.js: Attempting to load app from index.mjs');

export default app;
export const handler = app;