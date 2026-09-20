import path from 'path';
import express from 'express';
import { apiApp } from './src/server/api';

async function startServer() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    apiApp.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    apiApp.use(express.static(distPath));
    apiApp.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  apiApp.listen(PORT, '0.0.0.0', () => {
    console.log(`Meridian Flood Command Server running at http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to boot Meridian Flood Command server:', err);
  });
}

export default apiApp;
