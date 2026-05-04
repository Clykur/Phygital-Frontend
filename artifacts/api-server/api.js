import app from './dist/index.mjs';

// The console.log was for debugging deployment issues, can be removed now.
// console.log('Vercel API.js: Attempting to load app from index.mjs');

// Explicit Vercel serverless function handler
export default async (req, res) => {
  // Pass the request and response to your Express app
  app(req, res);
};