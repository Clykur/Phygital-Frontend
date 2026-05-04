import app from './index.js';

// The console.log was for debugging deployment issues, can be removed now.
// console.log('Vercel API.js: Attempting to load app from index.mjs');

export default app;
export const handler = app;