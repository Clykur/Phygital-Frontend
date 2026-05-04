import app from './dist/index.mjs';

// Add a temporary test route to confirm the app is running
app.get('/test-route', (req, res) => {
  res.send('Hello from Vercel API Test Route!');
});

export default app;
export const handler = app;