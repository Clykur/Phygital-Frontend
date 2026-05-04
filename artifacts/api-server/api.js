import express from 'express';

const app = express();

app.get('/test-route', (req, res) => {
  res.send('Hello from a brand new Express app on Vercel!');
});

export default app;
export const handler = app;